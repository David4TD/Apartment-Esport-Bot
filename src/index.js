import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config.js";
import { State } from "./state.js";
import { fetchLiveCS2 } from "./providers/hltv.js";
import { fetchLiveValorant } from "./providers/vlr.js";
import { fetchLiveLoL } from "./providers/lol.js";

if (!config.discordToken || !config.channelId) {
  console.error("Missing DISCORD_TOKEN or DISCORD_CHANNEL_ID in environment.");
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const state = new State(config.stateFilePath);

function formatMessage(item) {
  const roleIds =
    item.game === "CS2" ? config.rolePings.cs2
    : item.game === "Valorant" ? config.rolePings.valorant
    : item.game === "LoL" ? config.rolePings.lol
    : [];

  const rolePingText = roleIds.length ? roleIds.map(id => `<@&${id}>`).join(" ") + " " : "";
  return `${rolePingText}${emojiFor(item.game)} ${item.game} LIVE: ${item.teams[0]} vs ${item.teams[1]} (${item.tournament})\n${item.url}`;
}

function emojiFor(game) {
  switch (game) {
    case "CS2": return "🔫";
    case "Valorant": return "🎯";
    case "LoL": return "🐉";
    default: return "🎮";
  }
}

async function pollOnce(channel) {
  try {
    const [cs2, val, lol] = await Promise.all([
      fetchLiveCS2().catch(() => []),
      fetchLiveValorant().catch(() => []),
      fetchLiveLoL(config.riotApiKey).catch(() => []),
    ]);

    const all = [...cs2, ...val, ...lol];

    for (const item of all) {
      if (!state.has(item.id)) {
        await channel.send({ content: formatMessage(item) });
        state.add(item.id);
      }
    }
  } catch (err) {
    console.error("Poll error:", err.message);
  }
}

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  const channel = await client.channels.fetch(config.channelId);
  await pollOnce(channel);
  setInterval(() => pollOnce(channel), config.pollIntervalMs);
});

client.login(config.discordToken);

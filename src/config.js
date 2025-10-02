export const config = {
  discordToken: process.env.DISCORD_TOKEN,
  channelId: process.env.DISCORD_CHANNEL_ID,
  riotApiKey: process.env.RIOT_API_KEY || "",
  pollIntervalMs: Number(process.env.POLL_INTERVAL_MS || 60000),
  rolePings: {
    cs2: (process.env.ROLE_PINGS_CS2 || "").split(",").filter(Boolean),
    valorant: (process.env.ROLE_PINGS_VALORANT || "").split(",").filter(Boolean),
    lol: (process.env.ROLE_PINGS_LOL || "").split(",").filter(Boolean),
  },
  stateFilePath: process.env.STATE_FILE_PATH || "/data/state.json",
};

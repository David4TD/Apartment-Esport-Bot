import fetch from "node-fetch";

export async function fetchLiveLoL(riotApiKey = "") {
  const url = "https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=en-US";
  const res = await fetch(url, {
    headers: riotApiKey ? { "x-api-key": riotApiKey } : {},
  });
  if (!res.ok) throw new Error(`LoL API error: ${res.status}`);
  const json = await res.json();
  const events = json?.data?.schedule?.events || [];
  const live = events.filter(e => e.state === "inProgress");

  return live.map(e => {
    const teams = e?.match?.teams?.map(t => t?.name) || ["TBD", "TBD"];
    return {
      id: `lol:${e?.id || `${teams[0]}-${teams[1]}-${e?.league?.name}`}`,
      game: "LoL",
      teams,
      tournament: e?.league?.name || "League of Legends Esports",
      url: e?.match?.strategy?.type ? "https://lolesports.com/schedule" : "https://lolesports.com/schedule",
    };
  });
}

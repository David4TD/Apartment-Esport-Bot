import { HLTV } from "hltv";

export async function fetchLiveCS2() {
  const matches = await HLTV.getMatches();
  const live = matches.filter(m => m.live);
  // Normalize into common shape
  return live.map(m => ({
    id: `cs2:${m.id ?? `${m.team1?.name}-${m.team2?.name}-${m.event?.name}`}`,
    game: "CS2",
    teams: [m.team1?.name || "TBD", m.team2?.name || "TBD"],
    tournament: m.event?.name || "HLTV Event",
    url: m.matchEvent?.url || m?.id ? `https://www.hltv.org/matches/${m.id}` : "https://www.hltv.org/matches",
  }));
}

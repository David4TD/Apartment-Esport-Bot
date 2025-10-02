import { getMatches } from "vlr-api";

// getMatches({ upcoming: true, live: true }) returns mixed; we filter live
export async function fetchLiveValorant() {
  const all = await getMatches({ live: true });
  // all items vary by wrapper version; adapt robustly
  return (all || []).map(m => ({
    id: `val:${m.id ?? `${m.teams?.[0]?.name}-${m.teams?.[1]?.name}-${m.tournament?.name}`}`,
    game: "Valorant",
    teams: [
      m.teams?.[0]?.name || m.team1?.name || "TBD",
      m.teams?.[1]?.name || m.team2?.name || "TBD",
    ],
    tournament: m.tournament?.name || m.event?.name || "VLR Event",
    url: m.matchUrl || (m.id ? `https://www.vlr.gg/${m.id}` : "https://www.vlr.gg"),
  }));
}

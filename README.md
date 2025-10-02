# Esports Live Alerts Discord Bot

Sends alerts when CS2 (HLTV), Valorant (VLR.gg), and LoL (Riot Esports) matches go live.

## Setup

1. Create a `.env` from `.env.example`.
2. Ensure your bot is invited to your server with permissions to send messages.
3. Set `DISCORD_CHANNEL_ID` to the target channel.

## Run locally

```bash
npm install
DISCORD_TOKEN=xxx DISCORD_CHANNEL_ID=yyy npm start

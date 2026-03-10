#!/bin/bash
# Usage: ./scripts/notify.sh <channel> <title> <message> [tags] [priority] [click_url]
#
# Examples:
#   ./scripts/notify.sh survivor3-abdul "Immunity Results" "Good news! Abdul's tribe wins!" shield high "https://14508survivor.vercel.app/season/s3/episode/s3_e01#immunity-challenge"
#   ./scripts/notify.sh survivor3-general "Tribal Council" "Sam voted out 4-2." fire high ""

CHANNEL="$1"
TITLE="$2"
MESSAGE="$3"
TAGS="${4:-default}"
PRIORITY="${5:-default}"
CLICK_URL="${6:-https://14508survivor.vercel.app}"

CURL_ARGS=(
  -s -X POST "ntfy.sh/$CHANNEL"
  -H "Title: $TITLE"
  -H "Tags: $TAGS"
  -H "Priority: $PRIORITY"
  -H "Content-Type: text/plain"
)

if [ -n "$CLICK_URL" ]; then
  CURL_ARGS+=(-H "Click: $CLICK_URL")
fi

echo "$MESSAGE" | curl "${CURL_ARGS[@]}" --data-binary @-

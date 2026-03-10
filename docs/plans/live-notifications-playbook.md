# Live Notifications Playbook — Season 3

## Overview

During the S3 game weekend, the host feeds results to Claude Code as events happen. Claude updates `src/data.js`, pushes to Vercel (triggers rebuild), and sends personalized push notifications to all player channels + a general channel via ntfy.sh.

---

## Channels

### Naming Convention

- **General channel**: `survivor3-general` (for anyone following along, neutral perspective)
- **Player channels**: `survivor3-{firstname}` (lowercase, e.g. `survivor3-abdul`, `survivor3-meredith`)
- If two players share a first name, use `survivor3-{firstname}{lastinitial}` (e.g. `survivor3-benw`, `survivor3-benc`)

### Total: 15 channels (14 players + 1 general)

---

## How to Send Notifications

Use ntfy.sh via curl with a heredoc to avoid escaping issues:

```bash
curl -s -X POST ntfy.sh/survivor3-{channel} \
  -H "Title: {title}" \
  -H "Tags: {emoji}" \
  -H "Priority: {priority}" \
  -H "Click: https://14508survivor.vercel.app/season/s3/episode/{eid}#{section}" \
  -H "Content-Type: text/plain" \
  --data-binary @- <<'EOF'
{message body}
EOF
```

### Key Rules
- **Always use heredoc** (`--data-binary @- <<'EOF'`) — avoids backslash escaping on `!` and `'`
- **Always include Click header** — deep link to the relevant episode page section
- **Always end body with**: `Tap for full details.`
- **Front-load key info** — iOS truncates notifications to ~100 characters in the preview
- **Send all 15 channels per event** — fire them in parallel when possible

### Tags (emoji in ntfy)
- `tada` — season start, merge announcement
- `trophy` — reward challenge
- `shield` — immunity challenge (safe)
- `rotating_light` — immunity challenge (tribe lost / at risk)
- `fire` — tribal council results
- `skull` — elimination notification (on the eliminated player's channel)
- `warning` — journey (vague)
- `crown` — finale / winner

### Priority Levels
- `default` — reward challenges
- `high` — immunity challenges, tribal councils
- `max` — eliminations (on that player's channel), finale

---

## Deep Link Format

```
https://14508survivor.vercel.app/season/s3/episode/{eid}#{section}
```

- `{eid}` = episode ID from data.js (e.g. `s3_e01`)
- `{section}` options: `reward-challenge`, `immunity-challenge`, `tribal-council`, `journey`

---

## Season 3 Structure

- **2 tribes** (no third tribe at any point)
- **Tribe swap** occurs mid-pre-merge — players shuffled into new tribes
- **Edge of Extinction** — voted-out players go to the Edge instead of being fully eliminated. They can compete to re-enter the game. **THIS IS A SECRET TWIST.** See critical spoiler rules below.
- **Merge** into one tribe for the individual phase

### Edge of Extinction — CRITICAL SPOILER RULES

Edge of Extinction is a **secret twist** that nobody (players, families, subscribers) knows about until the first person is voted out. **Players will not have access to their phones when this is revealed in-game**, so the reveal timing in notifications is safe — but the site and any pre-built data must NOT leak it early.

#### How Edge of Extinction Works
1. The first 5 players voted out go to the Edge of Extinction (not fully eliminated)
2. On the Edge, they compete in **1v1 duels** for chances to send advantages to players still in the main game
3. Once all 5 are on the Edge, they compete in a **5-person challenge** for one spot back in the game
4. The 1 winner re-enters the game (numbers go from 9 back to 10)
5. The 4 losers become jury members at that point
6. The **merge happens immediately after** the re-entry (at 10 players)

#### Secrecy Rules
1. **Before the first tribal council**: NO mention of Edge of Extinction anywhere — not on the site, not in notifications, not in data.js comments, not in any pre-built page. Nothing. Zero.
2. **Do NOT pre-build an Edge of Extinction page** on the site before the weekend. Build it live when the first vote-out happens.
3. **At the first vote-out**: The big reveal. Notification announces the twist. Edge page goes live on the site.
4. **Subsequent vote-outs (2-5)**: Reference Edge normally.
5. **Edge duels**: Can be mentioned in notifications (no advantage spoiler concerns since these are public events the Edge players experience together).
6. **Re-entry challenge**: The 5-way challenge and its result are announced. 4 losers become jury.

**The Edge of Extinction twist must NOT appear anywhere accessible to the public until the moment it is revealed during the live game weekend. This includes site pages, navigation, season overview text, data.js structure, and any other pre-built content.**

---

## Notification Templates by Event Type

### 1. Season Start

**General channel:**
> 14508 Survivor Season 3 has officially begun! {X} players, 2 tribes: {Tribe A} and {Tribe B}. Follow along for live updates all weekend.

**Player channels:**
> {Name} has been placed on the {Tribe Color} tribe alongside {teammates}. {X} players, 2 tribes, 1 Sole Survivor. Let the game begin! Tap for full details.

---

### 2. Reward Challenge

**Winning tribe member:**
> {Name}'s {Color} tribe wins {Challenge Name}! They earn {reward}. Tap for full details.

**Losing tribe member:**
> {Name}'s {Color} tribe loses {Challenge Name}. {Winning Tribe} wins {reward}. Tap for full details.

**General channel:**
> {Challenge Name}: {Winning Tribe} wins reward — {reward}! Tap for full details.

---

### 3. Immunity Challenge — Safe Tribe

**Player on safe tribe:**
> Good news! {Name}'s {Color} tribe wins {Challenge Name} and earns immunity! {He/She}'s safe tonight. {Losing Tribe} lost — {name, name, name, ...} will be attending Tribal Council around {time}. Tap for full details.

**General channel:**
> {Challenge Name}: {Winning Tribe} wins immunity! {Losing Tribe} lost and is headed to Tribal Council around {time}. Tap for full details.

---

### 4. Immunity Challenge — Losing Tribe

**Player on losing tribe:**
> Tough break. {Name}'s {Color} tribe loses {Challenge Name}. {He/She}'s headed to Tribal Council around {time}. One of {name, name, name, ...} will be voted out tonight. Tap for full details.

---

### 5. Immunity Challenge — Individual (Post-Merge)

**Winner:**
> {Name} wins individual immunity in {Challenge Name}! {He/She} is safe at tonight's Tribal Council around {time}. Tap for full details.

**Everyone else:**
> {Winner} wins individual immunity in {Challenge Name}. {Name} is NOT immune and could be on the chopping block at Tribal Council around {time}. Tap for full details.

**General channel:**
> {Winner} wins individual immunity in {Challenge Name}! Tribal Council around {time}. Tap for full details.

---

### 6. Journey

**SPOILER RULES: Journeys often involve advantages. Do NOT reveal advantage details.**

**All channels (same message):**
> A journey has taken place. Players have returned to camp. The next event is {next event} around {time}. Tap for full details.

**Note:** Do NOT say who went on the journey, what happened, or what was won/lost. Jury members have phones and must not learn about advantages through notifications.

---

### 7a. Tribal Council — FIRST Vote-Out (Edge of Extinction Reveal)

**This is the twist reveal. Use these templates ONLY for the very first vote-out of the season.**

**Voted-out player's channel:**
> Bad news. {Name} has been voted out {X-Y}. But {he/she}'s not out of the game! There's a twist — Edge of Extinction. {Name} has a chance to earn {his/her} way back in. Tap for full details.

**Surviving player at that tribal:**
> {Name} survived Tribal Council! {Voted-out} was voted out {X-Y}. But there's a twist — {Voted-out} is not out of the game. Edge of Extinction is in play this season. Tap for full details.

**Player NOT at that tribal:**
> {Name}'s tribe did not attend Tribal Council. {Voted-out} was voted out {X-Y} from {Tribe}. But there's a twist — {Voted-out} is not out of the game. Edge of Extinction is in play this season. Tap for full details.

**General channel:**
> Tribal Council: {Voted-out} has been voted out {X-Y} from {Tribe}. But there's a twist — Edge of Extinction is in play! {Voted-out} is not out of the game and has a chance to fight back in. Tap for full details.

**IMPORTANT:** At this moment, also launch the Edge of Extinction page on the site (make it visible/linked).

---

### 7b. Tribal Council — Subsequent Vote-Outs

**Use these templates for all vote-outs AFTER the first (Edge is now public knowledge).**

**Voted-out player's channel:**
> Bad news. {Name} has been voted out {X-Y} and is headed to the Edge of Extinction. The game isn't over — {he/she} can fight to get back in. Tap for full details.

**Surviving player at that tribal:**
> {Name} survived Tribal Council! {Voted-out} was voted out {X-Y} and sent to the Edge of Extinction. Tap for full details.

**Player NOT at that tribal:**
> {Name}'s tribe did not attend Tribal Council. {Voted-out} was voted out {X-Y} from {Tribe} and sent to the Edge of Extinction. Tap for full details.

**General channel:**
> Tribal Council: {Voted-out} has been voted out {X-Y} from {Tribe} and sent to the Edge of Extinction. Tap for full details.

**Include in tribal notifications:**
- Vote count (e.g. "5-1-1")
- Advantages PLAYED at tribal (idol plays, shot in the dark) — these are public knowledge
- Do NOT include who voted for whom in the notification (that's site detail)

**Do NOT include:**
- Who holds unplayed advantages
- Strategic context or alliances

---

### 8. Tribe Swap

**All player channels:**
> Tribe swap! {Name} is now on the {New Tribe Color} tribe with {new teammates}. Tap for full details.

**General channel:**
> Tribe swap! Players have been reshuffled into new tribes. Tap for full details.

---

### 9. Edge of Extinction — Duel

**Edge duels are 1v1 matchups between players on the Edge. The winner earns the ability to send an advantage to someone still in the game.**

**Note on advantages:** The duel itself is public knowledge, but do NOT reveal which player in the main game receives the advantage (jury spoiler concern). Just announce the duel result.

**Duel winner's channel:**
> {Name} wins the Edge of Extinction duel against {Loser}! Tap for full details.

**Duel loser's channel:**
> {Name} loses the Edge of Extinction duel to {Winner}. {He/She} remains on the Edge — the fight isn't over yet. Tap for full details.

**Players in the main game:**
> An Edge of Extinction duel has taken place. {Winner} defeated {Loser}. Tap for full details.

**General channel:**
> Edge of Extinction duel: {Winner} defeats {Loser}! Tap for full details.

---

### 10. Edge of Extinction — Re-entry Challenge

**All 5 Edge players compete. 1 wins and re-enters. 4 lose and become jury members. Merge happens immediately after.**

**Player who wins re-entry:**
> {Name} wins the Edge of Extinction challenge and is BACK IN THE GAME! The merge is next. Tap for full details.

**Players who lose (become jury):**
> {Name}'s fight to get back in the game is over. {He/She} lost the re-entry challenge and joins the jury. Tap for full details.

**Players still in the main game:**
> Edge of Extinction challenge complete. {Winner} is back in the game! The merge is next — 10 players remain. Tap for full details.

**General channel:**
> Edge of Extinction: {Winner} wins the re-entry challenge and is back in the game! {Loser1}, {Loser2}, {Loser3}, and {Loser4} join the jury. The merge is next — 10 players remain. Tap for full details.

---

### 11. Merge Announcement

**All player channels:**
> The tribes have merged! {Name} is now part of the merged tribe: {Merge Tribe Name}. {X} players remain. Individual immunity challenges begin now. Tap for full details.

**General channel:**
> The tribes have merged into {Merge Tribe Name}! {X} players remain. The individual game begins now. Tap for full details.

---

### 12. Finale / Winner

**Winner's channel:**
> {Name} is the Sole Survivor of Season 3! {He/She} won the jury vote {X-Y-Z}. What an incredible game. Tap for full details.

**Runner-up channels:**
> The jury has voted. {Name} finishes as runner-up with {X} jury votes. {Winner} wins Season 3 with {Y} votes. Tap for full details.

**Other player channels:**
> Season 3 has a winner! {Winner} is the Sole Survivor, winning the jury vote {X-Y-Z}. Tap for full details.

**General channel:**
> {Winner} is the Sole Survivor of Season 3! Jury vote: {X-Y-Z}. What a season. Tap for full details.

---

## Advantage Spoiler Rules

### SAFE to include in notifications:
- Advantages **played** at Tribal Council (idol plays, shot in the dark usage) — the jury physically watches this happen
- Vote outcomes affected by advantages (e.g. "3 votes were nullified by a Hidden Immunity Idol")

### NEVER include in notifications:
- Who found an advantage
- Who currently holds an advantage
- Journey results that reveal advantages
- Strategic info about planned advantage plays

---

## Live Weekend Workflow

### Before the weekend:
1. S3 season fully pre-built in `data.js` (episodes, challenges, tribes, cast)
2. All 15 ntfy channels established
3. Each player given a message to send their loved ones with subscribe instructions
4. Schedule of events (challenge times, tribal times) loaded

### During the weekend:
1. Host messages Claude with result (e.g. "blue won immunity, red to tribal around 4:30")
2. Claude updates `data.js` with results
3. Claude pushes to git (triggers Vercel rebuild ~30 sec)
4. Claude sends 15 notifications (all channels, personalized per template)
5. Repeat for each event

### Host input format examples:
- `"blue won reward challenge"`
- `"blue won immunity. red to tribal around 4:30 PM"`
- `"journey happened"` (no details needed in notif)
- `[screenshot of Google Form voting results]`
- `"tribe swap happened. new tribes: [details]"`
- `"merge happened. new tribe name is ___"`
- `"edge of extinction challenge: ___ wins, re-enters the game"`

---

## Player Subscribe Message Template

Send this to each player to forward to their loved ones:

> Want live updates from {Name}'s Survivor game this weekend? Download the ntfy app (free):
> - iPhone: https://apps.apple.com/us/app/ntfy/id1625396347
> - Android: https://play.google.com/store/apps/details?id=io.heckel.ntfy
>
> Then subscribe to the topic: **survivor3-{name}**
>
> You'll get push notifications as things happen!

---

## Pronouns Reference

Fill this in with the S3 cast before the weekend:

| Player | Channel | Pronouns |
|--------|---------|----------|
| TBD    | survivor3-tbd | he/she/they |

---

## Schedule Reference

Fill this in before the weekend:

| Episode | Event | Estimated Time |
|---------|-------|---------------|
| Ep. 1   | Reward Challenge | TBD |
| Ep. 1   | Immunity Challenge | TBD |
| Ep. 1   | Tribal Council | TBD |
| ...     | ...   | ... |

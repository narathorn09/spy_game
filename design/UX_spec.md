# Spy Game UX Spec

This document outlines the redesigned minimal spy game experience.

## Core Loop
1. **Mission Brief** – single card with mission text.
2. **Choose Action** – three large buttons: *Spy*, *Decode*, *Hide*.
3. **Outcome Toast** – shows result and XP; auto-dismiss after 2.5s.
4. **Next Mission** – primary button to proceed.

## Information Architecture
- **Bottom Navigation**: Play, Agents, Inbox, Shop, Settings.
- Max depth: two levels. Global back arrow on secondary screens.
- Persistent top progress bar on Play screen.

## Screens
- **Onboarding**: three swipeable cards with skip option and mute toggle.
- **Home/Play**: mission card, progress bar, primary CTA.
- **Mission Result**: win/loss message, XP earned, drag-to-dismiss cards.
- **Agents**: collectible cards showing rarity dots.
- **Inbox**: text-only briefings list.
- **Shop**: grid of three items per row with price badges.
- **Settings**: list of toggles including mute.

## Components
- **Primary Button**: full-width, 48–56px height, ripple on tap.
- **Card**: image top, title, two-line description, rounded radius, CTA.
- **Badge**: small pill for rarity/status.
- **Progress Bar**: thin bar at top of Play screen.
- **Toast**: top-right notification, auto-dismiss after 2.5s.

## Accessibility
- Text contrast >= 4.5:1.
- Tap targets >= 44×44px.
- Text scales to 120% without breaking layout.

## Error & Empty States
- **Network Error**: inline card with retry button.
- **Empty Inbox**: friendly mascot illustration with "No Briefings" text.
- **Shop Sold Out**: item shows "Sold" badge.

## Design Tokens
See [`tokens.json`](./tokens.json) for color, spacing, radius, shadow, and typography values.

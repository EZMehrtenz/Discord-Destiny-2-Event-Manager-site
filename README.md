# Destiny 2 Event Manager — public website

This repository contains only the project website and public policies. Bot source, configuration, credentials and player data are kept separately.

## Contents

- `docs/index.html`: landing page
- `docs/terms.html`: Terms of Service
- `docs/privacy.html`: Privacy Policy
- `docs/support.html`: support and data-deletion contact
- `content/*.json`: complete editable page content
- `site.json`: operator, contact and document date
- `assets/`: original site styles and project logo

The pages describe the current bot implementation as reviewed on 18 October 2026. Recheck the policies when data processing, providers or features change. The support inbox must be monitored. Full data deletion is handled manually; `/unregister` is not a global deletion command. This site does not add a deletion command to the bot.

## Rebuild

Requires Node.js, without package installation:

```
node build.mjs
node check.mjs
```

Commit source and generated `docs/` together. Site links are relative so the site works under a GitHub Pages repository path. No analytics, external fonts, cookies or contact-form scripts are added by the site.

## GitHub Pages

In the repository's Settings → Pages, choose “Deploy from a branch”, branch `main`, folder `/docs`, then Save. Use the HTTPS website address that GitHub returns. Enforce HTTPS when available.

The Developer Portal's Terms of Service URL should point to the published `terms.html`; Privacy Policy URL to `privacy.html`. Do not use private-repository links or local preview addresses.

This site is independent of the bot application’s runtime hosting. Publishing it does not rename the bot’s existing source repository or migrate its database.

## Public addresses

- Home: https://ezmehrtenz.github.io/destiny-2-event-manager-site/
- Terms: https://ezmehrtenz.github.io/destiny-2-event-manager-site/terms.html
- Privacy: https://ezmehrtenz.github.io/destiny-2-event-manager-site/privacy.html
- Support: https://ezmehrtenz.github.io/destiny-2-event-manager-site/support.html

## Externally usable media

Public media source files live in `assets/media/` and are copied to `docs/assets/media/` by the build. Use the GitHub Pages addresses directly in Discord, not GitHub file-viewer URLs. Everything in this directory is public.

- 16:9 cover: https://ezmehrtenz.github.io/destiny-2-event-manager-site/assets/media/destiny-2-event-manager-cover.png
- Wide banner: https://ezmehrtenz.github.io/destiny-2-event-manager-site/assets/media/destiny-2-event-manager-banner.png

Both images use the tagline “We’ve got your back, Guardian.”. Add future approved public assets to the source folder and run the build before committing.

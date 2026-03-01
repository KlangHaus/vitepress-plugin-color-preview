# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-03-01

### Added

- Getting Started page with installation and configuration guide
- API Reference page with all exported functions documented
- Usage sections on all feature pages (inline, code blocks, palettes, tailwind)
- `llms.txt` and `llms-full.txt` for AI agent consumption
- Top navigation with Guide and API links
- GitHub social link in docs

### Changed

- Restructured docs sidebar into Introduction, Features, and Reference sections
- Updated homepage with feature list and Get Started action
- Fixed Shiki transformer link to shiki.style

### Fixed

- Upgraded npm in publish workflow for OIDC trusted publishing (requires npm >= 11.5.1)

## [0.1.4] - 2026-03-01

### Changed

- Renamed `playground/` to `docs/`

## [0.1.3] - 2026-03-01

### Added

- Live demo link in README and npm homepage
- GitHub Pages deployment for docs

## [0.1.2] - 2026-03-01

### Added

- Screenshots in README (front, tailwind, tooltip)
- Contributors section in README

## [0.1.1] - 2026-03-01

### Added

- README with full usage documentation
- CONTRIBUTING.md
- GitHub issue templates and PR template
- Prettier, ESLint, commitlint, husky setup

## [0.1.0] - 2026-03-01

### Added

- Inline code color swatches (hex, rgb, hsl, oklch, oklab, named colors)
- Fenced code block swatches via Shiki transformer
- `:::colors` palette container
- Tailwind CSS class detection (all default v3 colors)
- Click-to-copy on swatches
- Hover tooltip with WCAG contrast ratios (AA/AAA badges)
- Hover tooltip with format conversion (HEX, RGB, HSL)
- Dark mode support for VitePress
- VitePress docs site

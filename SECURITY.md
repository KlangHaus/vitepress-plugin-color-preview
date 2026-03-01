# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public issue.**

Instead, email security concerns to the maintainers via [GitHub private vulnerability reporting](https://github.com/KlangHaus/vitepress-plugin-color-preview/security/advisories/new).

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for confirmed vulnerabilities.

## Scope

This plugin runs in two contexts:

- **Build time** (Node.js) — markdown-it plugin and Shiki transformer process markdown into HTML
- **Client side** (browser) — tooltip and copy-to-clipboard functionality

Color values from user-authored markdown are escaped with `md.utils.escapeHtml` before being injected into HTML attributes to prevent XSS.

# Skills

## /publish

Bump version, build, publish to npm, and push tags to GitHub.

### Steps

1. `npm version patch` (or `minor`/`major` as specified)
2. `npm run build`
3. `npm publish`
4. `git push origin main --tags`

---

## /playground

Start the local playground dev server for testing.

### Steps

1. `cd playground && npm run dev`

---

## /check

Run all checks before committing.

### Steps

1. `npm run typecheck`
2. `npm run lint`
3. `npm run format:check`
4. `npm run build`

---

## /add-color-format

Add support for a new CSS color format.

### Steps

1. Add regex constant in `src/colors.ts`
2. Add to `COLOR_PATTERN` array (longer patterns before shorter)
3. Test in `playground/formats.md`
4. Run `/check`

---

## /add-tailwind-prefix

Add a new Tailwind utility prefix (e.g. `caret-`, `placeholder-`).

### Steps

1. Add prefix to `TW_PREFIXES` regex in `src/tailwind.ts`
2. Test in `playground/tailwind.md`
3. Run `/check`

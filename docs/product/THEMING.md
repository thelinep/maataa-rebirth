# Theming

`ThemeProvider` supports `light`, `dark`, and `system`. `UiProvider` combines the theme boundary with MAATAA root styles and LTR/RTL direction.

The stylesheet uses semantic CSS variables such as:

- `--m-bg`, `--m-surface`, `--m-elevated`
- `--m-text`, `--m-muted`, `--m-border`, `--m-focus`
- `--m-primary`, `--m-secondary`
- `--m-success`, `--m-warning`, `--m-danger`, `--m-info`
- spacing, radius, shadow and font variables

Override variables on `.maataa-root` or a containing theme scope instead of modifying component source.

```css
.my-brand.maataa-root {
  --m-primary: #6d511d;
  --m-focus: #d0a12a;
}
```

Motion respects `prefers-reduced-motion`. Decorative gold interaction effects remain static until hover/focus/active state.

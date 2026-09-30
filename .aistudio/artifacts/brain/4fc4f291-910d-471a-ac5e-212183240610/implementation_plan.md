# Implementation Plan: Redesign & Harmonize Editor Inputs with Theme

Unify the styling of the selected editor elements and form inputs to match the editor theme with a subtle tinted surface, theme-matching borders, and an accent focus ring, while seamlessly blending the editor headers into the canvas.

---

## 1. Focused Element 2: Editor Mode Sub-Header (`WorkspaceLayout.tsx`)
- Unify the sub-header surface with the editor background palette (`#0c1017` in dark, `#f8fafc` in light).
- Blend the border into the container seamlessly (`border-slate-800/40` in dark, `border-slate-200/60` in light).
- Style the mode switcher tabs ("Visual Form" and "JSON Schema") into cohesive pill segments that harmonize with the stepper below.

## 2. Focused Element 3: FormEditor Stepper Header (`FormEditor.tsx`)
- Merge visually with the sub-header into a single cohesive, seamless control zone.
- Soften the completeness meter and step tabs with harmonious tinted backgrounds (`bg-[#131926]` in dark, `bg-slate-100/80` in light) and active indigo/accent pills.
- Remove harsh contrast lines so the header flows naturally into the form canvas.

## 3. Focused Element 1: Form Content Canvas & Input Styling (`FormEditor.tsx` & `M3TextField.tsx`)
- **Harmonize `M3TextField` & Textareas**:
  - Apply the user's selected style: subtle tinted background (`bg-[#101520]` in dark, `bg-slate-50/70` in light), theme-matching soft border (`border-slate-800/60` in dark, `border-slate-200` in light), and accent focus ring (`focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20`).
  - Ensure labels, placeholders, and value text match the typography and color scale of the studio theme.
- **Harmonize Theme Inputs in `ThemeSection.tsx`**:
  - Update custom color picker, lighting mode buttons, font cards, and preset cards to match the unified subtle tinted theme surface.
  - Refine borders and blank space for cohesive harmony across all sections.

---

## 4. Verification & Testing
- Compile applet with `compile_applet` and run `lint_applet` to ensure zero regressions.
- Verify live hot-reloading and theme matching in both Dark and Light studio modes.

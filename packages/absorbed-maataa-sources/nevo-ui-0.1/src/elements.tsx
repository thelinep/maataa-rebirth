import {
  createElement,
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type DetailsHTMLAttributes,
  type FieldsetHTMLAttributes,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type HtmlHTMLAttributes,
  type ImgHTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type LiHTMLAttributes,
  type OlHTMLAttributes,
  type OptgroupHTMLAttributes,
  type OptionHTMLAttributes,
  type SelectHTMLAttributes,
  type SourceHTMLAttributes,
  type TextareaHTMLAttributes,
  type TimeHTMLAttributes,
} from "react";

/**
 * Element primitives: the only way an app built on @maataa/ui renders
 * markup. Each one renders exactly the semantic element named by its
 * props and adds NO class or style of its own, so moving an app from raw
 * JSX onto these primitives is pixel-neutral. Appearance comes from
 * `className` tokens defined in a @maataa/ui theme stylesheet (for NEVO:
 * `@maataa/ui/themes/nevo/*.css`); apps never ship their own CSS.
 *
 * Server-component safe: no hooks, no context. Links that route inside an
 * app live in ./link.tsx (a client module).
 */

type Ref = HTMLElement;

/** Generic layout container: `div` (default) or `span`. */
export type BoxProps = HTMLAttributes<HTMLElement> & { as?: "div" | "span" };
export const Box = forwardRef<Ref, BoxProps>(function Box({ as = "div", ...props }, ref) {
  return createElement(as, { ...props, ref });
});

/** Sectioning and landmark elements. */
export type RegionTag = "section" | "article" | "aside" | "header" | "footer" | "main" | "nav" | "figure" | "figcaption" | "address" | "hgroup";
export type RegionProps = HTMLAttributes<HTMLElement> & { as: RegionTag };
export const Region = forwardRef<Ref, RegionProps>(function Region({ as, ...props }, ref) {
  return createElement(as, { ...props, ref });
});

/** h1–h6, chosen by `level` so the outline is explicit at the call site. */
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & { level: 1 | 2 | 3 | 4 | 5 | 6 };
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading({ level, ...props }, ref) {
  return createElement(`h${level}`, { ...props, ref });
});

/** Running text and inline phrasing elements; `p` by default. */
export type TextTag = "p" | "span" | "strong" | "b" | "em" | "i" | "small" | "mark" | "code" | "pre" | "kbd" | "abbr" | "sub" | "sup" | "s" | "u" | "del" | "ins" | "q" | "blockquote" | "cite" | "time" | "data" | "var";
export type TextProps = HTMLAttributes<HTMLElement> & Pick<TimeHTMLAttributes<HTMLElement>, "dateTime"> & { as?: TextTag; value?: string };
export const Text = forwardRef<Ref, TextProps>(function Text({ as = "p", ...props }, ref) {
  return createElement(as, { ...props, ref });
});

/** Lists: `ul` (default), `ol` or `dl`. */
export type ListProps = HTMLAttributes<HTMLElement> & Pick<OlHTMLAttributes<HTMLOListElement>, "start" | "reversed" | "type"> & { as?: "ul" | "ol" | "dl" | "menu" };
export const List = forwardRef<Ref, ListProps>(function List({ as = "ul", ...props }, ref) {
  return createElement(as, { ...props, ref });
});

/** List entries: `li` (default), `dt` or `dd`. */
export type ListItemProps = HTMLAttributes<HTMLElement> & Pick<LiHTMLAttributes<HTMLLIElement>, "value"> & { as?: "li" | "dt" | "dd" };
export const ListItem = forwardRef<Ref, ListItemProps>(function ListItem({ as = "li", ...props }, ref) {
  return createElement(as, { ...props, ref });
});

/** `<img>`: `alt` is required (pass "" for decoration). */
export type ImgProps = ImgHTMLAttributes<HTMLImageElement> & { alt: string };
export const Img = forwardRef<HTMLImageElement, ImgProps>(function Img(props, ref) {
  return createElement("img", { ...props, ref });
});
/** `<picture>`; `placeholderColor` paints the frame while the image loads (e.g. an image's dominant colour). */
export type PictureProps = HTMLAttributes<HTMLElement> & { placeholderColor?: string };
export const Picture = forwardRef<HTMLElement, PictureProps>(function Picture({ placeholderColor, style, ...props }, ref) {
  return createElement("picture", { ...props, style: placeholderColor ? { ...style, backgroundColor: placeholderColor } : style, ref });
});
export function Source(props: SourceHTMLAttributes<HTMLSourceElement>) { return createElement("source", props); }

/** A plain anchor for external, mailto:, tel: and in-page (#) links. In-app routes use `TextLink`. */
export const Anchor = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function Anchor(props, ref) {
  return createElement("a", { ...props, ref });
});

/** An unstyled native button (Button adds the design-system button look). */
export const ButtonBase = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function ButtonBase({ type = "button", ...props }, ref) {
  return createElement("button", { type, ...props, ref });
});

export const Form = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(function Form(props, ref) {
  return createElement("form", { ...props, ref });
});
export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(function Label(props, ref) {
  return createElement("label", { ...props, ref });
});
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  return createElement("input", { ...props, ref });
});
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(props, ref) {
  return createElement("textarea", { ...props, ref });
});
/** A native `<select>` (Select is the labelled design-system field). */
export const NativeSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function NativeSelect(props, ref) {
  return createElement("select", { ...props, ref });
});
export function Option(props: OptionHTMLAttributes<HTMLOptionElement>) { return createElement("option", props); }
export function OptGroup(props: OptgroupHTMLAttributes<HTMLOptGroupElement>) { return createElement("optgroup", props); }
export function DataList(props: HTMLAttributes<HTMLDataListElement>) { return createElement("datalist", props); }
export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetHTMLAttributes<HTMLFieldSetElement>>(function Fieldset(props, ref) {
  return createElement("fieldset", { ...props, ref });
});
export function Legend(props: HTMLAttributes<HTMLLegendElement>) { return createElement("legend", props); }

export const Details = forwardRef<HTMLDetailsElement, DetailsHTMLAttributes<HTMLDetailsElement>>(function Details(props, ref) {
  return createElement("details", { ...props, ref });
});
export function Summary(props: HTMLAttributes<HTMLElement>) { return createElement("summary", props); }

/**
 * Sets runtime CSS custom properties (e.g. a measured height) for its
 * subtree. The only sanctioned way to pass a computed value to theme CSS;
 * names must be custom properties (`--x`).
 */
export type VarScopeProps = Omit<HTMLAttributes<HTMLElement>, "style"> & { as?: "div" | "span"; vars: Record<`--${string}`, string | number> };
export const VarScope = forwardRef<Ref, VarScopeProps>(function VarScope({ as = "div", vars, ...props }, ref) {
  return createElement(as, { ...props, style: vars, ref });
});

/** Document root elements, for a framework's root layout. */
export function Html(props: HtmlHTMLAttributes<HTMLHtmlElement>) { return createElement("html", props); }
export function Body(props: HTMLAttributes<HTMLBodyElement>) { return createElement("body", props); }

export function Divider(props: HTMLAttributes<HTMLHRElement>) { return createElement("hr", props); }
export function LineBreak() { return createElement("br"); }

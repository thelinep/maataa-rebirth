import React from "react";
import { cx } from "../utils";

export function Text({
  as: Tag = "p",
  className,
  ...props
}: { as?: "p" | "span" | "div" } & React.HTMLAttributes<HTMLElement>) {
  return <Tag className={cx("m-ui", className)} {...props} />;
}

const HEADING_TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export function Heading({
  level = 2,
  className,
  ...props
}: { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = HEADING_TAGS[level];
  return <Tag className={cx("m-ui", className)} {...props} />;
}

export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control -- generic label primitive: htmlFor and text are supplied by the caller through props
  return <label className={cx("m-ui m-field-label", props.className)} {...props} />;
}

export function Caption({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <small className={cx("m-ui m-field-description", className)} {...props} />;
}

export function Code(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cx("m-ui", props.className)}
      style={{
        fontFamily: "var(--m-font-mono)",
        background: "var(--m-secondary)",
        padding: "2px 5px",
        borderRadius: 4,
        ...props.style,
      }}
      {...props}
    />
  );
}

export function Kbd(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cx("m-ui", props.className)}
      style={{
        fontFamily: "var(--m-font-mono)",
        border: "1px solid var(--m-border)",
        borderBottomWidth: 2,
        borderRadius: 4,
        padding: "1px 5px",
        ...props.style,
      }}
      {...props}
    />
  );
}

export function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content -- link text arrives as children through the spread props
    <a
      className={cx("m-ui", props.className)}
      style={{ color: "var(--m-primary)", textUnderlineOffset: 3, ...props.style }}
      {...props}
    />
  );
}

export function Blockquote(props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cx("m-ui", props.className)}
      style={{
        marginInline: 0,
        paddingInlineStart: 16,
        borderInlineStart: "3px solid var(--m-border)",
        color: "var(--m-muted)",
        ...props.style,
      }}
      {...props}
    />
  );
}

export function Truncate({
  lines = 1,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { lines?: number }) {
  return (
    <span
      className={cx("m-ui", className)}
      style={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    />
  );
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BrandButtonBase = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

type BrandButtonButtonProps = BrandButtonBase &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type BrandButtonAnchorProps = BrandButtonBase &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type BrandButtonProps = BrandButtonButtonProps | BrandButtonAnchorProps;

function isAnchor(props: BrandButtonProps): props is BrandButtonAnchorProps {
  return typeof props.href === "string";
}

export function BrandButton(props: BrandButtonProps) {
  const { children, className = "", variant = "primary" } = props;
  const classes =
    `premium-button ${variant === "primary" ? "premium-button-primary" : "premium-button-secondary"} ${className}`.trim();

  if (isAnchor(props)) {
    const { children: _children, className: _className, variant: _variant, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { children: _children, className: _className, variant: _variant, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

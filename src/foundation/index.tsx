import React from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils";
import { ThemeProvider, type MaataaTheme } from "../themes";
export type UiProviderProps = {
  children: React.ReactNode;
  /** Controlled theme. When set, it is the source of truth and later changes apply; pair it with `onThemeChange`. */
  theme?: MaataaTheme;
  /** Initial theme when `theme` is not set (uncontrolled). */
  defaultTheme?: MaataaTheme;
  /** Called with the requested theme, e.g. when a ThemeToggle is pressed. */
  onThemeChange?: (theme: MaataaTheme) => void;
  dir?: "ltr" | "rtl";
  className?: string;
};
export function UiProvider({ children, theme, defaultTheme = "system", onThemeChange, dir = "ltr", className }: UiProviderProps) { return <ThemeProvider theme={theme} defaultTheme={defaultTheme} onThemeChange={onThemeChange}><div className={cx("maataa-root", className)} dir={dir}>{children}</div></ThemeProvider>; }
type DivProps = React.HTMLAttributes<HTMLDivElement>;
export const Box = React.forwardRef<HTMLDivElement, DivProps>(({ className, ...p }, ref) => <div ref={ref} className={cx("m-ui", className)} {...p} />); Box.displayName="Box";
export const Stack = React.forwardRef<HTMLDivElement, DivProps & { gap?: number | string; align?: React.CSSProperties["alignItems"] }>(({ className, gap=12, align, style, ...p }, ref) => <div ref={ref} className={cx("m-ui m-stack", className)} style={{ gap, alignItems: align, ...style }} {...p}/>); Stack.displayName="Stack";
export const Flex = React.forwardRef<HTMLDivElement, DivProps & { gap?: number | string; align?: React.CSSProperties["alignItems"]; justify?: React.CSSProperties["justifyContent"]; wrap?: boolean }>(({ className,gap=12,align,justify,wrap,style,...p},ref)=><div ref={ref} className={cx("m-ui m-flex",className)} style={{gap,alignItems:align,justifyContent:justify,flexWrap:wrap?"wrap":undefined,...style}} {...p}/>); Flex.displayName="Flex";
export const Grid = React.forwardRef<HTMLDivElement, DivProps & { columns?: number | string; gap?: number | string }>(({ className,columns="repeat(auto-fit,minmax(220px,1fr))",gap=12,style,...p},ref)=><div ref={ref} className={cx("m-ui m-grid",className)} style={{gridTemplateColumns:typeof columns==="number"?`repeat(${columns},minmax(0,1fr))`:columns,gap,...style}} {...p}/>); Grid.displayName="Grid";
export const Container = React.forwardRef<HTMLDivElement, DivProps & { size?: "sm"|"md"|"lg"|"xl"|"full" }>(({className,size="lg",style,...p},ref)=>{const widths={sm:640,md:800,lg:1120,xl:1320,full:"none"} as const;return <div ref={ref} className={cx("m-ui",className)} style={{width:"100%",maxWidth:widths[size],marginInline:"auto",paddingInline:16,...style}} {...p}/>}); Container.displayName="Container";
export function Section(p: React.HTMLAttributes<HTMLElement>) { return <section className={cx("m-ui",p.className)} {...p}/>; }
export function Divider({className,...p}:React.HTMLAttributes<HTMLHRElement>){return <hr className={cx("m-divider",className)} {...p}/>}
export function Spacer({size=16}:{size?:number|string}){return <div aria-hidden="true" style={{inlineSize:size,blockSize:size,flex:"0 0 auto"}}/>}
export function AspectRatio({ratio=16/9,children,className,style,...p}:DivProps&{ratio?:number}){return <div className={cx("m-ui",className)} style={{aspectRatio:String(ratio),...style}} {...p}>{children}</div>}
export function ScrollArea({children,className,style,...p}:DivProps){return <div className={cx("m-ui",className)} style={{overflow:"auto",...style}} {...p}>{children}</div>}
export function VisuallyHidden({children}:{children:React.ReactNode}){return <span className="m-sr-only">{children}</span>}
export function Portal({children,container}:{children:React.ReactNode;container?:Element|null}){if(typeof document==="undefined")return null;return createPortal(children,container??document.body)}

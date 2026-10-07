"use client";

import type { ComponentPropsWithoutRef } from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";
import { cx } from "./shared.ts";

type MotionDivProps = HTMLMotionProps<"div">;
type DivProps = ComponentPropsWithoutRef<"div">;

export function RuntimeReveal({ className, ...props }: MotionDivProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={reduceMotion ? undefined : { duration: 0.35, ease: "easeOut" }}
      className={className}
      {...props}
    />
  );
}

export function RuntimeGlow({ className, ...props }: DivProps) {
  return <div className={cx("shadow-[0_0_42px_var(--maataa-glow)]", className)} {...props} />;
}

export function RuntimeOrbit({ className, ...props }: MotionDivProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={reduceMotion ? undefined : { duration: 24, repeat: Infinity, ease: "linear" }}
      className={cx("rounded-full border border-[color:var(--maataa-border)]", className)}
      {...props}
    />
  );
}

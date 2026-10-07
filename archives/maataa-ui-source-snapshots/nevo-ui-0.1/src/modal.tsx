"use client";

import type { ComponentProps, ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

type PopupProps = ComponentProps<typeof Dialog.Popup>;

export interface ModalProps {
  /** Whether the modal is currently open. `Modal` holds no state of its
   * own -- same controlled-only contract as `Select`/`Table` and the rest
   * of `@maataa/ui`: the caller decides when it's open (e.g. from a button
   * that lives entirely outside this component's own markup) and reflects
   * that decision back here. There is deliberately no `Dialog.Trigger`
   * child -- requiring one would defeat the point of a controlled modal
   * that any external control (a row action, a keyboard shortcut, a
   * redirect-back-with-a-flag) can open. */
  open: boolean;
  /** Fired whenever Base UI wants the open state to change -- a backdrop
   * or outside press, Escape, or the built-in close button all funnel
   * through here, not just an explicit close click. The caller is the
   * only owner of `open`, so nothing closes unless this updates it. */
  onOpenChange(open: boolean): void;
  /** Rendered as `Dialog.Title` (a real `<h2>`) and wired by Base UI as
   * the popup's `aria-labelledby` target -- required, not optional,
   * because an untitled dialog has no accessible name at all for screen
   * reader users. If a visual title doesn't fit the design, still pass
   * one and hide it with a `VisuallyHidden`-style wrapper rather than
   * omitting it. */
  title: ReactNode;
  /** Rendered as `Dialog.Description` (a `<p>`) and wired as the popup's
   * `aria-describedby` target. Omit when the title alone is enough. */
  description?: ReactNode;
  children?: ReactNode;
  /** Applied to the popup element (the visible dialog box), not the
   * backdrop or portal. */
  className?: string;
  /** Accessible label for the built-in close button. Defaults to "Close"
   * -- override for a translated or more specific label. */
  closeLabel?: string;
  /** Passed straight through to `Dialog.Popup`. Base UI's own default
   * (first tabbable element inside the popup, or the popup itself when
   * opened via touch) is almost always right, so this only needs setting
   * when a specific control -- e.g. a destructive action's cancel button,
   * not its first field -- should get focus instead. */
  initialFocus?: PopupProps["initialFocus"];
  /** Passed straight through to `Dialog.Popup`. Base UI's own default
   * (the element that was focused before the modal opened, i.e. whatever
   * external control opened it) is what makes focus return correctly to
   * a caller-owned trigger even though `Modal` renders no `Dialog.Trigger`
   * itself -- override only for a case where that's not the right place
   * for focus to land back on. */
  finalFocus?: PopupProps["finalFocus"];
}

/**
 * A modal dialog composed from `@base-ui/react`'s `Dialog` primitives.
 * `Modal` itself contributes no focus-trap or focus-return logic -- Base
 * UI's `Dialog.Root` (`modal` defaults to `true`) already traps focus
 * inside the popup while open and restores it to whatever had focus
 * beforehand when it closes, and does so correctly even without a
 * `Dialog.Trigger` in the tree, because it tracks the actually-focused
 * element at open time rather than requiring a registered trigger. Hand
 * -rolling either behavior here would just risk it diverging from Base
 * UI's own (already accessibility-reviewed) implementation, so this
 * component's job is limited to wiring the real props correctly:
 * `open`/`onOpenChange` for control, `title`/`description` for the
 * popup's accessible name and description, and rendering nothing at all
 * (via `Dialog.Portal`'s default unmount-when-closed behavior) while
 * `open` is false.
 */
export function Modal({ open, onOpenChange, title, description, children, className, closeLabel = "Close", initialFocus, finalFocus }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={nextOpen => onOpenChange(nextOpen)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="maataa-ui__modal-backdrop" />
        <Dialog.Popup
          className={classes("maataa-ui", "maataa-ui__modal", className)}
          initialFocus={initialFocus}
          finalFocus={finalFocus}
        >
          <div className="maataa-ui__modal-header">
            <Dialog.Title className="maataa-ui__modal-title">{title}</Dialog.Title>
            {/* A real, focusable close control -- not just an Escape/
             * outside-press affordance -- per DialogRoot's own guidance
             * that a modal dialog should render a Dialog.Close inside its
             * popup so touch screen-reader users, who have no Escape key
             * and for whom outside-press dismissal is disabled while
             * modal, have a way out. */}
            <Dialog.Close aria-label={closeLabel} className="maataa-ui__modal-close">
              <span aria-hidden="true">×</span>
            </Dialog.Close>
          </div>
          {description ? <Dialog.Description className="maataa-ui__modal-description">{description}</Dialog.Description> : null}
          <div className="maataa-ui__modal-body">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

"use client";

import type { RuntimeHUDNotification } from "./types.ts";

export type RuntimeNotificationCenterProps = {
  readonly notifications?: readonly RuntimeHUDNotification[];
  readonly title?: string;
  readonly description?: string;
  readonly emptyLabel?: string;
};

export function RuntimeNotificationCenter({
  notifications = [],
  title = "Runtime Notifications",
  description,
  emptyLabel = "No runtime notifications supplied."
}: RuntimeNotificationCenterProps) {
  return (
    <section className="runtime-notification-center" aria-label={title}>
      <header>
        <div>
          <p>Notifications</p>
          <h3>{title}</h3>
        </div>
        <span>{notifications.length}</span>
      </header>
      {description ? <p className="runtime-hud-widget-description">{description}</p> : null}
      {notifications.length === 0 ? (
        <p className="runtime-hud-empty">{emptyLabel}</p>
      ) : (
        <div className="runtime-notification-center-list">
          {notifications.map((notification) => (
            <article key={notification.id} data-mode={notification.mode}>
              <header>
                <div>
                  <p>{notification.mode}</p>
                  <h4>{notification.title}</h4>
                </div>
                {notification.occurredAt ? <time dateTime={notification.occurredAt}>{notification.occurredAt}</time> : null}
              </header>
              {notification.body ? <p>{notification.body}</p> : null}
              {notification.source ? <small>{notification.source}</small> : null}
              {notification.evidenceRef ? <code>{notification.evidenceRef}</code> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

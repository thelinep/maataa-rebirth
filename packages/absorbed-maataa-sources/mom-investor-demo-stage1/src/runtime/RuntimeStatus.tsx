import { RuntimePulse } from "./RuntimePulse.tsx";

export function RuntimeStatus({ apiBaseUrl }: { apiBaseUrl?: string }) {
  return (
    <div className="runtime-status">
      <RuntimePulse apiBaseUrl={apiBaseUrl} />
    </div>
  );
}

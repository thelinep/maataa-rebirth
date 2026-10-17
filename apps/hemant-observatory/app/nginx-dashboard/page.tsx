import type { Metadata } from "next";
import { connection } from "next/server";
import NginxDashboard from "./nginx-dashboard";
import "./nginx-dashboard.css";

export const metadata: Metadata = {
  title: "MAATAA Nginx Control — Preview",
  description:
    "A server-rendered MAATAA UI prototype for reviewing Nginx dashboard frames. No Nginx service is connected.",
};

// The page is a Server Component; only frame selection and local search hydrate.
export default async function NginxDashboardPage() {
  // Render the dashboard for each incoming request instead of prerendering it.
  await connection();
  return <NginxDashboard />;
}

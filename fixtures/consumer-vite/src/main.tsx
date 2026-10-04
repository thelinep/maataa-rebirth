import * as React from "react";
import { createRoot } from "react-dom/client";
import "@maataa/ui/styles.css";
import { Button } from "@maataa/ui/actions/Button";
import { Input } from "@maataa/ui/forms/Input";
import { Card } from "@maataa/ui/surfaces/Card";
import { HolyGrailLayout } from "@maataa/ui/layouts/HolyGrailLayout";
import { IdentityAvatar } from "@maataa/ui/identity/IdentityAvatar";

function App() {
  return <HolyGrailLayout header={<strong>MAATAA UI consumer</strong>} main={<Card><IdentityAvatar identity="IDENTITY.BRAHMINI"/><Input defaultValue="packed consumer"/><Button>Verified import</Button></Card>} footer={<small>clean tarball fixture</small>} />;
}
createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);

import { footerColumns } from "@maataa/navigation";
import { FooterDomains } from "./FooterDomains.tsx";
import { FooterKnowledge } from "./FooterKnowledge.tsx";
import { FooterStatus } from "./FooterStatus.tsx";
import { FooterTrust } from "./FooterTrust.tsx";

export function SovereignFooter() {
  return (
    <footer className="operating-footer">
      <div className="footer-brand-panel">
        <img src="/brand/vaigyaaniq-2026/logos/vaigyaaniq-mark.svg" alt="" />
        <div>
          <p className="section-label">Vaigyaaniq</p>
          <h2>One Earth. Infinite Knowledge. Clear next steps.</h2>
          <p>Navigate learning, radio, production, apps, domains, status, and trust records without needing internal system language.</p>
        </div>
      </div>
      <div className="footer-column-grid">
        {footerColumns.map((column) => (
          <section key={column.id}>
            <h3>{column.title}</h3>
            <p>{column.description}</p>
            <nav aria-label={column.title}>
              {column.nodes.slice(0, 8).map((node) => (
                <a href={node.href} key={`${column.id}-${node.id}`}>
                  {node.title}
                </a>
              ))}
            </nav>
          </section>
        ))}
      </div>
      <div className="footer-runtime-grid">
        <FooterStatus />
        <FooterDomains />
        <FooterKnowledge />
        <FooterTrust />
        <div className="footer-language-social">
          <span>English</span>
          <span>हिन्दी</span>
          <span>संस्कृतम्</span>
          <a href="https://radio.vaigyaaniq.online">Radio</a>
          <a href="https://api.vaigyaaniq.online/health">Health</a>
          <a href="https://github.com/workforfilms/mom">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

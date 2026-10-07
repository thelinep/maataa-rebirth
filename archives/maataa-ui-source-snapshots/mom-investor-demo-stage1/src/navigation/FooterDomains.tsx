import { domainNodes } from "@maataa/navigation";

export function FooterDomains() {
  return (
    <div className="footer-mini-map">
      {domainNodes.slice(0, 9).map((domain) => (
        <a href={domain.href} key={domain.id}>
          <span className={`footer-dot footer-dot-${domain.status}`} />
          {domain.domain}
        </a>
      ))}
    </div>
  );
}

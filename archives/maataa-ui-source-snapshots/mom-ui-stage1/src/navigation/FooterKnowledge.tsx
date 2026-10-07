import { knowledgeNodes } from "@maataa/navigation";

export function FooterKnowledge() {
  return (
    <div className="footer-knowledge">
      {knowledgeNodes.slice(0, 6).map((node) => (
        <a href={node.href} key={node.id}>
          {node.title}
        </a>
      ))}
    </div>
  );
}

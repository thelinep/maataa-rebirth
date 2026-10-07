import type { ReactNode } from "react";
import { Button, Card } from "./components.js";

const classes = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ");

export type DocumentIndexItem = { id: string; label: string; href?: string };
export function DocumentCover({ title, summary, metadata, children, className }: { title: string; summary?: string; metadata?: ReactNode; children?: ReactNode; className?: string }) {
  return <header className={classes("maataa-ui", "maataa-ui__document-cover", className)}><div><h1>{title}</h1>{summary ? <p>{summary}</p> : null}</div>{metadata ? <div className="maataa-ui__document-metadata">{metadata}</div> : null}{children}</header>;
}

export function DocumentIndex({ items, activeId, className }: { items: readonly DocumentIndexItem[]; activeId?: string; className?: string }) {
  return <nav className={classes("maataa-ui", "maataa-ui__document-index", className)} aria-label="Document index"><ol>{items.map((item) => <li key={item.id}>{item.href ? <a href={item.href} aria-current={item.id === activeId ? "location" : undefined}>{item.label}</a> : <span aria-current={item.id === activeId ? "location" : undefined}>{item.label}</span>}</li>)}</ol></nav>;
}

export type GlossaryTerm = { term: string; definition: ReactNode };
export function Glossary({ terms, className }: { terms: readonly GlossaryTerm[]; className?: string }) {
  return <dl className={classes("maataa-ui", "maataa-ui__glossary", className)}>{terms.map((entry) => <div key={entry.term}><dt>{entry.term}</dt><dd>{entry.definition}</dd></div>)}</dl>;
}

export function DocumentMachine({ cover, index, children, glossary, className }: { cover: ReactNode; index?: ReactNode; children: ReactNode; glossary?: ReactNode; className?: string }) {
  return <article className={classes("maataa-ui", "maataa-ui__document-machine", className)}>{cover}{index ? <aside>{index}</aside> : null}<div className="maataa-ui__document-content">{children}{glossary ? <section aria-label="Glossary">{glossary}</section> : null}</div></article>;
}

export type MachineCard = { id: string; title: ReactNode; description?: ReactNode; meta?: ReactNode; action?: ReactNode };
export function CardMachine({ cards, label, className }: { cards: readonly MachineCard[]; label: string; className?: string }) {
  return <section className={classes("maataa-ui", "maataa-ui__card-machine", className)} aria-label={label}>{cards.map((card) => <Card key={card.id}><h2>{card.title}</h2>{card.description ? <p>{card.description}</p> : null}{card.meta ? <small>{card.meta}</small> : null}{card.action ? <div className="maataa-ui__card-machine-action">{card.action}</div> : null}</Card>)}</section>;
}

export function CreateCard({ title = "Create card", description, actionLabel = "Create", onCreate, className }: { title?: string; description?: ReactNode; actionLabel?: string; onCreate(): void; className?: string }) {
  return <Card className={classes("maataa-ui__create-card", className)}><h2>{title}</h2>{description ? <p>{description}</p> : null}<Button type="button" variant="primary" onClick={onCreate}>{actionLabel}</Button></Card>;
}

export function ListCards({ cards, label, className }: { cards: readonly MachineCard[]; label: string; className?: string }) {
  return <CardMachine cards={cards} label={label} className={classes("maataa-ui__list-cards", className)} />;
}

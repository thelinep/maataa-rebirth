import Link from "next/link";
import { notFound } from "next/navigation";
import { allbLandings, getAllbLanding } from "@/lib/allb-landings";

export function generateStaticParams() {
  return allbLandings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landing = getAllbLanding(slug);
  return landing ? { title: `${landing.title} · ALLB Concepts`, description: landing.description } : {};
}

export default async function AllbArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = allbLandings.findIndex((item) => item.slug === slug);
  const landing = allbLandings[index];
  if (!landing) notFound();
  const previous = allbLandings[index - 1];
  const next = allbLandings[index + 1];
  return <main className="allb-detail-page">
    <header className="allb-detail-bar"><Link href="/allb" className="allb-back">← All 36 concepts</Link><span>{String(landing.number).padStart(2, "0")} / 36</span><Link href="/" className="allb-back">Hemant Observatory</Link></header>
    <section className="allb-detail-intro"><p className="eyebrow">{landing.category.toUpperCase()} · SUPPLIED CONCEPT ART</p><h1>{landing.title}</h1><p>{landing.description}</p><div className="allb-detail-warning"><span aria-hidden="true">ⓘ</span><span>This page reproduces the supplied landing screenshot as a visual reference. Its illustrations and capability claims are not runtime evidence.</span></div></section>
    <figure className="allb-full-art"><img src={landing.image} alt={`${landing.title}, full-page concept artwork`} width={landing.width} height={landing.height} /><figcaption>Original long-page composition · source archive: allb.zip · optimized for this application</figcaption></figure>
    <nav className="allb-sequence" aria-label="Artwork sequence"><div>{previous ? <Link href={`/allb/${previous.slug}`}>← <small>Previous</small><b>{previous.title}</b></Link> : <span />}</div><Link className="allb-sequence-index" href="/allb">Browse all</Link><div>{next ? <Link href={`/allb/${next.slug}`}> <small>Next</small><b>{next.title}</b> →</Link> : <span />}</div></nav>
  </main>;
}

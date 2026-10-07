"use client";

import { useState } from "react";
import { Button } from "@maataa/ui/actions/Button";
import { Input } from "@maataa/ui/forms/Input";
import { Card } from "@maataa/ui/surfaces/Card";

type Step = 1 | 2 | 3;

const eventSamples = {
  summit: {
    label: "Technology Innovation Summit",
    city: "Bengaluru",
    date: "2026-11-12",
    agenda: ["09:00 · Registration fixture", "10:30 · Opening session fixture", "18:00 · Closeout review fixture"],
  },
  collectors: {
    label: "Art & Collectors Evening",
    city: "Mumbai",
    date: "2026-11-26",
    agenda: ["17:00 · Guest arrival fixture", "18:00 · Curator welcome fixture", "21:30 · Closeout review fixture"],
  },
  heritage: {
    label: "Heritage Cultural Evening",
    city: "Jaipur",
    date: "2027-01-09",
    agenda: ["16:00 · Guest arrival fixture", "17:00 · Cultural programme fixture", "21:00 · Closeout review fixture"],
  },
} as const;

type EventKey = keyof typeof eventSamples;

export function Workflow() {
  const [step, setStep] = useState<Step>(1);
  const [eventKey, setEventKey] = useState<EventKey>("summit");
  const [eventName, setEventName] = useState<string>(eventSamples.summit.label);
  const [city, setCity] = useState<string>(eventSamples.summit.city);
  const [date, setDate] = useState<string>(eventSamples.summit.date);
  const [agenda, setAgenda] = useState<string[]>([...eventSamples.summit.agenda]);
  const [task, setTask] = useState("");
  const [reviewed, setReviewed] = useState(false);

  function chooseEvent(key: EventKey) {
    const sample = eventSamples[key];
    setEventKey(key);
    setEventName(sample.label);
    setCity(sample.city);
    setDate(sample.date);
    setAgenda([...sample.agenda]);
  }

  function addTask() {
    const clean = task.trim();
    if (!clean) return;
    setAgenda((items) => [...items, `Operator note · ${clean}`]);
    setTask("");
  }

  function reset() {
    chooseEvent("summit");
    setStep(1);
    setTask("");
    setReviewed(false);
  }

  return <div className="workflow-wrap">
    <div className="workflow-topline"><a href="/" className="back-link">← MAATAA overview</a><span className="local-badge">NEVO · synthetic local demo</span></div>
    <div className="workflow-intro"><p className="workflow-kicker">NEVO event planning · step {step} of 3</p><h1>Shape an event plan before handoff.</h1><p>Explore a sample event brief, add an operator note, and review the planning snapshot. This flow stops before sign-in or any tenant record is created.</p></div>
    <div className="step-track" aria-label={`Step ${step} of 3`}><span data-active={step >= 1}>01 <small>Brief</small></span><i /><span data-active={step >= 2}>02 <small>Operator plan</small></span><i /><span data-active={step >= 3}>03 <small>Review</small></span></div>

    {step === 1 && <Card className="workflow-card" aria-labelledby="brief-step-title">
      <p className="eyebrow">PUBLIC BRIEF · DEVICE-LOCAL</p><h2 id="brief-step-title">Start with an event brief.</h2><p className="card-description">Choose a synthetic NEVO fixture, then adjust its planning details. Do not enter real guest or payment information.</p>
      <label className="field-label" htmlFor="event-sample">Sample event</label>
      <select id="event-sample" className="consumer-select" value={eventKey} onChange={(event) => chooseEvent(event.target.value as EventKey)}>
        {Object.entries(eventSamples).map(([key, sample]) => <option key={key} value={key}>{sample.label}</option>)}
      </select>
      <label className="field-label" htmlFor="event-name">Event name</label>
      <Input id="event-name" value={eventName} onChange={(event) => setEventName(event.target.value)} autoComplete="off" />
      <div className="brief-fields"><div><label className="field-label" htmlFor="event-city">City</label><Input id="event-city" value={city} onChange={(event) => setCity(event.target.value)} autoComplete="off" /></div><div><label className="field-label" htmlFor="event-date">Planning date</label><Input id="event-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} /></div></div>
      <div className="form-actions"><Button variant="primary" disabled={!eventName.trim() || !city.trim() || !date} onClick={() => setStep(2)}>Build operator plan <span aria-hidden="true">→</span></Button></div>
    </Card>}

    {step === 2 && <Card className="workflow-card" aria-labelledby="plan-step-title">
      <p className="eyebrow">OPERATOR WORKSPACE · PREVIEW</p><h2 id="plan-step-title">Review the run-of-show outline.</h2><p className="card-description">For <strong>{eventName || "Untitled event"}</strong> in {city || "an unselected city"}. These are planning fixtures, not assignments or dispatches.</p>
      <ol className="milestone-list agenda-list" aria-label="Sample run of show">{agenda.map((item, index) => <li key={`${item}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      <label className="field-label" htmlFor="operator-note">Add a local operator note</label>
      <div className="milestone-entry"><Input id="operator-note" value={task} onChange={(event) => setTask(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addTask(); }} placeholder="e.g. Review stage access plan" autoComplete="off" /><Button variant="secondary" onClick={addTask} disabled={!task.trim()}>Add note</Button></div>
      <p className="empty-hint">Notes stay in this browser session. No crew or vendor is notified.</p>
      <div className="form-actions split-actions"><Button variant="secondary" onClick={() => setStep(1)}>Back to brief</Button><Button variant="primary" onClick={() => setStep(3)}>Review event snapshot <span aria-hidden="true">→</span></Button></div>
    </Card>}

    {step === 3 && <Card className="workflow-card" aria-labelledby="review-step-title">
      <p className="eyebrow">LOCAL DRAFT · NOT HANDED OFF</p><h2 id="review-step-title">Review the event snapshot.</h2><p className="card-description">This shows the shape of a NEVO planning handoff. A real handoff requires authenticated tenant access and host-side authorization.</p>
      <div className="review-summary"><span>EVENT BRIEF</span><strong>{eventName || "Untitled event"}</strong><p className="review-fact">{city} · {date} · {eventSamples[eventKey].label}</p><span>RUN OF SHOW · {agenda.length} ITEMS</span>{agenda.map((item, index) => <p key={`${item}-${index}`}><b>{String(index + 1).padStart(2, "0")}</b>{item}</p>)}</div>
      <section className="boundary-panel" aria-label="Commercial boundary"><h3>Commercial and delivery boundary</h3><dl><div><dt>Estimate</dt><dd>Illustrative draft · not sent</dd></div><div><dt>Booking / hold</dt><dd>Not created · availability unknown</dd></div><div><dt>Payment / contract</dt><dd>Not connected</dd></div><div><dt>Guest or vendor contact</dt><dd>Not sent</dd></div></dl></section>
      {!reviewed ? <div className="form-actions split-actions"><Button variant="secondary" onClick={() => setStep(2)}>Edit operator plan</Button><Button variant="primary" onClick={() => setReviewed(true)}>Mark local draft reviewed</Button></div> : <div className="review-complete" role="status"><span aria-hidden="true">✓</span><div><strong>Local snapshot reviewed</strong><p>No tenant handoff, booking, hold, payment, or message was created.</p></div><Button variant="secondary" onClick={reset}>Start another sample</Button></div>}
    </Card>}

    <p className="workflow-disclaimer">Synthetic demo fixtures only · changes reset on refresh · no account, backend, tenant mutation, booking, hold, contract, payment, guest invite, vendor outreach, or production action.</p>
  </div>;
}

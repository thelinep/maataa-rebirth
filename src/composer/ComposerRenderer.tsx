import * as React from "react";
import { Button } from "../actions/Button";
import { Input } from "../forms/Input";
import { Card } from "../surfaces/Card";
import { Badge } from "../feedback/Badge";
import { DataTable, Metric } from "../data";
import { Divider } from "../foundation/Divider";
import { Heading, Text } from "../typography";
import type { ComposerBlock, ComposerScene } from "./types";
import type { ButtonVariant } from "../actions";

const rows = [
  {id:1,name:"Surface Registry",status:"ready"},
  {id:2,name:"Device Matrix",status:"simulated"},
  {id:3,name:"Evidence Pack",status:"review"},
];
const columns = [{id:"name",header:"Name"},{id:"status",header:"Status"}];

export function ComposerBlockView({block,disabled=false}:{block:ComposerBlock;disabled?:boolean}) {
  if (block.hidden) return null;
  const p = block.props;
  switch(block.kind) {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    case "heading": return <Heading level={Number(p.level ?? 2) as 1|2|3|4|5|6}>{String(p.text ?? "Heading")}</Heading>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    case "text": return <Text>{String(p.text ?? "Text")}</Text>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    case "button": return <Button disabled={disabled || Boolean(p.disabled)} variant={(p.variant as ButtonVariant | undefined) ?? "primary"}>{String(p.label ?? "Action")}</Button>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    case "input": return <Input disabled={disabled || Boolean(p.disabled)} aria-label={String(p.label ?? "Input")} value={String(p.value ?? "")} readOnly placeholder={String(p.placeholder ?? "")}/>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    case "card": return <Card header={<strong>{String(p.title ?? "Card")}</strong>}><p>{String(p.body ?? "")}</p></Card>;
    case "table": return <DataTable data={rows} columns={columns}/>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    case "metric": return <Metric label={String(p.label ?? "Metric")} value={String(p.value ?? "0")} helper={String(p.helper ?? "")}/>;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- composer props are untyped JSON values; String() coercion of non-string values is existing behaviour (follow-up: an object value renders as [object Object])
    case "badge": return <Badge tone={(p.tone as React.ComponentProps<typeof Badge>["tone"]) ?? "info"}>{String(p.label ?? "badge")}</Badge>;
    case "divider": return <Divider/>;
  }
}

export function ComposerRenderer({scene}:{scene:ComposerScene}) {
  const disabled = scene.stateMode === "disabled" || scene.stateMode === "offline";
  if (scene.stateMode === "loading") return <div className="m-composer-state"><span className="m-spinner"/><strong>Loading composition…</strong></div>;
  if (scene.stateMode === "empty") return <div className="m-composer-state"><strong>Empty state</strong><span>No blocks are available for this simulated state.</span></div>;
  if (scene.stateMode === "error") return <div className="m-composer-state" data-tone="error"><strong>Composition error</strong><span>Simulated runtime failure.</span></div>;
  return <div className="m-composer-renderer" data-density={scene.density} data-state={scene.stateMode}>{scene.blocks.map((block)=><ComposerBlockView key={block.id} block={block} disabled={disabled}/>)}</div>;
}

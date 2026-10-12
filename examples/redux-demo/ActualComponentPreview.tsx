import * as React from "react";
import { loadPreviewLoader } from "./previewLoaders.generated";

type PreviewItem = { id: string; name: string; meta?: string; importPath?: string };
type RuntimeModule = Record<string, unknown>;
type RuntimeComponent = React.ElementType<any>;

function isElementType(value: unknown): value is RuntimeComponent {
  if (typeof value === "function" || typeof value === "string") return true;
  if (!value || typeof value !== "object") return false;
  return "$$typeof" in (value as Record<string, unknown>) || "render" in (value as Record<string, unknown>);
}

class PreviewBoundary extends React.Component<{ children: React.ReactNode; name: string }, { error?: Error }> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidUpdate(prev: { name: string }) { if (prev.name !== this.props.name && this.state.error) this.setState({ error: undefined }); }
  render() {
    if (this.state.error) return <div className="actual-preview-message" data-tone="warning"><strong>Actual export needs context or required props.</strong><p>{this.state.error.message}</p></div>;
    return this.props.children;
  }
}

function CompoundRegisterSpecimen({ Component, fields }: { Component: RuntimeComponent; fields: unknown[] }) {
  const [records, setRecords] = React.useState<unknown[]>([]);
  return <Component recordLabel="Casting entry" fields={fields} statuses={["Open", "Shortlisted", "Selected"]} records={records} onRecordsChange={setRecords} samples={[{ name: "Sample A", role: "Lead", fee: "800000" }]} />;
}

function PreviewTile({ children, label }: { children?: React.ReactNode; label: string }) {
  return <div className="actual-preview-tile"><span>{label}</span>{children}</div>;
}

function ActualSpecimen({ Component, item, overrides = {} }: { Component: RuntimeComponent; item: PreviewItem; overrides?: Record<string, unknown> }) {
  const [text, setText] = React.useState("MAATAA UI");
  const [checked, setChecked] = React.useState(true);
  const [selected, setSelected] = React.useState("one");
  const [tab, setTab] = React.useState("overview");
  const name = item.name;
  const commonStyle: React.CSSProperties = { border: "1px solid rgba(196,153,48,.38)", borderRadius: 12, padding: 16, background: "rgba(196,153,48,.06)" };
  const tiles = <><PreviewTile label="A"/><PreviewTile label="B"/><PreviewTile label="C"/></>;

  // Compound specimens (@maataa/ui/compounds): real props, synthetic data.
  const compoundFields = [
    { key: "name", label: "Candidate", kind: "text", required: true },
    { key: "role", label: "Role", kind: "select", options: ["Lead", "Support"], required: true },
    { key: "fee", label: "Fee estimate", kind: "number", money: true },
  ];
  switch (name) {
    case "TextField": return <Component label="Project name" value={text} onValueChange={setText} description="Shown on call sheets" />;
    case "NumberField": return <Component label="Crew size" value="12" onValueChange={() => {}} />;
    case "DateField": return <Component label="Shoot date" value="2027-02-03" onValueChange={() => {}} />;
    case "TextAreaField": return <Component label="Logline" value={text} onValueChange={setText} />;
    case "SelectField": return <Component label="Format" value={selected} onValueChange={setSelected} options={[{ value: "one", label: "Feature film" }, { value: "two", label: "Documentary" }]} />;
    case "LiveStatus": return <Component visible message="Saved in this browser." />;
    case "StatSummary": return <Component label="Sample summary" items={[{ label: "Entries", value: 2 }, { label: "Total estimate", value: "₹8,60,000" }]} />;
    case "StatusStep": return <Component status="Open" statuses={["Open", "Shortlisted", "Selected"]} itemLabel="Sample candidate" onAdvance={() => {}} />;
    case "ChipPicker": return <Component label="Sample workspaces" items={[{ value: "one", label: "Casting Board", meta: "TLPS" }, { value: "two", label: "Talent" }]} value={selected} onValueChange={setSelected} />;
    case "RecordForm": return <Component fields={compoundFields} onSubmit={() => {}} submitLabel="Add sample" />;
    case "RecordRegister": return <CompoundRegisterSpecimen Component={Component} fields={compoundFields} />;
    default: break;
  }
  switch (name) {
    case "AspectRatio":
      return <Component ratio={Number(overrides.ratio ?? 16/9)} style={{...commonStyle, width:"min(100%,560px)", padding:0, overflow:"hidden"}}><div className="aspect-demo"><strong>16:9 actual AspectRatio</strong><span>Resize the browser: this rectangle keeps its ratio.</span></div></Component>;
    case "Box":
      return <Component style={{...commonStyle, minHeight:180}}><strong>Actual Box</strong><p>A generic package-owned div primitive. Padding/border here are specimen props, not a replacement component.</p></Component>;
    case "Container":
      return <div className="container-demo-outer"><Component size="sm" style={{...commonStyle}}><strong>Actual Container · sm</strong><p>The component constrains max width and centers itself.</p></Component></div>;
    case "Divider":
      return <div className="actual-preview-stack"><span>Above divider</span><Component/><span>Below divider</span></div>;
    case "Flex":
      return <Component gap={12} wrap style={{...commonStyle}}>{tiles}</Component>;
    case "Grid":
      return <Component columns={3} gap={12} style={{...commonStyle}}>{tiles}</Component>;
    case "Stack":
      return <Component gap={10} style={{...commonStyle}}>{tiles}</Component>;
    case "Section":
      return <Component style={{...commonStyle}}><small>SECTION</small><h3>Actual semantic section</h3><p>Rendered by the selected Section export.</p></Component>;
    case "Spacer":
      return <div className="spacer-demo"><span>before</span><Component size={48}/><span>after · 48px spacer</span></div>;
    case "ScrollArea":
      return <Component style={{...commonStyle, height:180}}>{Array.from({length:12},(_,i)=><div className="scroll-demo-row" key={i}>Scrollable row {i+1}</div>)}</Component>;
    case "VisuallyHidden":
      return <div className="actual-preview-message"><strong>Actual VisuallyHidden is mounted.</strong><Component>Screen-reader-only MAATAA text</Component><p>Its child is intentionally not visually exposed.</p></div>;
    case "Portal":
      return <div className="actual-preview-message"><strong>Actual Portal loaded.</strong><p>Portal output is intentionally not injected into the document body from the catalog canvas. Use Playground for overlay/provider behavior.</p></div>;
    case "UiProvider":
      return <Component theme="dark"><div style={commonStyle}><strong>Actual UiProvider</strong><p>Theme context wraps this specimen.</p></div></Component>;
    case "Heading": return <Component level={Number(overrides.level ?? 2)}>{String(overrides.children ?? "Actual Heading specimen")}</Component>;
    case "Text": return <Component>{String(overrides.children ?? "Actual Text component renders this sentence.")}</Component>;
    case "Label": return <Component htmlFor="preview-input">Actual Label</Component>;
    case "Link": return <Component href="#/surface">Actual Link · Full Surface</Component>;
    case "Code": return <Component>{`const surface = "actual";`}</Component>;
    case "Kbd": return <Component>⌘ K</Component>;
    case "Blockquote": return <Component>Actual Blockquote rendered from the selected export.</Component>;
    case "Caption": return <Component>Actual Caption specimen</Component>;
    case "Truncate": return <div style={{width:260}}><Component>This is deliberately long text rendered through the actual Truncate export so overflow behavior can be seen.</Component></div>;
    case "Button": return <div className="actual-preview-row"><Component variant={(overrides.variant as any) ?? "primary"} disabled={Boolean(overrides.disabled)} loading={Boolean(overrides.loading)}>{String(overrides.children ?? "Actual primary Button")}</Component><Component variant="secondary">Secondary</Component><Component variant="ghost">Ghost</Component></div>;
    case "IconButton": return <Component aria-label="Actual icon button">★</Component>;
    case "ButtonGroup": return <Component><button className="m-button">One</button><button className="m-button">Two</button><button className="m-button">Three</button></Component>;
    case "ToggleButton": return <Component pressed={checked} onPressedChange={setChecked}>{checked?"Pressed":"Not pressed"}</Component>;
    case "ToggleGroup": return <Component value={selected} onValueChange={(v:any)=>setSelected(String(v))} items={[{value:"one",label:"One"},{value:"two",label:"Two"},{value:"three",label:"Three"}]}/>;
    case "LinkButton": return <Component href="#/playground">Actual LinkButton</Component>;
    case "CommandButton": return <Component shortcut="⌘K">Actual CommandButton</Component>;
    case "SplitButton": return <Component label="Actual SplitButton" items={[{label:"Duplicate",onSelect:()=>{}},{label:"Archive",onSelect:()=>{}}]}/>;
    case "Input": case "SearchInput": case "NumberInput": case "DatePicker": case "TimePicker": case "ColorPicker":
      return <Component aria-label={`${name} preview`} value={String(overrides.value ?? (name==="NumberInput"?"42":text))} placeholder={String(overrides.placeholder ?? "")} disabled={Boolean(overrides.disabled)} onChange={(e:any)=>setText(e.target.value)}/>;
    case "Textarea": return <Component value={text} onChange={(e:any)=>setText(e.target.value)} rows={5}/>;
    case "PasswordInput": return <Component defaultValue="maataa-demo"/>;
    case "Checkbox": return <Component label="Actual Checkbox" checked={checked} onChange={()=>setChecked(!checked)}/>;
    case "Radio": return <Component label="Actual Radio" checked readOnly name="actual-radio"/>;
    case "Switch": return <Component label="Actual Switch" checked={checked} onCheckedChange={setChecked}/>;
    case "Slider": return <Component min={0} max={100} defaultValue={64}/>;
    case "NativeSelect": case "Select": return <Component defaultValue="two"><option value="one">One</option><option value="two">Two</option><option value="three">Three</option></Component>;
    case "RadioGroup": return <Component label="Actual RadioGroup" name="preview-radio" value={selected} onValueChange={setSelected} options={[{value:"one",label:"One"},{value:"two",label:"Two"},{value:"three",label:"Three"}]}/>;
    case "Combobox": return <Component value={selected} onValueChange={setSelected} options={[{value:"one",label:"Brahmini"},{value:"two",label:"Shiv"},{value:"three",label:"Parvati"}]}/>;
    case "MultiSelect": return <Component value={[selected]} onValueChange={(v:any)=>setSelected(v[0]??"one")} options={[{value:"one",label:"UI"},{value:"two",label:"Data"},{value:"three",label:"AI"}]}/>;
    case "DateRangePicker": return <Component start="2026-10-04" end="2026-10-08"/>;
    case "FieldLabel": return <Component>Actual FieldLabel</Component>;
    case "FieldDescription": return <Component>Actual supporting field description.</Component>;
    case "FieldError": return <Component>Actual validation error message.</Component>;
    case "FormGroup": return <Component><input className="m-input" value={text} onChange={e=>setText(e.target.value)}/><button className="m-button">Save</button></Component>;
    case "FormSection": return <Component title="Actual FormSection" description="The selected component owns this structure"><input className="m-input" value={text} onChange={e=>setText(e.target.value)}/></Component>;
    case "Tabs": return <Component value={tab} onValueChange={setTab} tabs={[{id:"overview",label:"Overview",content:<p>Actual Tabs overview panel.</p>},{id:"states",label:"States",content:<p>Actual Tabs state panel.</p>}]}/>;
    case "Breadcrumb": return <Component items={[{label:"MAATAA",href:"#/"},{label:"Surface",href:"#/surface"},{label:"Selected"}]}/>;
    case "Pagination": return <Component page={2} totalPages={7} onPageChange={()=>{}}/>;
    case "Stepper": return <Component current={1} steps={[{id:"one",label:"Discover"},{id:"two",label:"Compose"},{id:"three",label:"Verify"}]}/>;
    case "Menu": return <Component items={[{label:"Open"},{label:"Duplicate"},{label:"Archive"}]}/>;
    case "NavItem": return <Component item={{id:"surface",label:"Full Surface",href:"#/surface"}} active/>;
    case "NavGroup": return <Component label="MAATAA" activeId="surface" items={[{id:"home",label:"Home",href:"#/"},{id:"surface",label:"Full Surface",href:"#/surface"},{id:"docs",label:"Docs",href:"#/docs"}]}/>;
    case "Toolbar": return <Component><button className="m-button">Compose</button><button className="m-button" data-variant="secondary">Inspect</button></Component>;
    case "TopNav": return <Component brand={<strong>MAATAA UI</strong>} actions={<><button className="m-button">Preview</button></>}/>;
    case "Card": return <Component header={<strong>{String(overrides.header ?? "Actual Card header")}</strong>} footer={<span>Actual Card footer</span>}><p>{String(overrides.children ?? "Actual Card body.")}</p></Component>;
    case "Accordion": return <Component items={[{id:"a",title:"Foundation",content:"Actual accordion content"},{id:"b",title:"Composition",content:"Second panel"}]}/>;
    case "Collapsible": return <Component open={checked} onOpenChange={setChecked} trigger="Toggle actual Collapsible"><div style={commonStyle}>Collapsible content</div></Component>;
    case "Popover": return <Component trigger={<button className="m-button">Open actual Popover</button>}><div style={{padding:12}}>Popover content</div></Component>;
    case "Tooltip": case "HoverCard": return <Component content={`Actual ${name}`}><button className="m-button">Hover or focus me</button></Component>;
    case "Panel": case "Surface": return <Component><strong>Actual {name}</strong><p>This content is a child of the selected export.</p></Component>;
    case "Badge": case "Tag": case "Chip": return <div className="actual-preview-row"><Component tone={(overrides.tone as any) ?? undefined}>{String(overrides.children ?? "Default")}</Component><Component tone="info">Info</Component><Component tone="success">Success</Component><Component tone="warning">Warning</Component></div>;
    case "Progress": case "ProgressBar": return <Component value={68}/>;
    case "Spinner": return <Component/>;
    case "Skeleton": return <Component style={{width:300,height:24}}/>;
    case "Avatar": return <Component name="Brahmini"/>;
    case "AvatarGroup": return <Component avatars={[{name:"Brahmini"},{name:"Shiv"},{name:"Parvati"}]}/>;
    case "Table": return <Component><thead><tr><th>Name</th><th>Status</th></tr></thead><tbody><tr><td>Surface registry</td><td>Verified</td></tr><tr><td>Preview runtime</td><td>Actual</td></tr></tbody></Component>;
    case "DataTable": return <Component data={[{id:1,name:"Surface registry",status:"verified"},{id:2,name:"Preview runtime",status:"actual"},{id:3,name:"Evidence",status:"ready"}]} columns={[{id:"name",header:"Name"},{id:"status",header:"Status"}]}/>;
    case "DescriptionList": return <Component items={[{term:"Export",description:item.name},{term:"Source",description:item.importPath??"—"},{term:"Mode",description:"actual runtime"}]}/>;
    case "List": return <Component items={["Foundation","Composition","Evidence"]} renderItem={(value:any)=>String(value)}/>;
    case "Timeline": return <Component items={[{id:"1",title:"Module resolved",time:"10:21"},{id:"2",title:"Export rendered",time:"10:22"},{id:"3",title:"Specimen interactive",time:"10:23"}]}/>;
    case "Stat": case "Metric": case "KPI": return <Component label="Actual metric" value="92%" helper="package-owned component"/>;
    case "Tree": return <Component><li>Foundation</li><li>Actions</li><li>Forms</li></Component>;
    case "Alert": case "Banner": case "Callout": return <Component title={`Actual ${name}`} tone="info">This message is rendered by the selected export.</Component>;
    case "EmptyState": return <Component title="Actual EmptyState" description="No records in this specimen."/>;
    case "LoadingState": return <Component title="Actual LoadingState" description="Simulated loading surface."/>;
    case "ErrorState": return <Component title="Actual ErrorState" description="Simulated error surface."/>;
    case "OfflineState": return <Component title="Actual OfflineState" description="Simulated offline surface."/>;
    case "ForbiddenState": return <Component title="Actual ForbiddenState" description="Permission presentation only."/>;
    case "NotFoundState": return <Component title="Actual NotFoundState" description="Selected record not found."/>;
    case "OnlineStatus": return <Component online/>;
    case "SyncStatus": return <Component status="syncing"/>;
    default:
      return <GenericActual Component={Component} name={name} overrides={overrides}/>;
  }
}

function GenericActual({ Component, name, overrides = {} }: { Component: RuntimeComponent; name: string; overrides?: Record<string, unknown> }) {
  const child = <div className="generic-actual-child"><strong>{name}</strong><span>Actual selected export</span></div>;
  return <div className="generic-actual-wrap">{React.createElement(Component, { "aria-label": `${name} actual preview`, ...overrides }, child)}</div>;
}

export function ActualComponentPreview({ item, overrides = {} }: { item: PreviewItem; overrides?: Record<string, unknown> }) {
  const [state, setState] = React.useState<{ status:"loading"|"actual"|"non-runtime"|"missing"; Component?:RuntimeComponent; source?:string; message?:string }>({status:"loading"});

  React.useEffect(() => {
    let live = true;
    setState({status:"loading"});

    (async () => {
      const source = item.importPath;

      if (!source) {
        if (live) {
          setState({
            status:"missing",
            message:"No public import path is registered for this item.",
          });
        }
        return;
      }

      const loader = await loadPreviewLoader(source);

      if (!loader) {
        const componentRecord =
          item.id.startsWith("COMPONENT.");

        if (live) {
          setState({
            status: componentRecord
              ? "missing"
              : "non-runtime",
            source,
            message: componentRecord
              ? `${item.name} has no generated canonical preview loader.`
              : `${item.name} is catalog metadata or a non-runtime export.`,
          });
        }

        return;
      }

      try {
        const mod =
          (await loader()) as RuntimeModule;

        const value = mod[item.name];

        if (!isElementType(value)) {
          if (live) {
            setState({
              status:"non-runtime",
              source,
              message:`${item.name} is not a renderable runtime React export in this module.`,
            });
          }
          return;
        }

        if (live) {
          setState({
            status:"actual",
            Component:value,
            source,
          });
        }
      } catch (error) {
        if (live) {
          setState({
            status:"missing",
            source,
            message:
              error instanceof Error
                ? error.message
                : String(error),
          });
        }
      }
    })();

    return () => {
      live = false;
    };
  }, [item.id, item.importPath, item.name]);

  return <div className="actual-component-preview">
    <div className="actual-preview-head"><div><small>SELECTED RUNTIME EXPORT</small><h3>{item.name}</h3><code>{item.importPath ?? "no import path"}</code></div><span className="actual-status" data-status={state.status}>{state.status === "actual"?"ACTUAL EXPORT":state.status === "loading"?"LOADING":state.status === "non-runtime"?"NON-RUNTIME EXPORT":"UNAVAILABLE"}</span></div>
    <div className="actual-preview-stage">
      {state.status === "loading" && <div className="actual-preview-message"><strong>Loading actual module…</strong></div>}
      {state.status === "non-runtime" && <div className="actual-preview-message" data-tone="info"><strong>Not a renderable component.</strong><p>{state.message}</p><code>{state.source}</code></div>}
      {state.status === "missing" && <div className="actual-preview-message" data-tone="danger"><strong>Actual preview unavailable.</strong><p>{state.message}</p>{state.source&&<code>{state.source}</code>}</div>}
      {state.status === "actual" && state.Component && <PreviewBoundary name={item.name}><ActualSpecimen Component={state.Component} item={item} overrides={overrides}/></PreviewBoundary>}
    </div>
    <div className="actual-preview-foot"><span>Preview source</span><code>{state.source ?? "resolving…"}</code></div>
  </div>;
}

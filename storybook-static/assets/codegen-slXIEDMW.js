const i={heading:{name:"Heading",path:"@maataa/ui/typography/Heading"},text:{name:"Text",path:"@maataa/ui/typography/Text"},button:{name:"Button",path:"@maataa/ui/actions/Button"},input:{name:"Input",path:"@maataa/ui/forms/Input"},card:{name:"Card",path:"@maataa/ui/surfaces/Card"},table:{name:"DataTable",path:"@maataa/ui/data/DataTable"},metric:{name:"Metric",path:"@maataa/ui/data/Metric"},badge:{name:"Badge",path:"@maataa/ui/feedback/Badge"},divider:{name:"Divider",path:"@maataa/ui/foundation/Divider"}};function e(t){return JSON.stringify(String(t??""))}function u(t){const a=t.props;switch(t.kind){case"heading":return`<Heading level={${Number(a.level??2)}}>${String(a.text??"Heading")}</Heading>`;case"text":return`<Text>${String(a.text??"Text")}</Text>`;case"button":return`<Button variant=${e(a.variant??"primary")}>${String(a.label??"Action")}</Button>`;case"input":return`<Input aria-label=${e(a.label??"Input")} defaultValue=${e(a.value??"")} placeholder=${e(a.placeholder??"")} />`;case"card":return`<Card header={<strong>${String(a.title??"Card")}</strong>}><p>${String(a.body??"")}</p></Card>`;case"table":return"<DataTable data={rows} columns={columns} />";case"metric":return`<Metric label=${e(a.label??"Metric")} value=${e(a.value??"0")} helper=${e(a.helper??"")} />`;case"badge":return`<Badge tone=${e(a.tone??"info")}>${String(a.label??"badge")}</Badge>`;case"divider":return"<Divider />"}}function s(t){return[...new Set(t.blocks.filter(n=>!n.hidden).map(n=>n.kind))].map(n=>`import { ${i[n].name} } from "${i[n].path}";`).join(`
`)}function p(t){const a=s(t),d=t.blocks.some(r=>r.kind==="table"&&!r.hidden)?`
const rows = [{id:1,name:"Surface Registry",status:"ready"},{id:2,name:"Device Matrix",status:"simulated"}];
const columns = [{id:"name",header:"Name"},{id:"status",header:"Status"}];
`:`
`,o=t.blocks.filter(r=>!r.hidden).map(r=>`      ${u(r)}`).join(`
`);return`${a}${d}
export function ${t.name.replace(/[^A-Za-z0-9_$]/g,"")||"MaataaComposition"}() {
  return (
    <div data-workspace=${e(t.workspaceTypeId)} data-page=${e(t.pageTypeId)} data-layout=${e(t.layoutTypeId)}>
${o}
    </div>
  );
}
`}export{s as generateComposerImports,p as generateComposerJsx};

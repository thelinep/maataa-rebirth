export type PropControl = "text" | "number" | "boolean" | "select";
export interface ComponentPropSchema { name:string; label?:string; control:PropControl; defaultValue?:unknown; options?:string[]; }
export const COMPONENT_PROP_SCHEMAS: Record<string, ComponentPropSchema[]> = {
  Button: [
    {name:"children",label:"Label",control:"text",defaultValue:"Primary action"},
    {name:"variant",control:"select",defaultValue:"primary",options:["primary","secondary","ghost","destructive"]},
    {name:"disabled",control:"boolean",defaultValue:false},
    {name:"loading",control:"boolean",defaultValue:false},
  ],
  Input: [
    {name:"value",control:"text",defaultValue:"MAATAA UI"},
    {name:"placeholder",control:"text",defaultValue:"Enter value"},
    {name:"disabled",control:"boolean",defaultValue:false},
  ],
  Badge: [
    {name:"children",label:"Label",control:"text",defaultValue:"verified"},
    {name:"tone",control:"select",defaultValue:"success",options:["info","success","warning","danger"]},
  ],
  AspectRatio: [{name:"ratio",control:"number",defaultValue:1.7777777778}],
  Heading: [{name:"children",label:"Text",control:"text",defaultValue:"MAATAA heading"},{name:"level",control:"number",defaultValue:2}],
  Text: [{name:"children",label:"Text",control:"text",defaultValue:"MAATAA text specimen"}],
  Card: [{name:"header",control:"text",defaultValue:"Card title"},{name:"children",label:"Body",control:"text",defaultValue:"Card body"}],
};

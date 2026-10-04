import { MAATAA_ICON_NAMES } from "./MaataaIcon";
export const ICON_REGISTRY = MAATAA_ICON_NAMES.map((name,index)=>({
  id:`ICON.MAATAA.${name.replace(/-/g,"_").toUpperCase()}`,
  name,
  family:"maataa-core",
  importPath:"@maataa/ui/icons/MaataaIcon",
  index:index+1
})) as readonly {id:string;name:string;family:string;importPath:string;index:number}[];

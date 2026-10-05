import { Button } from "@maataa/ui/actions/Button";
import { DEFAULT_COMPOSER_SCENE, validateCompositionSpec } from "@maataa/ui/composer";
import Consumer from "./consumer";
export default function Page(){
 const result=validateCompositionSpec(DEFAULT_COMPOSER_SCENE);
 if(!result.accepted)throw new Error("Packed specification validation failed");
 return <main><h1>Packed Next consumer</h1><Button>Direct leaf server import</Button><Consumer/></main>;
}

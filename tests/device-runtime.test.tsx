import React from "react";
import { afterEach,describe,expect,it } from "vitest";
import { cleanup,render,screen } from "@testing-library/react";
import { validateCompositionKernel } from "../src/composer/compositionKernel";
import { DEFAULT_COMPOSER_SCENE } from "../src/composer/defaults";
import { DEVICE_REGISTRY } from "../src/registries/deviceRegistry";
import { resolveDeviceRuntime,evaluateDeviceCapabilities } from "../src/runtime/deviceRuntime";
import { ResponsiveDeviceRuntime } from "../src/runtime/ResponsiveDeviceRuntime";
import { transformCompositionRegions } from "../src/runtime/responsiveTransforms";
afterEach(cleanup);
describe("device runtime",()=>{
 it("resolves every canonical device viewport and orientation",()=>{
   for(const record of DEVICE_REGISTRY){const result=resolveDeviceRuntime(record.id);expect(result,record.id).toBeDefined();expect(result!.width).toBeGreaterThan(0);expect(result!.height).toBeGreaterThan(0);}
 });
 it("uses the registry phone dimensions and reports unknown identities",()=>{
   const {container,rerender}=render(<ResponsiveDeviceRuntime deviceId="DEVICE.PHONES.SMARTPHONE">content</ResponsiveDeviceRuntime>);
   expect(container.firstChild).toHaveAttribute("data-device-id","DEVICE.PHONES.SMARTPHONE");
   expect(screen.getByText("390×844")).toBeInTheDocument();
   rerender(<ResponsiveDeviceRuntime deviceId="DEVICE.INVENTED">content</ResponsiveDeviceRuntime>);
   expect(screen.getByRole("alert")).toHaveTextContent("Unknown canonical device");
 });
 it("preserves uncertainty in capability evaluation",()=>{
   expect(evaluateDeviceCapabilities("DEVICE.PHONES.SMARTPHONE",["CAPABILITY.DEVICE.TOUCH"]).status).toBe("SUPPORTED");
   expect(evaluateDeviceCapabilities("DEVICE.PHONES.SMARTPHONE",["CAPABILITY.INVENTED"]).status).toBe("UNVERIFIED");
   expect(evaluateDeviceCapabilities("DEVICE.DESKTOP_COMPUTING.DESKTOP",["CAPABILITY.DEVICE.TOUCH"]).status).toBe("LIMITED");
 });
 it("executes typed mobile region transformations with traceable IDs",()=>{
   const result=transformCompositionRegions({sidebar:<span>Navigation body</span>,inspector:<span>Inspector body</span>,nav:<span>Bottom links</span>},390);
   expect(result.props.sidebar).toBeUndefined();expect(result.props.inspector).toBeUndefined();expect(result.props.nav).toBeUndefined();
   expect(result.stack).toBe(true);expect(result.applied).toContain("RESPONSIVE.SIDEBAR_TO_DRAWER");
   render(<>{result.props.toolbar}{result.props.footer}{result.props.bottomNav}</>);
   expect(screen.getByText("Navigation")).toBeInTheDocument();expect(screen.getByText("Inspector")).toBeInTheDocument();
   expect(result.unverified.length).toBeGreaterThan(0);
 });
});

it("includes capability uncertainty in shared composition validation without forbidding canonical choices",()=>{
 const result=validateCompositionKernel(DEFAULT_COMPOSER_SCENE,{requiredCapabilityIds:["CAPABILITY.INVENTED"]});
 expect(result.valid).toBe(true);expect(result.deviceCapabilities.status).toBe("UNVERIFIED");
 expect(result.warnings.map(x=>x.code)).toContain("DEVICE_CAPABILITY_UNVERIFIED");
});

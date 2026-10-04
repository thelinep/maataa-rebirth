import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type InvoiceGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function InvoiceGenerator(props:InvoiceGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.INVOICE_GENERATOR" name="Invoice Generator" {...props} />; }

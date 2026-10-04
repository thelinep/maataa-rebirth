import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type InvestmentMemoGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function InvestmentMemoGenerator(props:InvestmentMemoGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.INVESTMENT_MEMO_GENERATOR" name="Investment Memo Generator" {...props} />; }

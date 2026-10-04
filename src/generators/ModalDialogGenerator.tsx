import React from "react";
import { GeneratorSurface, type GeneratorSurfaceProps } from "./GeneratorSurface";
export type ModalDialogGeneratorProps = Omit<GeneratorSurfaceProps, "generatorId" | "name">;
export function ModalDialogGenerator(props:ModalDialogGeneratorProps) { return <GeneratorSurface generatorId="GENERATOR.MODAL_DIALOG_GENERATOR" name="Modal/Dialog Generator" {...props} />; }

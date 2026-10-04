import React from "react";
import { PagePreset, type PagePresetProps } from "./PagePreset";

export type TransactionPageProps = Omit<PagePresetProps, "pageType"> & { pageType?: string };
export function TransactionPage({ pageType = "PAGE.TEMPLATE.TRANSACTION", ...props }: TransactionPageProps) { return <PagePreset pageType={pageType} {...props} />; }

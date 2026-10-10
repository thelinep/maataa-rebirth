import { NextResponse } from "next/server";
import { noStore, runShell } from "@/lib/shell";

export const runtime = "nodejs";

export function GET(request: Request) {
  const url = new URL(request.url);
  if ([...url.searchParams.keys()].some((key) => key !== "sclk")) {
    return NextResponse.json({ error: "only the sclk parameter is accepted" }, { status: 400, headers: noStore });
  }
  const clock = url.searchParams.get("sclk");
  if (!clock || !/^\d{10}-\d{5}$/.test(clock)) {
    return NextResponse.json({ error: "sclk must use the Mars 2020 SSSSSSSSSS-FFFFF format" }, { status: 400, headers: noStore });
  }
  const outcome = runShell(["--mars2020-sclk", clock]);
  if (!outcome.ok) return NextResponse.json({ error: outcome.error }, { status: outcome.status, headers: noStore });
  return NextResponse.json(outcome.json, { headers: noStore });
}

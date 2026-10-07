declare module "@maataa/governance" {
  export function canDispatch(input: unknown): boolean;
}

declare module "@maataa/react" {
  export function createMaataaReact(
    host: Pick<typeof import("react"), "createElement" | "useState" | "useEffect">,
    services?: Record<string, unknown>
  ): Record<string, import("react").ComponentType<Record<string, unknown>>>;
}

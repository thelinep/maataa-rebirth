import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders the default variant by default", () => {
    render(<Badge>Neutral</Badge>);
    expect(screen.getByText("Neutral")).toBeInTheDocument();
  });

  it.each(["default", "success", "warning", "error", "info"] as const)(
    "renders the %s variant without throwing",
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
    }
  );

  it.each(["sm", "md", "lg"] as const)("renders the %s size without throwing", (size) => {
    render(<Badge size={size}>{size}</Badge>);
    expect(screen.getByText(size)).toBeInTheDocument();
  });

  it("does not render a dismiss button when onDismiss is not provided", () => {
    render(<Badge>No dismiss</Badge>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a dismiss button when onDismiss is provided", () => {
    render(<Badge onDismiss={() => {}}>Dismissible</Badge>);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("calls onDismiss when the dismiss button is clicked", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<Badge onDismiss={onDismiss}>Dismissible</Badge>);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("merges a custom style with its own", () => {
    render(
      <Badge style={{ marginTop: "10px" }} data-testid="badge">
        Styled
      </Badge>
    );
    expect(screen.getByTestId("badge")).toHaveStyle({ marginTop: "10px" });
  });

  it("forwards ref to the underlying span", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref test</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("passes through arbitrary HTML attributes", () => {
    render(<Badge data-testid="custom-badge">Custom</Badge>);
    expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
  });
});

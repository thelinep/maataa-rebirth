import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    render(<Card title="Profile">Content</Card>);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders a subtitle when provided", () => {
    render(
      <Card title="Profile" subtitle="User information">
        Content
      </Card>
    );
    expect(screen.getByText("User information")).toBeInTheDocument();
  });

  it("does not render a header when neither title nor subtitle is provided", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders a footer when provided", () => {
    render(<Card footer={<span>Footer content</span>}>Content</Card>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("toggles hover cursor styling only when interactive", () => {
    render(
      <Card interactive data-testid="card">
        Content
      </Card>
    );
    const card = screen.getByTestId("card");
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle({ cursor: "pointer" });
    fireEvent.mouseLeave(card);
    expect(card).toHaveStyle({ cursor: "default" });
  });

  it("does not change cursor on hover when not interactive", () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId("card");
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle({ cursor: "default" });
  });

  it("merges a custom style with its own", () => {
    render(
      <Card style={{ marginTop: "10px" }} data-testid="card">
        Content
      </Card>
    );
    expect(screen.getByTestId("card")).toHaveStyle({ marginTop: "10px" });
  });

  it("forwards ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

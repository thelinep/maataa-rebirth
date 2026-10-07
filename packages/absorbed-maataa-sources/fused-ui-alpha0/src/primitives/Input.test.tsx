import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders a text input", () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("renders a label when provided and associates it via htmlFor/id", () => {
    render(<Input id="email" label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");
    await user.type(input, "hello@example.com");
    expect(input).toHaveValue("hello@example.com");
  });

  it("shows an error message when provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows helper text when provided and there is no error", () => {
    render(<Input helperText="Enter a valid email" />);
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("hides helper text when an error is also present", () => {
    render(<Input error="Required" helperText="Enter a valid email" />);
    expect(screen.queryByText("Enter a valid email")).not.toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(<Input icon={<span data-testid="icon">*</span>} placeholder="Search" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies a passed-in className instead of dropping it", () => {
    render(<Input className="my-custom-class" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveClass("my-custom-class");
  });

  it("tracks focus state via onFocus/onBlur callbacks", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const user = userEvent.setup();
    render(<Input placeholder="Email" onFocus={onFocus} onBlur={onBlur} />);
    const input = screen.getByPlaceholderText("Email");
    await user.click(input);
    expect(onFocus).toHaveBeenCalled();
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it("respects the disabled prop", () => {
    render(<Input placeholder="Email" disabled />);
    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });

  it("forwards ref to the underlying input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Email" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

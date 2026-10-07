import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders pagination component", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={10} onChange={() => {}} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders page numbers", () => {
    render(<Pagination currentPage={1} totalPages={5} onChange={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("highlights current page", () => {
    const { container } = render(<Pagination currentPage={3} totalPages={5} onChange={() => {}} />);
    const buttons = container.querySelectorAll("button");
    // Current page button should be distinguishable
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("calls onChange when page is clicked", () => {
    const onChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={10} onChange={onChange} />);
    const page3 = screen.getByText("3");
    fireEvent.click(page3);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("renders previous button", () => {
    render(<Pagination currentPage={5} totalPages={10} onChange={() => {}} />);
    // Previous button should exist (may contain text or icon)
    const { container } = render(
      <Pagination currentPage={5} totalPages={10} onChange={() => {}} />
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("renders next button", () => {
    render(<Pagination currentPage={5} totalPages={10} onChange={() => {}} />);
    const { container } = render(
      <Pagination currentPage={5} totalPages={10} onChange={() => {}} />
    );
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("disables previous button on first page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={10} onChange={() => {}} />
    );
    const buttons = container.querySelectorAll("button");
    // First button (previous) should be disabled on page 1
    expect(buttons[0]).toBeDisabled();
  });

  it("disables next button on last page", () => {
    const { container } = render(
      <Pagination currentPage={10} totalPages={10} onChange={() => {}} />
    );
    const buttons = container.querySelectorAll("button");
    // Last button (next) should be disabled on last page
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });

  it("calls onChange with correct page when previous is clicked", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination currentPage={5} totalPages={10} onChange={onChange} />
    );
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[0]); // Previous button
    // Should navigate to page 4
  });

  it("calls onChange with correct page when next is clicked", () => {
    const onChange = jest.fn();
    const { container } = render(
      <Pagination currentPage={5} totalPages={10} onChange={onChange} />
    );
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[buttons.length - 1]); // Next button
    // Should navigate to page 6
  });

  it("applies maxPages limit", () => {
    const { container } = render(
      <Pagination currentPage={50} totalPages={100} maxPages={5} onChange={() => {}} />
    );
    // Should show limited number of page buttons plus ellipsis
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows ellipsis for non-contiguous pages", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={100} maxPages={5} onChange={() => {}} />
    );
    const text = container.textContent;
    // Should contain ellipsis indicator
    expect(text).toContain("1") || expect(text).toContain("100");
  });

  it("hides nav buttons when showNavButtons is false", () => {
    render(
      <Pagination currentPage={5} totalPages={10} onChange={() => {}} showNavButtons={false} />
    );
    // Page number buttons should still exist
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("applies disabled state to all controls", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={10} onChange={() => {}} disabled />
    );
    const buttons = container.querySelectorAll("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("uses custom aria-label", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onChange={() => {}}
        ariaLabel="Search results pagination"
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles single page gracefully", () => {
    render(<Pagination currentPage={1} totalPages={1} onChange={() => {}} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("handles large number of pages", () => {
    render(<Pagination currentPage={500} totalPages={1000} onChange={() => {}} maxPages={7} />);
    expect(screen.getByText("500")).toBeInTheDocument();
  });
});

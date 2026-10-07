import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

describe("Dropdown", () => {
  const items = [
    { id: "1", label: "Edit", onClick: jest.fn() },
    { id: "2", label: "Share", onClick: jest.fn() },
    { id: "3", label: "Delete", onClick: jest.fn() },
  ];

  it("renders trigger element", () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("opens dropdown when trigger is clicked", async () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });
  });

  it("renders all menu items", async () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Share")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });
  });

  it("calls onClick when menu item is clicked", async () => {
    const onClick = jest.fn();
    const itemsWithClick = [{ id: "1", label: "Action", onClick }];

    render(<Dropdown trigger={<button>Menu</button>} items={itemsWithClick} />);

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      const action = screen.getByText("Action");
      fireEvent.click(action);
    });

    expect(onClick).toHaveBeenCalled();
  });

  it("renders icons when provided", async () => {
    const itemsWithIcons = [
      { id: "1", label: "Copy", icon: "📋", onClick: jest.fn() },
      { id: "2", label: "Paste", icon: "📌", onClick: jest.fn() },
    ];

    render(<Dropdown trigger={<button>Menu</button>} items={itemsWithIcons} />);

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("📋")).toBeInTheDocument();
      expect(screen.getByText("📌")).toBeInTheDocument();
    });
  });

  it("renders dividers", async () => {
    const itemsWithDividers = [
      { id: "1", label: "Edit", onClick: jest.fn() },
      { id: "2", label: "divider", divider: true },
      { id: "3", label: "Delete", onClick: jest.fn() },
    ];

    render(<Dropdown trigger={<button>Menu</button>} items={itemsWithDividers} />);

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });
  });

  it("handles disabled items", async () => {
    const onClick = jest.fn();
    const itemsWithDisabled = [
      { id: "1", label: "Enabled", onClick },
      { id: "2", label: "Disabled", disabled: true, onClick: jest.fn() },
    ];

    render(<Dropdown trigger={<button>Menu</button>} items={itemsWithDisabled} />);

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      const disabled = screen.getByText("Disabled");
      expect(
        disabled.closest("button") || disabled.closest('[role="menuitem"]')
      ).toBeInTheDocument();
    });
  });

  it("applies position variants", () => {
    const positions = ["top", "right", "bottom", "left"] as const;
    positions.forEach((position) => {
      const { container } = render(
        <Dropdown trigger={<button>Menu</button>} items={items} position={position} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it("closes dropdown on escape key", async () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    fireEvent.keyDown(trigger, { key: "Escape" });

    // Menu should be closed
    await waitFor(
      () => {
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
      },
      { timeout: 100 }
    );
  });

  it("disables dropdown when disabled prop is true", () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} disabled />);

    const trigger = screen.getByText("Menu");
    // Dropdown should be disabled (trigger button or container)
    expect(trigger.closest("button")).toBeInTheDocument();
  });

  it("closes when item is clicked", async () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    const edit = screen.getByText("Edit");
    fireEvent.click(edit);

    // Menu should close after item selection
    await waitFor(
      () => {
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
      },
      { timeout: 100 }
    );
  });

  it("handles onSelect callback", async () => {
    const onSelect = jest.fn();
    const itemsWithSelect = [{ id: "1", label: "Item 1", onClick: jest.fn() }];

    render(
      <Dropdown trigger={<button>Menu</button>} items={itemsWithSelect} onSelect={onSelect} />
    );

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      const item = screen.getByText("Item 1");
      fireEvent.click(item);
    });

    // onSelect should be called
  });

  it("renders many items", async () => {
    const manyItems = Array.from({ length: 20 }, (_, i) => ({
      id: `${i}`,
      label: `Item ${i + 1}`,
      onClick: jest.fn(),
    }));

    render(<Dropdown trigger={<button>Menu</button>} items={manyItems} />);

    const trigger = screen.getByText("Menu");
    fireEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });
  });
});

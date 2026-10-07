import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./Pagination";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={10} onChange={setPage} />;
  },
};

export const SmallDataset: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={5} onChange={setPage} />;
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={100} onChange={setPage} maxPages={7} />;
  },
};

export const FirstPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={10} onChange={setPage} />;
  },
};

export const MiddlePage: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination currentPage={page} totalPages={10} onChange={setPage} />;
  },
};

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return <Pagination currentPage={page} totalPages={10} onChange={setPage} />;
  },
};

export const WithoutNavButtons: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <Pagination currentPage={page} totalPages={10} onChange={setPage} showNavButtons={false} />
    );
  },
};

export const Disabled: Story = {
  render: () => <Pagination currentPage={1} totalPages={10} onChange={() => {}} disabled />,
};

export const CustomMaxPages: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination currentPage={page} totalPages={50} onChange={setPage} maxPages={5} />;
  },
};

export const CustomAriaLabel: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onChange={setPage}
        ariaLabel="Product search results pagination"
      />
    );
  },
};

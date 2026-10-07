import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMaataaProduct } from "./kernelIntegration";
import { ComplianceStatusDashboard } from "./trust/components";

const Product = createMaataaProduct(React);

test("combined Button dispatches through an explicit allow decision", () => {
  const onAction = vi.fn();
  render(
    <Product.Button
      policyDecision={{ id: "p1", outcome: "allow", reasonCodes: [] }}
      onAction={onAction}
    >
      Run action
    </Product.Button>
  );

  fireEvent.click(screen.getByRole("button", { name: "Run action" }));
  expect(onAction).toHaveBeenCalledTimes(1);
});

test("combined Button disables and blocks actions without policy approval", () => {
  const onClick = vi.fn();
  const onAction = vi.fn();
  render(
    <Product.Button
      policyDecision={{
        id: "p2",
        outcome: "allow_with_approval",
        reasonCodes: ["HUMAN"],
        requiredApprovalIds: ["a1"],
      }}
      onClick={onClick}
      onAction={onAction}
    >
      Restricted action
    </Product.Button>
  );

  const button = screen.getByRole("button", { name: "Restricted action" });
  expect(button).toBeDisabled();
  fireEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
  expect(onAction).not.toHaveBeenCalled();
});

test("combined Button dispatches only after every required approval is present", () => {
  const onAction = vi.fn();
  render(
    <Product.Button
      policyDecision={{
        id: "p3",
        outcome: "allow_with_approval",
        reasonCodes: ["HUMAN"],
        requiredApprovalIds: ["a1", "a2"],
      }}
      approvals={[
        { id: "a1", status: "approved" },
        { id: "a2", status: "approved" },
      ]}
      onAction={onAction}
    >
      Approved action
    </Product.Button>
  );

  fireEvent.click(screen.getByRole("button", { name: "Approved action" }));
  expect(onAction).toHaveBeenCalledTimes(1);
});

test("compliance display never invents a percentage or status", () => {
  render(<ComplianceStatusDashboard />);
  expect(screen.getByRole("status", { name: "GDPR: Not connected" })).toBeInTheDocument();
  expect(screen.queryByText("85%")).not.toBeInTheDocument();
});

test("compliance display labels caller data as reported instead of certified", () => {
  render(
    <ComplianceStatusDashboard frameworks={["SOC2"]} statuses={{ SOC2: "reported-compliant" }} />
  );
  expect(screen.getByRole("status", { name: "SOC2: Reported compliant" })).toBeInTheDocument();
  expect(screen.getByText(/does not certify compliance/i)).toBeInTheDocument();
});

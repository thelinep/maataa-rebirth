import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { DemoCollectionState } from "../../types/redux";
import { DEMO_PROJECTS } from "../../static-data/demoProjects";
import { DEMO_EVENTS } from "../../static-data/demoEvents";
import { DEMO_VENDORS, DEMO_BOOKINGS } from "../../static-data/demoCommerce";
import { DEMO_TRANSACTIONS } from "../../static-data/demoFinance";
import { DEMO_TASKS } from "../../static-data/demoTasks";
import { DEMO_PRODUCTION } from "../../static-data/demoProduction";
import { DEMO_ACTIVITY } from "../../static-data/demoNotifications";
import { DEMO_EVALUATIONS } from "../../static-data/demoAI";

type DemoRecord = { id: string; [key: string]: unknown };
type CollectionStateSelector = (state: RootState) => DemoCollectionState;

function createFilteredSelector<T extends { id: string }>(records: readonly T[], selectCollection: CollectionStateSelector, searchFields: readonly string[], facetField: string) {
  return createSelector(
    [
      (state: RootState) => selectCollection(state).query.trim().toLowerCase(),
      (state: RootState) => selectCollection(state).facet,
    ],
    (query, facet) => records.filter((item) => {
      const record = item as DemoRecord;
      // eslint-disable-next-line @typescript-eslint/no-base-to-string -- demo records hold scalar fields; String() coercion for search matching is existing behaviour
      const matchesQuery = !query || searchFields.some((field) => String(record[field] ?? "").toLowerCase().includes(query));
      // eslint-disable-next-line @typescript-eslint/no-base-to-string -- demo records hold scalar fields; String() coercion for facet matching is existing behaviour
      const matchesFacet = !facet || String(record[facetField] ?? "") === facet;
      return matchesQuery && matchesFacet;
    }),
  );
}

const selectProjectState = (state: RootState) => state.project;
const selectEventState = (state: RootState) => state.event;
const selectVendorState = (state: RootState) => state.vendor;
const selectBookingState = (state: RootState) => state.booking;
const selectFinanceState = (state: RootState) => state.finance;
const selectTaskState = (state: RootState) => state.task;
const selectProductionState = (state: RootState) => state.production;
const selectActivityState = (state: RootState) => state.activity;
const selectEvaluationState = (state: RootState) => state.evaluation;

const commonSearchFields = ["name", "id"] as const;
export const selectFilteredProjects = createFilteredSelector(DEMO_PROJECTS, selectProjectState, [...commonSearchFields, "code"], "status");
export const selectFilteredEvents = createFilteredSelector(DEMO_EVENTS, selectEventState, [...commonSearchFields, "city", "venue"], "status");
export const selectFilteredVendors = createFilteredSelector(DEMO_VENDORS, selectVendorState, [...commonSearchFields, "category", "city"], "status");
export const selectFilteredBookings = createFilteredSelector(DEMO_BOOKINGS, selectBookingState, [...commonSearchFields, "service", "eventId", "vendorId"], "status");
export const selectFilteredTransactions = createFilteredSelector(DEMO_TRANSACTIONS, selectFinanceState, [...commonSearchFields, "account", "reference"], "status");
export const selectFilteredTasks = createFilteredSelector(DEMO_TASKS, selectTaskState, [...commonSearchFields, "assigneeId", "projectId"], "status");
export const selectFilteredProductionRecords = createFilteredSelector(
  [...DEMO_PRODUCTION.productions, ...DEMO_PRODUCTION.scenes, ...DEMO_PRODUCTION.crew],
  selectProductionState,
  [...commonSearchFields, "location", "department", "number"],
  "status",
);
export const selectFilteredActivity = createFilteredSelector(DEMO_ACTIVITY, selectActivityState, [...commonSearchFields, "actorId", "action", "object"], "actorId");
export const selectFilteredEvaluations = createFilteredSelector(DEMO_EVALUATIONS, selectEvaluationState, [...commonSearchFields, "metric"], "severity");

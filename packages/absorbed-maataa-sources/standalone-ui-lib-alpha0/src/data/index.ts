/**
 * @maataa/ui/data
 * Category: data
 * Data visualization components — tables, metrics, and charts (MUI-07 start)
 */

export { Legend, type LegendProps, type LegendItem } from "./Legend";
export { EmptyState, type EmptyStateProps } from "./EmptyState";
export { Sparkline, type SparklineProps } from "./Sparkline";
export { MetricCard, type MetricCardProps } from "./MetricCard";
export { LineChart, type LineChartProps, type ChartSeries } from "./LineChart";
export { BarChart, type BarChartProps } from "./BarChart";
export { AreaChart, type AreaChartProps } from "./AreaChart";
export { DonutChart, type DonutChartProps, type DonutSlice } from "./DonutChart";
export { DataTable, type DataTableProps, type DataTableColumn } from "./DataTable";

// Component metadata for Storybook and docs
export const dataComponents = [
  {
    id: "legend",
    name: "Legend",
    component: "Legend",
    category: "Data",
    description: "Series identity key for a chart with two or more series",
  },
  {
    id: "empty-state",
    name: "EmptyState",
    component: "EmptyState",
    category: "Data",
    description: "Placeholder for a table, chart, or list with nothing to show",
  },
  {
    id: "sparkline",
    name: "Sparkline",
    component: "Sparkline",
    category: "Data",
    description: "A compact, axis-free inline trend line",
  },
  {
    id: "metric-card",
    name: "MetricCard",
    component: "MetricCard",
    category: "Data",
    description: "A stat tile: label, headline value, optional delta and trend sparkline",
  },
  {
    id: "line-chart",
    name: "LineChart",
    component: "LineChart",
    category: "Data",
    description: "A multi-series line chart with gridlines, legend, and hover tooltip",
  },
  {
    id: "bar-chart",
    name: "BarChart",
    component: "BarChart",
    category: "Data",
    description: "A grouped bar chart with gridlines, legend, and hover tooltip",
  },
  {
    id: "area-chart",
    name: "AreaChart",
    component: "AreaChart",
    category: "Data",
    description: "A line chart with a soft fill wash under each series",
  },
  {
    id: "donut-chart",
    name: "DonutChart",
    component: "DonutChart",
    category: "Data",
    description: "Categorical share-of-total, as a ring of stroke segments",
  },
  {
    id: "data-table",
    name: "DataTable",
    component: "DataTable",
    category: "Data",
    description: "A sortable table — also the table view backing any chart's raw data",
  },
];

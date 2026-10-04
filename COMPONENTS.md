# Component inventory

## Foundation
UiProvider, ThemeProvider, Box, Stack, Flex, Grid, Container, Section, Panel, Divider, Spacer, AspectRatio, ScrollArea, VisuallyHidden, Portal.

## Typography
Text, Heading, Label, Caption, Code, Kbd, Link, Blockquote, Truncate.

## Actions
Button, IconButton, ButtonGroup, ToggleButton, ToggleGroup, SplitButton, CommandButton, LinkButton, FloatingActionButton/FAB.

## Forms
Input, Textarea, Select/NativeSelect, Checkbox, Radio, RadioGroup, Switch, Slider, NumberInput, SearchInput, PasswordInput, Combobox, MultiSelect, DatePicker, TimePicker, DateRangePicker, ColorPicker, FileInput, FormField, FieldLabel, FieldDescription, FieldError, FormGroup, FormSection, FormBuilder.

## Navigation
AppShell, TopNav, Sidebar, NavItem, NavGroup, Breadcrumb, Tabs, Pagination, Stepper, Menu, DropdownMenu, ContextMenu, CommandMenu, Toolbar, BottomNavigation, MobileNavigation.

## Surfaces
Card, Surface, Panel, Modal/Dialog, AlertDialog, Drawer/Sheet, Popover, Tooltip/HoverCard, Accordion, Collapsible, ToastProvider, Toast, Toaster.

## Feedback
Badge/StatusBadge/Tag/Chip, Alert/Banner/Callout, Progress/ProgressBar, Spinner, Skeleton, EmptyState, LoadingState, ErrorState, OfflineState, ForbiddenState, NotFoundState, OnlineStatus, SyncStatus.

## Data
Table, DataTable, TableToolbar, ColumnHeader, SortIndicator, FilterBar, List, DescriptionList, Timeline, Avatar, AvatarGroup, Stat/Metric/KPI, Tree, TreeItem.

## Visualization
BarChart, LineChart, AreaChart, DonutChart/PieChart, Sparkline, Heatmap, Legend, ChartTooltip, Trend.

## Maps
Map/GeoMap, MapMarker, MapControls, MapLegend, MapPopup. These are provider-neutral visual surfaces; actual map tile/provider integrations belong to host adapters.

## Mobile
MobileShell, MobileHeader, MobileBottomNav, MobileNavigation, MobileDrawer, BottomSheet, MobileFAB, SwipeAction, SafeArea, PullToRefresh, OfflineIndicator, SyncIndicator.


## Layouts

Layout regions are atomic (`layout-atoms`) and named page/workspace archetypes are compositional (`layouts`). See `LAYOUTS.md` for the full 100-pattern catalog.

## Device components

Alpha 6 adds 20 atomic device regions and 187 canonical device-frame components. Use direct imports such as `@maataa/ui/devices/SmartphoneFrame` and `@maataa/ui/device-atoms/DeviceSafeArea`. Frames are preview/composition surfaces, not hardware drivers.

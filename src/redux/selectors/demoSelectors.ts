import type { RootState } from "../store";
import { DEMO_SCENARIOS } from "../../demo/scenarios";
import { DEMO_PROJECTS } from "../../static-data/demoProjects";
import { DEMO_EVENTS } from "../../static-data/demoEvents";
import { DEMO_TASKS } from "../../static-data/demoTasks";
export const selectDemoScenario=(s:RootState)=>DEMO_SCENARIOS.find(x=>x.id===s.demo.activeScenarioId)??DEMO_SCENARIOS[0];
export const selectProjectById=(_s:RootState,id:string)=>DEMO_PROJECTS.find(x=>x.id===id);
export const selectEventById=(_s:RootState,id:string)=>DEMO_EVENTS.find(x=>x.id===id);
export const selectTasksForUser=(s:RootState)=>s.session.user?DEMO_TASKS.filter(x=>x.assigneeId===s.session.user?.id):[];

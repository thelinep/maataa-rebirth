import type { DemoTask } from "../types/demo";
const c="2026-10-02T09:00:00+05:30",u="2026-10-04T08:30:00+05:30";
export const DEMO_TASKS: readonly DemoTask[] = [
{id:"task-01",name:"Review component export graph",assigneeId:"user-parvati",projectId:"project-ui",dueAt:"2026-10-05T18:00:00+05:30",status:"doing",priority:"high",createdAt:c,updatedAt:u},
{id:"task-02",name:"Certify keyboard behavior",assigneeId:"user-parvati",projectId:"project-ui",dueAt:"2026-10-08T18:00:00+05:30",status:"todo",priority:"high",createdAt:c,updatedAt:u},
{id:"task-03",name:"Confirm event run of show",assigneeId:"user-kashyapa",projectId:"project-nevo",dueAt:"2026-10-10T18:00:00+05:30",status:"review",priority:"urgent",createdAt:c,updatedAt:u},
{id:"task-04",name:"Finalize AV vendor",assigneeId:"user-kashyapa",projectId:"project-nevo",dueAt:"2026-10-06T18:00:00+05:30",status:"doing",priority:"high",createdAt:c,updatedAt:u},
{id:"task-05",name:"Script breakdown revision",assigneeId:"user-jamadagni",projectId:"project-film",dueAt:"2026-10-12T18:00:00+05:30",status:"todo",priority:"medium",createdAt:c,updatedAt:u},
{id:"task-06",name:"Review evidence eval failures",assigneeId:"user-gautama",projectId:"project-ai",dueAt:"2026-10-07T18:00:00+05:30",status:"doing",priority:"urgent",createdAt:c,updatedAt:u}
] as const;

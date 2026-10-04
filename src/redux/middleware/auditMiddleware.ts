import type { Middleware } from "@reduxjs/toolkit";
export interface ReduxAuditEvent { type:string; at:string; demo:boolean; }
export const createAuditMiddleware=(sink?:(event:ReduxAuditEvent)=>void):Middleware=>_store=>next=>action=>{const result=next(action);if(sink&&typeof action==="object"&&action&&"type" in action)sink({type:String((action as {type:string}).type),at:new Date().toISOString(),demo:true});return result;};

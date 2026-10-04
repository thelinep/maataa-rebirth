import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface FormRecord { values:Record<string,unknown>; errors:Record<string,string>; dirty:boolean; submitting:boolean; submitted:boolean; }
export interface FormState { forms:Record<string,FormRecord>; }
export const initialFormState:FormState={forms:{"demo-event-form":{values:{name:"Private Banking Wellness Salon",guests:48,city:"Delhi NCR"},errors:{},dirty:false,submitting:false,submitted:false}}};
const ensure=(s:FormState,id:string)=>s.forms[id]??(s.forms[id]={values:{},errors:{},dirty:false,submitting:false,submitted:false});
const slice=createSlice({name:"form",initialState:initialFormState,reducers:{setField:(s,a:PayloadAction<{formId:string;field:string;value:unknown}>)=>{const f=ensure(s,a.payload.formId);f.values[a.payload.field]=a.payload.value;f.dirty=true},setErrors:(s,a:PayloadAction<{formId:string;errors:Record<string,string>}>)=>{ensure(s,a.payload.formId).errors=a.payload.errors},setSubmitting:(s,a:PayloadAction<{formId:string;submitting:boolean}>)=>{ensure(s,a.payload.formId).submitting=a.payload.submitting},markSubmitted:(s,a:PayloadAction<string>)=>{const f=ensure(s,a.payload);f.submitted=true;f.submitting=false;f.dirty=false},resetForm:(s,a:PayloadAction<string>)=>{delete s.forms[a.payload]}}});
export const formActions=slice.actions; export const formReducer=slice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AIState } from "../../types/redux";
import type { AISpaceId } from "../../types/identifiers";
import type { AIMessage } from "../../types/ai";
import { DEMO_AI_MESSAGES } from "../../static-data/demoAI";

export const initialAIState: AIState = {
  activeSpaceId: "AI_SPACE.AI_COMMAND_CENTER",
  selectedAgentId: "agent-evidence",
  selectedModelId: "model-reason",
  messages: [...DEMO_AI_MESSAGES],
  traceEnabled: true,
};

const slice = createSlice({
  name: "ai",
  initialState: initialAIState,
  reducers: {
    activateAISpace: (state, action: PayloadAction<AISpaceId>) => {
      state.activeSpaceId = action.payload;
    },
    selectAgent: (state, action: PayloadAction<string | null>) => {
      state.selectedAgentId = action.payload;
    },
    selectModel: (state, action: PayloadAction<string | null>) => {
      state.selectedModelId = action.payload;
    },
    addMessage: (state, action: PayloadAction<AIMessage>) => {
      state.messages.push({
        ...action.payload,
        citations: action.payload.citations ? [...action.payload.citations] : undefined,
      });
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setTraceEnabled: (state, action: PayloadAction<boolean>) => {
      state.traceEnabled = action.payload;
    },
  },
});

export const aiActions = slice.actions;
export const aiReducer = slice.reducer;

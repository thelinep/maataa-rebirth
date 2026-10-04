import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SessionState } from "../../types/redux";
import { DEMO_USERS } from "../../static-data/demoUsers";

const demoUser = DEMO_USERS[0];

export const initialSessionState: SessionState = {
  status: "authenticated",
  user: demoUser,
  activeOrganisationId: demoUser.organisationId,
  activeRoleId: demoUser.roleIds[0] ?? null,
  permissionIds: [...demoUser.permissionIds],
};

const slice = createSlice({
  name: "session",
  initialState: initialSessionState,
  reducers: {
    signInDemo: (state, action: PayloadAction<string>) => {
      const user = DEMO_USERS.find((item) => item.id === action.payload) ?? DEMO_USERS[0];
      const mutableUser = {
        ...user,
        roleIds: [...user.roleIds],
        permissionIds: [...user.permissionIds],
      };

      state.status = "authenticated";
      state.user = mutableUser;
      state.activeOrganisationId = user.organisationId;
      state.activeRoleId = user.roleIds[0] ?? null;
      state.permissionIds = [...user.permissionIds];
    },
    signOut: (state) => {
      state.status = "anonymous";
      state.user = null;
      state.activeOrganisationId = null;
      state.activeRoleId = null;
      state.permissionIds = [];
    },
    setOrganisation: (state, action: PayloadAction<string>) => {
      state.activeOrganisationId = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.activeRoleId = action.payload;
    },
  },
});

export const sessionActions = slice.actions;
export const sessionReducer = slice.reducer;

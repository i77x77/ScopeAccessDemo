import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Permission {
  resource: string;
  scopes: string[];
}

interface PermissionsState {
  data: Permission[];
}

const initialState: PermissionsState = {
  data: [],
};

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.data = action.payload;
    },
    clearPermissions: (state) => {
      state.data = [];
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;

export default permissionsSlice.reducer;

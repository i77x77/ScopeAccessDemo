import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Permission {
  resource: string;
  scopes: string[];
}

interface PermissionsState {
  data: Permission[] | null;
}

const initialState: PermissionsState = {
  data: null,
};

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<Permission[]>) => {
      state.data = action.payload;
    },
    clearPermissions: (state) => {
      state.data = null;
    },
  },
});

export const { setPermissions, clearPermissions } = permissionsSlice.actions;
export default permissionsSlice.reducer;

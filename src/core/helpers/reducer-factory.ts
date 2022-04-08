export const createReducer = ((strategies: any, initialState: any) =>
  (state = initialState, { type, payload }) =>
    (strategies[type] ?? strategies.__default__)(state, payload)
);

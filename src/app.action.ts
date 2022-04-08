import ACTION_TYPES from './core/constants/types';

export const updateCart = (payload) => ({
  type: ACTION_TYPES.UPDATE_CART,
  payload
});

export const resetGroupAreas = () => ({
  type: ACTION_TYPES.RESET_CART
});

export const updatePortalView = (payload) => ({
  type: ACTION_TYPES.UPDATE_PORTALVIEW,
  payload
});

export const updatePayment = (payload) => ({
  type: ACTION_TYPES.UPDATE_PAYMENT,
  payload
});

import { combineReducers } from 'redux';

import { createReducer } from './core/helpers/reducer-factory';
import ACTION_TYPES from './core/constants/types';

const initialState = {
  portalView: null,
  cart: {
    pizzas: [],
    summary: 0
  },
  payment: null
};

const updateCart = (state, payload) => ({
  ...state,
  ...payload
});

const onResetCart = (state) => ({
  ...state,
  cart: initialState.cart
});

const cartDataStrategies = {
  [ACTION_TYPES.UPDATE_CART]: updateCart,
  [ACTION_TYPES.RESET_CART]: onResetCart,
  __default__: state => state
};

const cartDataReducer = createReducer(cartDataStrategies, initialState.cart);

const updatePortalView = (state, payload) => ({
  ...state,
  portalView: payload
});

const portalViewStrategies = {
  [ACTION_TYPES.UPDATE_PORTALVIEW]: updatePortalView,
  __default__: state => state
}

const portalViewReducer = createReducer(portalViewStrategies, initialState.portalView);

const updatePayment = (state, payload) => ({
  ...state,
  ...payload
});

const paymentStrategies = {
  [ACTION_TYPES.UPDATE_PAYMENT]: updatePayment,
  __default__: state => state
}

const paymentReducer = createReducer(paymentStrategies, initialState.payment);

const appReducer = combineReducers({
  cart: cartDataReducer,
  portalView: portalViewReducer,
  payment: paymentReducer
});

export default appReducer;

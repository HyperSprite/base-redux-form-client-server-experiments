// @flow

import { TYPES } from '../actions';

export default function (state = {
  transitionPage: false,
  modalShow: false,
}, action) {
  switch (action.type) {
    case TYPES.AUTH_EDIT_USER:
    case TYPES.PAGE_TRANSITION_TRUE:
      return { ...state, transitionPage: true };
    case TYPES.PAGE_TRANSITION_FALSE:
      return { ...state, transitionPage: false };
    case TYPES.TOGGLE_MODAL:
      return {
        ...state,
        modalShow: !state.modalShow,
        modalTitle: action.payload.modalTitle,
        modalType: action.payload.modalType,
        modalSize: action.payload.modalSize,
      };
    default:
      return state;
  }
}

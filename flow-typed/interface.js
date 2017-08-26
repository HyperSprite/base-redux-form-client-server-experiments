// @flow
//

export type ReduxActionIF = {
  type: string,
  payload: any,
}

// these are Action Creator Strings, see actions.js file
export type ActionStrings = (
  'ADD_TODO' |
  'TOGGLE_TODO' |
  'SET_VISIBILITY_FILTER' |
  'AUTH_USER' |
  'AUTH_EDIT_USER' |
  'UNAUTH_USER' |
  'AUTH_ERROR' |
  'FETCH_DATA' |
  'FETCH_JSON' |
  'SET_USER' |
  'PAGE_TRANSITION_FALSE' |
  'PAGE_TRANSITION_TRUE' |
  'TOGGLE_MODAL' |
  'PHOTOS_DELETE' |
  'PHOTOS_FETCH' |
  'PHOTOS_POST' |
  'PHOTOS_SWAP_DISPLAY_TRASH'
  )

import * as navbarActions from 'actionTypes/navbar';

export const resetNavbarScroll = () => ({
  type: navbarActions.RESET_SCROLL_PROPERTIES,
});

export const setScrollProperties = payload => ({
  type: navbarActions.SET_SCROLL_PROPERTIES,
  payload,
});

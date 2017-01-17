import * as navbarActions from 'actionTypes/navbar';
import styles from 'components/palette.css';

export const initialState = {
  startColor: styles.black9,
  startBackgroundColor: styles.textColorPrimaryAlpha,
  startChangeHeight: null,
  endChangeHeight: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case navbarActions.SET_SCROLL_PROPERTIES:
      return {
        ...state,
        ...action.payload,
      };
    case navbarActions.RESET_SCROLL_PROPERTIES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const selectors = {
  startColor: state => state.app.navbar.startColor,
  startBackgroundColor: state => state.app.navbar.startBackgroundColor,
  startChangeHeight: state => state.app.navbar.startChangeHeight,
  endChangeHeight: state => state.app.navbar.endChangeHeight,
};

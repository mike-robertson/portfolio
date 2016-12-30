import * as particleType from 'fsg/particleType';
import * as fsgActions from 'actionTypes/fsg';

const initialState = {
  particleType: particleType.WALL,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case fsgActions.SET_PARTICLE_TYPE:
      return {
        ...state,
        particleType: action.payload,
      };
    default:
      return state;
  }
};

export const selectors = {
  particleType: state => state.app.fsg.particleType,
};

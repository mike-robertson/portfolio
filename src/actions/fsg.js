import * as fsgActions from 'actionTypes/fsg';

export const setParticleType = particleType => ({
  type: fsgActions.SET_PARTICLE_TYPE,
  payload: particleType,
});

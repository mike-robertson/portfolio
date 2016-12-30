import Particle from 'fsg/particle';
import * as particleType from 'fsg/particleType';

class Plant extends Particle {
  constructor(x, y) {
    super(x, y);
    this.type = particleType.PLANT;
    this.color = '#00FF00';
    this.flammable = true;
  }
}

export default Plant;

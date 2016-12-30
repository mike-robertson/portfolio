import Particle from 'fsg/particle';
import * as particleType from 'fsg/particleType';

class Wax extends Particle {
  constructor(x, y) {
    super(x, y);
    this.type = particleType.WAX;
    this.color = '#EAF5A4';
    this.flammable = true;
  }
}

export default Wax;

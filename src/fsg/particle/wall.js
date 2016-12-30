import Particle from 'fsg/particle';
import * as particleType from 'fsg/particleType';

class Wall extends Particle {
  constructor(x, y) {
    super(x, y);
    this.type = particleType.WALL;
    this.fireProof = true;
  }
}

export default Wall;

import { fsgGame } from 'fsg';
import Particle from 'fsg/particle';
import * as particleType from 'fsg/particleType';

class Sand extends Particle {
  constructor(x, y) {
    super(x, y);
    this.color = '#E5F57F';
    this.velocity = {
      x: 0,
      y: 1, // gravity
    };
    this.type = particleType.SAND;
    this.sinks = true;
  }

  move() {
    let didMove = super.move();
    if (!didMove) {
      if (Particle.liquidUnderneath(this.position.x + this.velocity.x, this.position.y + this.velocity.y)) {
        this.waterSwap(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
      } else {
        let left = false;
        let right = false;

        if (!fsgGame.checkParticle(this.position.x - 1, this.position.y + this.velocity.y)
            || Particle.liquidUnderneath(this.position.x - 1, this.position.y + this.velocity.y)) {
          left = true;
        }
        if (!fsgGame.checkParticle(this.position.x + 1, this.position.y + this.velocity.y)
            || Particle.liquidUnderneath(this.position.x + 1, this.position.y + this.velocity.y)) {
          right = true;
        }
        if (left && right) {
          if (Math.random() >= 0.5) {
            didMove = this.updatePositionFallingParticleLeft();
          } else {
            didMove = this.updatePositionFallingParticleRight();
          }
        } else if (left) {
          didMove = this.updatePositionFallingParticleLeft();
        } else if (right) {
          didMove = this.updatePositionFallingParticleRight();
        }
      }
    }
    return didMove;
  }
}

export default Sand;

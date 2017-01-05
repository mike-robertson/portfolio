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
        this.particleSwap(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
      } else {
        const particleLeft = fsgGame.getParticle(this.position.x - 1, this.position.y + this.velocity.y);
        if (!particleLeft || particleLeft.isLiquid()) {
          didMove = this.updatePositionFallingParticleLeft();
        } else {
          const particleRight = fsgGame.getParticle(this.position.x + 1, this.position.y + this.velocity.y);
          if (!particleRight || particleRight.isLiquid()) {
            didMove = this.updatePositionFallingParticleRight();
          }
        }
      }
    }
    return didMove;
  }
}

export default Sand;

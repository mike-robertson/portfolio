import { fsgGame } from 'fsg';
import Particle from 'fsg/particle';
import * as particleType from 'fsg/particleType';

class Water extends Particle {
  constructor(x, y) {
    super(x, y);
    this.color = '#4655FA';
    this.velocity = {
      y: 1,
      x: 0,
    }; // gravity
    this.type = particleType.WATER;
  }

  move() {
    let didMove = super.move();
    if (!didMove) {
      if (fsgGame.getParticle(this.position.x + this.velocity.x, this.position.y + this.velocity.y).type === particleType.STEAM) {
        this.particleSwap(this.position.x + this.velocity.x, this.position.y + this.velocity.y);
        didMove = true;
      } else {
        // plant needs to check for water, not the other way around
        let left = false;
        let right = false;
        const { x: posX, y: posY } = this.position;
        if (posX - 1 > 0 && !fsgGame.checkParticle(posX - 1, posY)) {
          left = true;
        }
        if (posX + 1 < fsgGame.canvas.width && !fsgGame.checkParticle(posX + 1, posY)) {
          right = true;
        }
        const tempX = this.nextAvailable(left, right, this.velocity.y);
        if (tempX !== this.position.x) {
          this.updateParticlePosition(tempX, this.afterMovementY());
          didMove = true;
        }
      }
    }
    return didMove;
  }
}

export default Water;

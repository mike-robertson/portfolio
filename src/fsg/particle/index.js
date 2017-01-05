import * as particleType from 'fsg/particleType';
import { fsgGame } from 'fsg';

// TODO - factor out the fsgGame from this component. It shouldn't be aware of the game, just itself.
class Particle {
  constructor(x, y) {
    this.position = { x, y };
    this.velocity = { x: 0, y: 0 };
    this.color = '#AAAAAA';
    this.type = particleType.NONE;
    this.flammable = false;
    this.onFire = false;
    this.fireProof = false;
    this.sinks = false;

    this.update = this.update.bind(this);
    this.afterMovementX = this.afterMovementX.bind(this);
    this.afterMovementY = this.afterMovementY.bind(this);
    this.isParticleInBounds = this.isParticleInBounds.bind(this);
    this.isLiquid = this.isLiquid.bind(this);
    this.move = this.move.bind(this);
    this.nextAvailable = this.nextAvailable.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.particleSwap = this.particleSwap.bind(this);
    this.allSurroundingParticles = this.allSurroundingParticles.bind(this);
  }

  get xPosition() {
    return this.position.x;
  }

  get yPosition() {
    return this.position.y;
  }

  update() {
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      return this.move();
    }
    return false;
  }

  afterMovementX() {
    return this.position.x + this.velocity.x;
  }

  afterMovementY() {
    return this.position.y + this.velocity.y;
  }

  isParticleInBounds() {
    const { x, y } = this.position;
    return !(x < 0 || x > fsgGame.canvas.width + 1 || y < 0 || y > fsgGame.canvas.height + 1);
  }

  move() {
    if (!fsgGame.checkParticle(this.afterMovementX(), this.afterMovementY())
        && (this.velocity.y || this.velocity.x)) {
      fsgGame.pixelArray.remove(this.position.x, this.position.y);
      this.position = {
        x: this.afterMovementX(),
        y: this.afterMovementY(),
      };

      if (this.isParticleInBounds()) {
        fsgGame.pixelArray.add(this);
      } else {
        fsgGame.pixelArray.remove(this);
      }
      return true;
    }
    return false;
  }

  nextAvailable(l, r, yChange) {
    let left = l;
    let right = r;
    let leftX = this.position.x;
    let rightX = this.position.x;
    const y = this.position.y;
    while (left || right) {
      if (left) {
        leftX -= 1;
        if (leftX > 0) {
          if (!fsgGame.checkParticle(leftX, y + yChange)) {
            for (let x = this.position.x - 1; x > leftX; x -= 1) {
              if (fsgGame.checkParticle(x, y)) {
                left = false;
              }
            }
            if (left) {
              return leftX;
            }
          }
          // else if(fsgGame.checkParticle(leftX, y)
        } else {
          left = false;
        }
      }
      if (right) {
        rightX += 1;
        if (rightX <= fsgGame.canvas.width) {
          if (!fsgGame.checkParticle(rightX, y + yChange)) {
            for (let n = this.position.x + 1; n < rightX; n += 1) {
              if (fsgGame.checkParticle(n, y)) {
                right = false;
              }
            }
            if (right) {
              return rightX;
            }
          }
        } else {
          right = false;
        }
      }
    }
    return this.position.x;
  }

  static liquidUnderneath(x, y) {
    if (fsgGame.pixelArray.exists(x, y) && fsgGame.pixelArray.get(x, y).isLiquid()) {
      return true;
    }
    return false;
  }

  isLiquid() {
    return this.type === particleType.WATER;
  }

  updatePosition(x, y) {
    this.position = { x, y };
  }

  particleSwap(x, y) {
    const liquidParticle = fsgGame.pixelArray.get(x, y);
    fsgGame.pixelArray.add(this.position.x, this.position.y, liquidParticle);
    fsgGame.pixelArray.add(x, y, this);

    const myOldPosition = this.position;
    this.updatePosition(liquidParticle.position.x, liquidParticle.position.y);
    liquidParticle.updatePosition(myOldPosition.x, myOldPosition.y);
  }

  updateParticlePosition(x, y) {
    if (!fsgGame.checkParticle(x, y)) {
      fsgGame.pixelArray.remove(this.position.x, this.position.y);
      this.updatePosition(x, y);
      fsgGame.pixelArray.add(x, y, this);
    }
  }

  updatePositionFallingParticleRight() {
    this.updatePositionFallingParticle(1);
  }

  updatePositionFallingParticleLeft() {
    this.updatePositionFallingParticle(-1);
  }

  updatePositionFallingParticle(xVel) {
    const { x, y } = this.position;
    const { y: yVel } = this.velocity;
    if (this.sinks && Particle.liquidUnderneath(x + xVel, y + yVel)) {
      this.particleSwap(x + xVel, y + yVel);
    } else {
      fsgGame.pixelArray.remove(x, y);
      this.updatePosition(x + xVel, y + yVel);

      if (this.isParticleInBounds()) {
        fsgGame.pixelArray.add(this);
      }
      return true;
    }
    return false;
  }

  allSurroundingParticles() {
    const surrounding = [];
    const { x: xPos, y: yPos } = this.position;

    for (let x = xPos - 1; x <= xPos + 1; x += 1) {
      for (let y = yPos - 1; y <= yPos + 1; y += 1) {
        if (fsgGame.checkParticle(x, y) && (xPos !== x || yPos !== y)) {
          surrounding.push(fsgGame.pixelArray.get(x, y));
        }
      }
    }
    return surrounding;
  }
}

export default Particle;

import { calculateRelativeXY } from 'utility';
import * as particleType from 'fsg/particleType';
import Wall from 'fsg/particle/wall';
import Sand from 'fsg/particle/sand';
import Water from 'fsg/particle/water';

const initializeCanvas = () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 700;
  canvas.height = 500;
  canvas.class = 'fsgContainer';
  return {
    context,
    canvas,
  };
};

class PixelArray {
  constructor({ width, height }) {
    this.pixels = Array.from(
      { length: width + 1 },
      () => Array.from({ length: height + 1 }),
    );
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.forEach = this.forEach.bind(this);
  }

  get(x, y) {
    return this.pixels[x][y];
  }

  add(x, y, particle) {
    // if we are just given a particle
    // should find a better way to do this.
    if (typeof x === 'object') {
      const { x: xPos, y: yPos } = x.position;
      this.pixels[xPos][yPos] = x;
    } else {
      this.pixels[x][y] = particle;
    }
  }

  remove(x, y) {
    // if we are just given a particle
    // should find a better way to do this.
    if (typeof x === 'object') {
      const { x: xPos, y: yPos } = x.position;
      this.pixels[xPos][yPos] = null;
    } else {
      this.pixels[x][y] = null;
    }
  }

  forEach(cb) {
    this.pixels.forEach(cb);
  }

  exists(x, y) {
    return this.pixels[x][y] !== null && this.pixels[x][y] !== undefined;
  }
}

class FSGGame {
  constructor(context, canvas, fsgControls, updateParticleCount = f => f) {
    this.context = context;
    this.canvas = canvas;
    this.fsgControls = fsgControls;
    this.updateParticleCount = updateParticleCount;
    this.particles = [];
    this.pixelArray = new PixelArray(canvas);
    this.mouseCoords = { x: null, y: null };
    this.timer = 0;

    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.executeGameLoop = this.executeGameLoop.bind(this);
    this.captureMouseCoords = this.captureMouseCoords.bind(this);
    this.createParticle = this.createParticle.bind(this);
    this.createParticles = this.createParticles.bind(this);
    this.checkParticle = this.checkParticle.bind(this);
    this.isMouseInBounds = this.isMouseInBounds.bind(this);
    this.drawParticle = this.drawParticle.bind(this);
    this.updateParticle = this.updateParticle.bind(this);

    this.mouseMoveEvent = canvas.addEventListener('mousemove', this.captureMouseCoords, false);
    this.mouseDownEvent = canvas.addEventListener('mousedown', this.captureMouseCoords);

    this.clearCanvas();
  }

  executeGameLoop() {
    this.update();
    this.render();
  }

  captureMouseCoords(event) {
    if (event.which === 1) {
      this.mouseCoords = calculateRelativeXY(event);
    } else {
      this.mouseCoords = { x: null, y: null };
    }
  }

  createParticle(x, y, newParticleType) {
    let newParticle = null;

    switch (newParticleType) {
      case particleType.SAND:
        newParticle = new Sand(x, y);
        break;
      case particleType.WALL:
        newParticle = new Wall(x, y);
        break;
      case particleType.WATER:
        newParticle = new Water(x, y);
        break;
      case particleType.ACID:
        newParticle = new Acid(x, y);
        break;
      case particleType.WAX:
        newParticle = new Wax(x, y);
        break;
      case particleType.FIRE:
        newParticle = new Fire(x, y);
        break;
      case particleType.PLANT:
        newParticle = new Plant(x, y);
        break;
      default:
        newParticle = new Wall(x, y);
        break;
    }
    this.particles.push(newParticle);
    this.pixelArray.add(x, y, newParticle);
  }

  createParticles(x, y, particleType, brushSize, isBlockParticle) {
    for (let xPos = 0 - brushSize; xPos < 0; xPos += 1) {
      for (let yPos = 0 - brushSize; yPos < 0; yPos += 1) {
        const currentX = x + xPos;
        const currentY = y + yPos;

        // We want a random 'spray paint' effect, unless it is a particle type
        // which should be solid.
        if (!this.pixelArray.exists(currentX, currentY)
            && (Math.random() > 0.333 || isBlockParticle)) {
          this.createParticle(currentX, currentY, particleType);
        }
      }
    }
  }

  updateParticle(particle, index) {
    // Update returns true if the particle moved or was destroyed.
    particle.update();
    if (!particle.isParticleInBounds()) {
      this.particles.splice(index, 1);
    }
  }

  checkParticle(x, y) {
    if ((x > 0 && x < this.canvas.width + 1 && y > 0 && y < this.canvas.height + 1)
        && this.pixelArray.exists(x, y)) {
      return true;
    }
    return false;
  }

  getParticle(x, y) {
    if ((x > 0 && x < this.canvas.width + 1 && y > 0 && y < this.canvas.height + 1)
        && this.pixelArray.exists(x, y)) {
      return this.pixelArray.get(x, y);
    }
    return null;
  }

  isMouseInBounds() {
    const brushSize = this.fsgControls.currentBrushSize;
    const { x, y } = this.mouseCoords;
    return x !== null && x - brushSize > 0 && x <= this.canvas.width
        && y !== null && y - brushSize > 0 && y <= this.canvas.height;
  }

  update() {
    if (this.isMouseInBounds()) {
      this.createParticles(
        this.mouseCoords.x,
        this.mouseCoords.y,
        this.fsgControls.currentParticleType,
        this.fsgControls.currentBrushSize,
        this.fsgControls.isBlockParticle(),
      );
    }
    this.particles.forEach(this.updateParticle);
    this.timer += 1;
  }

  clearCanvas() {
    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawParticle(particle) {
    this.context.fillStyle = particle.color;
    this.context.fillRect(particle.xPosition, particle.yPosition, 1, 1);
  }

  render() {
    this.clearCanvas();
    this.particles.forEach(this.drawParticle);
    this.fsgControls.updateParticleCount(this.particles.length);
  }
}

class FSGControls {
  constructor() {
    this.brushSize = 10;
    this.particleType = particleType.SAND;
    this.updateParticleCount = f => f;
    this.incBrushSize = this.incBrushSize.bind(this);
    this.decBrushSize = this.decBrushSize.bind(this);
    this.setBrushSize = this.setBrushSize.bind(this);
    this.setParticleType = this.setParticleType.bind(this);
    this.setUpdateParticleCount = this.setUpdateParticleCount.bind(this);
  }

  get udpateParticleCount() {
    return this.updateParticleCount;
  }

  setUpdateParticleCount(updateParticleCount) {
    this.updateParticleCount = updateParticleCount;
  }

  incBrushSize() {
    this.brushSize += 1;
  }

  decBrushSize() {
    this.brushSize -= 1;
  }

  setBrushSize(size = 10) {
    this.brushSize = size;
  }

  get currentBrushSize() {
    return this.brushSize;
  }

  get currentParticleType() {
    return this.particleType;
  }

  setParticleType(type = particleType.SAND) {
    this.particleType = type;
  }

  isBlockParticle() {
    return this.particleType === particleType.WALL;
  }
}

const fsgControls = new FSGControls();
const {
  context,
  canvas,
} = initializeCanvas();

export const fsgGame = new FSGGame(context, canvas, fsgControls);

const fsg = () => {
  // Object.freeze(fsgGame);

  return {
    fsgControls,
    attachCanvas: () => {
      const container = document.getElementById('fsgCanvasContainer');
      container.appendChild(canvas);
      setInterval(fsgGame.executeGameLoop, 30);
    },
  };
};

export default fsg;

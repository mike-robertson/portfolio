import React, { Component } from 'react';
import fsg from 'fsg';
import FSGControls from 'components/FallingSandGame/FSGControls';
import styles from './FallingSandGame.css';

class FallingSandGame extends Component {
  constructor() {
    super();
    const { attachCanvas, fsgControls } = fsg();
    this.attachCanvas = attachCanvas;
    this.state = {
      fsgControls,
    };
  }

  componentDidMount() {
    this.attachCanvas();
  }

  render() {
    return (
      <div>
        <div
          id="fsgCanvasContainer"
          className={styles.container}
        />
        <FSGControls controls={this.state.fsgControls} />
      </div>
    );
  }
}

export default FallingSandGame;

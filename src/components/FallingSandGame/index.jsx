import React, { Component, PropTypes } from 'react';
import fsg, { fsgGame } from 'fsg';
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
    const {
      canvasHeight: height,
      canvasWidth: width,
      fsgState,
    } = this.props;
    this.attachCanvas(fsgState, { height, width });
  }

  componentWillUpdate(nextProps) {
    const { canvasHeight, canvasWidth } = this.props;
    if (canvasHeight !== nextProps.canvasHeight
      || canvasWidth !== nextProps.canvasWidth
    ) {
      fsgGame.updateCanvas(nextProps.fsgState, {
        width: nextProps.canvasWidth,
        height: nextProps.canvasHeight,
      });
    }
  }

  render() {
    const { canvasWidth } = this.props;

    return (
      <div>
        <div
          id="fsgCanvasContainer"
          className={styles.container}
        />
        <FSGControls
          controls={this.state.fsgControls}
          canvasWidth={canvasWidth}
        />
      </div>
    );
  }
}

FallingSandGame.propTypes = {
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
  fsgState: PropTypes.array,
};

FallingSandGame.defaultProps = {
  canvasWidth: 700,
  canvasHeight: 500,
};

export default FallingSandGame;

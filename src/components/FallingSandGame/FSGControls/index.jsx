import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { exportFsgState } from 'fsg';
import * as particleType from 'fsg/particleType';
import { setParticleType } from 'actions/fsg';
import * as fsg from 'reducers/fsg';

import Button from 'components/Button';
import Text from 'components/Text';
import Select from 'components/Select';
import Icon from 'components/Icon';
import ParticleCount from './ParticleCount';
import styles from './FSGControls.css';

const particleTypes = Object.keys(particleType)
  .map(key => ({
    value: particleType[key],
    key: particleType[key],
  }));

class FSGControls extends Component {
  constructor(props) {
    super();
    this.state = {
      brushSize: props.controls.currentBrushSize,
    };

    this.incBrushSize = this.incBrushSize.bind(this);
    this.decBrushSize = this.decBrushSize.bind(this);
    this.setParticleType = this.setParticleType.bind(this);
    this.exportState = this.exportState.bind(this);
  }

  componentWillMount() {
    const { setParticleType, controls } = this.props;
    setParticleType(controls.currentParticleType);
  }

  setParticleType(key) {
    const { setParticleType, controls } = this.props;
    controls.setParticleType(key);
    setParticleType(key);
  }

  decBrushSize() {
    const { controls } = this.props;
    controls.decBrushSize();
    this.setState({
      brushSize: controls.currentBrushSize,
    });
  }

  incBrushSize() {
    const { controls } = this.props;
    controls.incBrushSize();
    this.setState({
      brushSize: controls.currentBrushSize,
    });
  }

  exportState() {
    const particles = exportFsgState();
    localStorage.setItem('fsgState', JSON.stringify(particles));
  }

  render() {
    const { brushSize } = this.state;
    const { particleType, canvasWidth, controls } = this.props;

    return (
      <div className={styles.container} style={{ width: canvasWidth }}>
        <div className={styles.verticalGroup}>
          <Text>Brush Size</Text>
          <div className={styles.brushSizeContainer}>
            <Icon onClick={this.decBrushSize} type="remove_circle_outline" />
            {brushSize}
            <Icon onClick={this.incBrushSize} type="add_circle_outline" />
          </div>
        </div>
        <div className={styles.verticalGroup}>
          <div>{particleType}</div>
          <Select
            options={particleTypes}
            setSelectedOption={this.setParticleType}
          />
          <ParticleCount setUpdateParticleCount={controls.setUpdateParticleCount} />
        </div>
        <div className={styles.group}>
          <Button onClick={this.exportState}>
            Export
          </Button>
        </div>
      </div>
    );
  }
}

FSGControls.propTypes = {
  controls: PropTypes.object.isRequired,
  canvasWidth: PropTypes.number,
};

const mapStateToProps = state => ({
  particleType: fsg.selectors.particleType(state),
});

export default connect(mapStateToProps, { setParticleType })(FSGControls);

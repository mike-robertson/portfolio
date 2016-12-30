import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import * as particleType from 'fsg/particleType';
import { setParticleType } from 'actions/fsg';
import * as fsg from 'reducers/fsg';

import Select from 'components/Select';
import Icon from 'components/Icon';
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
      particleCount: 0,
    };

    this.incBrushSize = this.incBrushSize.bind(this);
    this.decBrushSize = this.decBrushSize.bind(this);
    this.updateParticleCount = this.updateParticleCount.bind(this);
    this.setParticleType = this.setParticleType.bind(this);

    props.controls.setUpdateParticleCount(this.updateParticleCount);
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

  updateParticleCount(particleCount) {
    this.setState({
      particleCount,
    });
  }

  render() {
    const { brushSize, particleCount } = this.state;
    const { particleType } = this.props;

    return (
      <div className={styles.container}>
        <div>{particleType}</div>
        <div className={styles.brushSizeContainer}>
          <Icon onClick={this.decBrushSize} type="remove_circle_outline" />
          {brushSize}
          <Icon onClick={this.incBrushSize} type="add_circle_outline" />
        </div>
        <Select
          options={particleTypes}
          setSelectedOption={this.setParticleType}
        />
        particles: {particleCount}
      </div>
    );
  }
}

FSGControls.propTypes = {
  controls: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  particleType: fsg.selectors.particleType(state),
});

export default connect(mapStateToProps, { setParticleType })(FSGControls);

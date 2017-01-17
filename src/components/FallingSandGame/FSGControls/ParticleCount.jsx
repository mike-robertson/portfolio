import React, { Component, PropTypes } from 'react';
import { debounce } from 'utility';
import styles from './ParticleCount.css';

class ParticleCount extends Component {
  constructor() {
    super();
    this.state = {
      particleCount: 0,
    };

    this.updateParticleCount = this.updateParticleCount.bind(this);
  }

  componentDidMount() {
    const { setUpdateParticleCount } = this.props;
    setUpdateParticleCount(debounce(this.updateParticleCount, 500));
  }

  componentWillUnmount() {
    const { setUpdateParticleCount } = this.props;
    setUpdateParticleCount(f => f);
  }

  updateParticleCount(particleCount) {
    this.setState({
      particleCount,
    });
  }

  render() {
    const { particleCount } = this.state;

    return (
      <div className={styles.container}>
        # particles: {particleCount}
      </div>
    );
  }
}

ParticleCount.propTypes = {

};

export default ParticleCount;

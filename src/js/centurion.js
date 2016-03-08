import React from 'react';

const config = {
  running: false,
  limit: 2,
  time: 2,
  step: 0,
  interval: 1000,
};

class Centurion extends React.Component {
  /**
   * Create a new component.
   *
   * @param  {Object} props
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = config;

    this.start = this.start.bind(this);
  }

  /**
   * Start a new timer.
   *
   * @return {void}
   */
  start() {
    this.setState({ running: true });

    this.timer = setInterval(() => {
      this.setState({ time: this.state.time -= 1 });

      if (this.state.time === 0) {
        this.drink();
      }

    }, this.state.interval);
  }

  /**
   * Drink!
   *
   * @return {void}
   */
  drink() {
    this.setState({
      time: config.time,
      step: this.state.step += 1,
    });

    if (this.state.step === this.state.limit) {
      this.setState({ config });

      return clearInterval(this.timer);
    }
  }

  /**
   * Render the component.
   *
   * @return {JSX}
   */
  render() {
    let steps;

    if (this.state.step > 0) {
      steps = <p>{this.state.step}</p>;
    }

    return (
      <div>
        {steps}
        <p>{this.state.time}</p>
        <button disabled={this.state.running} onClick={this.start}>Go</button>
      </div>
    );
  }
}

export default Centurion;

var React = require('react');

var CenturionApp = React.createClass({
  getInitialState: function() {
    return {
      running: false,
      limit: 100,
      interval: 30,
      step: 0
    };
  },

  start: function() {
    this.setState({ running: true });
    this.timer = setInterval(function() {
      this.setState({ interval: this.state.interval -= 1 })
      if (this.state.interval === 0) {
        this.drink();
      }
    }.bind(this), 1000);
  },

  drink: function() {
    this.setState({
      interval: this.getInitialState().interval,
      step: this.state.step += 1
    });
    if (this.state.step === this.state.limit) {
      this.replaceState(this.getInitialState());
      return clearInterval(this.timer);
    }
  },

  render: function() {
    var steps;
    if (this.state.step > 0) {
      steps = <p>{this.state.step}</p>;
    }
    return (
      <div>
        {steps}
        <p>{this.state.interval}</p>
        <button disabled={this.state.running} onClick={this.start}>Go</button>
      </div>
    );
  }

});

React.render(<CenturionApp />, document.getElementById('app'));
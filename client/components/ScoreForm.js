import React, { Component } from 'react';
import { addPlayer } from '../store';
import { connect } from 'react-redux';

class ScoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.name);
  }
  async handleSubmit(e) {
    e.preventDefault();
    try {
      await this.props.addPlayer({
        name: this.state.name,
        score: this.props.score,
      });
      // this.props.setTopPlayers();
    } catch (error) {
      console.log('error submiting score form');
    }
    this.setState({
      name: '',
    });
  }
  render() {
    return (
      <div>
        <form className="score-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input-box"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="enter name"
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
const mapState = (state) => ({
  score: state.score,
});

const mapDispatch = (dispatch) => ({
  addPlayer: (player) => dispatch(addPlayer(player)),
});

export default connect(mapState, mapDispatch)(ScoreForm);

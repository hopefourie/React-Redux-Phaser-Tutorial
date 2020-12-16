import React from 'react';
import { addPlayer } from '../store';
import { connect } from 'react-redux';

class ScoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      buttonDisabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    try {
      await this.props.addPlayer({
        name: this.state.name,
        score: this.props.score,
      });
      this.setState({
        name: '',
        buttonDisabled: true,
      });
    } catch (error) {
      console.log('error submiting score form');
    }
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
          <button type="submit" disabled={this.state.buttonDisabled}>
            submit
          </button>
        </form>
      </div>
    );
  }
}
const mapState = (state) => ({
  score: state.score,
  gameOver: state.gameOver,
});

const mapDispatch = (dispatch) => ({
  addPlayer: (player) => dispatch(addPlayer(player)),
});

export default connect(mapState, mapDispatch)(ScoreForm);

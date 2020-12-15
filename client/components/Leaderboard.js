import React, { Component } from 'react';
import { fetchPlayers } from '../store';
import { connect } from 'react-redux';
import ScoreForm from './ScoreForm';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.findTopPlayers = this.findTopPlayers.bind(this);
  }
  componentDidMount() {
    this.props.fetchPlayers();
  }
  findTopPlayers(players) {
    for (let j = 0; j < players.length; j++) {
      for (let i = 0; i < players.length; i++) {
        let curr = players[i];
        let next = players[i + 1];
        if (next && curr.score < next.score) {
          let temp = players[i];
          players[i] = players[i + 1];
          players[i + 1] = temp;
        }
      }
    }
    return players.slice(0, 3);
  }
  render() {
    console.log('props', this.props);
    const { players } = this.props;
    const topPlayers = this.findTopPlayers(players);
    return (
      <div className="score-box">
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <div className="players-and-scores">
            <div className="top-players">
              {topPlayers.map((player) => {
                return (
                  <div key={player.id} className="top-player">
                    <p>{player.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="top-scores">
              {topPlayers.map((player) => {
                return (
                  <div key={player.id} className="top-score">
                    <p>{player.score}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="your-score">
          <ScoreForm setTopPlayers={this.setTopPlayers} />
          <h2>Your Score: {this.props.score}</h2>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  players: state.players,
  score: state.score,
});

const mapDispatch = (dispatch) => ({
  fetchPlayers: () => dispatch(fetchPlayers()),
});

export default connect(mapState, mapDispatch)(Leaderboard);

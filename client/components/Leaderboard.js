import React, { Component } from 'react';
import { fetchPlayers } from '../store';
import { connect } from 'react-redux';

class Leaderboard extends Component {
  componentDidMount() {
    this.props.fetchPlayers();
  }
  render() {
    const { players } = this.props;
    console.log('PLAYERS', players);
    const scores = players.map((player) => player.score);
    console.log('SCORES', scores);
    const topScores = scores.sort().slice(0, 3);
    console.log('TopSCORES', topScores);
    const topPlayers = players.reduce((accum, el) => {
      if (topScores.includes(el.score)) {
        accum.push(el);
      }
      return accum;
    }, []);
    console.log('topPlayers', topPlayers);
    return (
      <div className="score-box">
        <div className="your-score">
          <h2>Your Score:</h2>
          <h3>{this.props.score}</h3>
        </div>
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <div className="top-players">
            {topPlayers.map((player) => {
              return (
                <div key={player.id} className="top-player">
                  <p>
                    {player.name}: {player.score} pnts
                  </p>
                </div>
              );
            })}
          </div>
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

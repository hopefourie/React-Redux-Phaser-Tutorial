import '../public/style.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider, connect } from 'react-redux';
import Title from './components/Title';
import Game from './components/Game';
import Instructions from './components/Instructions';
import Leaderboard from './components/Leaderboard';
import { updateScore } from './store';

class App extends Component {
  render() {
    return (
      <div>
        <Title />
        <div className="content">
          <Instructions />
          <Leaderboard />
        </div>
        <div className="game-container">
          <Game />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

export default App;

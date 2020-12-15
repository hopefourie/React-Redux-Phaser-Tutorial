import '../public/style.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

class App extends Component {
  render() {
    return (
      <div>
        <div className="content">
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

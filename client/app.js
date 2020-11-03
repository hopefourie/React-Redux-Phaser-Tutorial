import '../public/style.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return <div>my app component!</div>;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

export default App;

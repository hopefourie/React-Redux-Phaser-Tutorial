import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';

const initState = { players: [], score: 0 };

//ACTION TYPES
const GET_PLAYERS = 'GET_PLAYERS';
const ADD_PLAYER = 'ADD_PLAYER';

//ACTION CREATORS
const receivedPlayers = (players) => ({
  type: GET_PLAYERS,
  players,
});

const playerAdded = (player) => ({
  type: ADD_PLAYER,
  player,
});

//THUNKS
export const fetchPlayers = () => {
  return async (dispatch) => {
    try {
      const { data: players } = await axios.get('/api/players');
      dispatch(receivedPlayers(players));
    } catch (error) {
      console.error('Error fetching players');
    }
  };
};

export const addPlayer = () => {
  return async (dispatch) => {
    try {
      const { data: player } = await axios.post('/api/players');
      dispatch(receivedPlayers(player));
    } catch (error) {
      console.error('Error fetching players');
    }
  };
};

//REDUCER
const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return { ...state, players: action.players };
    case ADD_PLAYER:
      state.players.push(action.player);
      return state;
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;

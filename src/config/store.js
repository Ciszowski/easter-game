import {createStore, combineReducers} from 'redux';
import playerReducer from  './reducer.js'
import mapReducer from './mapReducer.js';
import inventReducer  from './inventReducer';

const combine = combineReducers({
    player : playerReducer,
    map: mapReducer,
    item : inventReducer
})

const store = createStore(
    combine,
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store;

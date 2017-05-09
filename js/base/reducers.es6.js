const minidux = require('minidux');
const asyncReducers = {}

function addReducer (reducerName, reducerFn) {
    const actionType = getActionType(reducerName);

    // auto-generate our reducer functions here, add to `asyncReducers` object
    asyncReducers[reducerName] = (state, action) => {
        // this will happen during init phase:
        if (state === undefined) state = { change: null, properties: {}  }
        // this will happen during updates:
        if (action.type === actionType) {
            let change = null;
            if (action.change) change = action.change;
            return { change: change, properties: action.properties };
        } else {
            return state;
        }
    }
}

function combine () {
  return minidux.combineReducers(asyncReducers);
}

function getActionType (modelType) {
    return 'SET_' + modelType.toUpperCase();
}

// public api
module.exports = {
  asyncReducers: asyncReducers,
  add: addReducer,
  combine: combine,
  getActionType: getActionType,
}

import {isFSA} from 'flux-standard-action';
import * as types from '../constants/ActionTypes';
import * as storage from '../utils/storage';

export default ({dispatch, getState}) => next => action => {
    if (!isFSA(action)) {
        return next(action);
    }

    const {meta = {}, sequence = {}, error, payload} = action;
    const {sync} = meta;

    if (action.type === types.SYNC_REDUCER_TO_ASYNC_STORAGE) {
        let state = getState();
        try {
            storage.setItem(payload, state[payload]);
        } catch (err) {
            /* eslint-disable */
            console.warn(err);
        }
    }

    if (!sync || sequence.type === 'start' || error) {
        return next(action);
    }

    next(action);

    setTimeout(() => {
        dispatch({
            type: types.SYNC_REDUCER_TO_ASYNC_STORAGE,
            payload: sync,
        });
    }, 16);
};
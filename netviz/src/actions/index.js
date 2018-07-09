import NetworkApi from '../api/NetworkApi';
import CodeApi from '../api/CodeApi';

export const LOAD_NETWORK_SUCCESS = 'LOAD_NETWORK_SUCCESS';
export const SET_LAYERS_EXTREMES = 'SET_LAYERS_EXTREMES';
export const LOAD_CODE_SUCCESS = 'LOAD_CODE_SUCCESS';
export const UPDATE_CODE_SUCESS = 'UPDATE_CODE_SUCCESS'
export const MOVE_GROUP = 'MOVE_GROUP';
export const ZOOM_GROUP = 'ZOOM_GROUP';
export const TOGGLE_CODE = 'TOGGLE_CODE';
export const TOGGLE_PREFERENCES = 'TOGGLE_PREFERENCES';
export const TOGGLE_LEGEND = 'TOGGLE_LEGEND';
export const ADD_LAYER_SETTING = 'ADD_LAYER_SETTING';

export function moveGroup(group_displacement) {
  return {type: MOVE_GROUP, group_displacement};
}

export function zoomGroup(group_zoom) {
  return {type: ZOOM_GROUP, group_zoom};
}

export function toggleCode() {
  return {type: TOGGLE_CODE};
}

export function togglePreferences() {
  return {type: TOGGLE_PREFERENCES};
}

export function toggleLegend() {
  return {type: TOGGLE_LEGEND};
}

export function addSettingForLayer(setting, name) {
  return {type: ADD_LAYER_SETTING, setting, name};
}

export function setLayersExtremes(network) {
  return {type: SET_LAYERS_EXTREMES, network}
}

export function loadNetworkSuccess(network) {
  return {type: LOAD_NETWORK_SUCCESS, network};
}

export function loadNetwork() {
  return function(dispatch) {
    return NetworkApi.getNetwork().then(network => {
      dispatch(loadNetworkSuccess(network.data));
      dispatch(setLayersExtremes(network.data));
    }).catch(error => {
      throw(error);
    })
  };
}

export function loadCodeSuccess(code) {
  return {type: LOAD_CODE_SUCCESS, code};
}

export function loadCode() {
  return function(dispatch) {
    return CodeApi.getCode().then(code => {
      dispatch(loadCodeSuccess(code));
    }).catch(error => {
      throw(error);
    })
  };
}

export function updateCodeSuccess(code) {
  return {type: UPDATE_CODE_SUCESS, code}
}

export function updateCode(code) {
  return function(dispatch) {
    return CodeApi.updateCode(code).then(code => {
      dispatch(updateCodeSuccess(code));
    }).catch(error => {
      throw(error);
    });
  }
}

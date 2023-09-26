import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  /*
    Payload:
    -msg
    -alertType
    -id
    */
  switch (type) {
    case SET_ALERT:
      //Se regresa el resto de las alertas junto con la nueva
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload.id);
    default:
      return state;
  }
}

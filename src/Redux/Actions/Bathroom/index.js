import axios from "../../../axios.js";
import { UPDATE_BATHROOM } from "../../actionsTypes.js";

export const updateBathroom = (bathroom) => ({
  type: UPDATE_BATHROOM,
  payload: bathroom,
});

export const getBathroom = (usuarioId) => {
  return function (dispatch) {
    axios
      .get(`/bathroom`, { params: { usuarioId } })
      .then((response) => {
        const bathroom = response.data;
        dispatch(updateBathroom(bathroom));
      })
      .catch((error) => {
        console.error("Error al hacer GET a /bathroom:", error);
      });
  };
};

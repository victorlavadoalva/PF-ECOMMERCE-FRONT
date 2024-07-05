import axios from "../../../axios";
import { UPDATE_ATTENDANCE } from "../../actionsTypes.js";

export const updateAttendance = (attendance) => ({
  type: UPDATE_ATTENDANCE,
  payload: attendance,
});

export const getAttendance = (usuarioId) => {
  return function (dispatch) {
    axios
      .get(`/attendance`, { params: { usuarioId } })
      .then((response) => {
        const attendance = response.data;
        dispatch(updateAttendance(attendance));
      })
      .catch((error) => {
        console.error("Error al hacer GET a /attendance:", error);
      });
  };
};

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from "../../Redux/Actions/Attendance";
import axiosInstance from "../../axios";
import styles from "./Attendance.module.css";

export default function Attendance() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const attendance = useSelector((state) => state.attendance);

  const [isIngresoEnabled, setIsIngresoEnabled] = useState(true);
  const [isSalidaEnabled, setIsSalidaEnabled] = useState(false);

  const [horaIngreso, setHoraIngreso] = useState(null);
  const [horaSalida, setHoraSalida] = useState(null);

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    const todayAttendance = attendance.find((att) => att.fecha === currentDate);

    if (todayAttendance) {
      if (todayAttendance.horaSalida) {
        setIsIngresoEnabled(false);
        setIsSalidaEnabled(false);
        setHoraIngreso(todayAttendance.horaEntrada);
        setHoraSalida(todayAttendance.horaSalida);
      } else {
        setIsIngresoEnabled(false);
        setIsSalidaEnabled(true);
        setHoraIngreso(todayAttendance.horaEntrada);
        setHoraSalida(null);
      }
    } else {
      setIsIngresoEnabled(true);
      setIsSalidaEnabled(false);
      setHoraIngreso(null);
      setHoraSalida(null);
    }
  }, [attendance]);

  const handleIngreso = async () => {
    if (!user || !user._id) {
      console.error("Usuario no válido");
      return;
    }

    const usuarioId = user._id;
    const nombreUsuario = user.name;

    try {
      const response = await axiosInstance.post("/attendance/ingreso", {
        usuarioId,
        nombreUsuario,
      });
      console.log("Respuesta del servidor:", response.data);
      dispatch(getAttendance(usuarioId));
    } catch (error) {
      console.error("Error al hacer POST a /attendance/ingreso:", error);
    }
  };

  const handleSalida = async () => {
    if (!user || !user._id) {
      console.error("Usuario no válido");
      return;
    }

    const usuarioId = user._id;

    try {
      const response = await axiosInstance.post("/attendance/salida", {
        usuarioId,
      });
      console.log("Respuesta del servidor:", response.data);

      dispatch(getAttendance(usuarioId));
    } catch (error) {
      console.error("Error al hacer POST a /attendance/salida:", error);
    }
  };

  return (
    <div>
      <h1>Attendance</h1>
      {horaIngreso && <p>Hora de ingreso: {horaIngreso}</p>}
      {horaSalida && <p>Hora de salida: {horaSalida}</p>}
      <button
        onClick={handleIngreso}
        disabled={!isIngresoEnabled}
        className={isIngresoEnabled ? styles.enabled : styles.disabled}
      >
        Registrar Ingreso
      </button>
      <button
        onClick={handleSalida}
        disabled={!isSalidaEnabled}
        className={isSalidaEnabled ? styles.enabled : styles.disabled}
      >
        Registrar Salida
      </button>
    </div>
  );
}

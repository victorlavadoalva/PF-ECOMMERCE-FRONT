import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBathroom } from "../../Redux/Actions/Bathroom";
import axiosInstance from "../../axios";

export default function Bathroom() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const bathroom = useSelector((state) => state.bathroom);

  const [isIngresoEnabled, setIsIngresoEnabled] = useState(true);
  const [isSalidaEnabled, setIsSalidaEnabled] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, "0")}/${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
  };

  useEffect(() => {
    if (!user || !user._id) return;

    const currentDate = getCurrentDate();
    const todayBathroom = bathroom?.find((bath) => bath.fecha === currentDate);

    if (todayBathroom) {
      const lastRecord =
        todayBathroom.registros[todayBathroom.registros.length - 1];

      if (lastRecord.horaSalida) {
        setIsIngresoEnabled(true);
        setIsSalidaEnabled(false);
      } else {
        setIsIngresoEnabled(false);
        setIsSalidaEnabled(true);
      }
    } else {
      setIsIngresoEnabled(true);
      setIsSalidaEnabled(false);
    }
  }, [bathroom, user]);

  const handleIngreso = async () => {
    if (!user || !user._id) {
      console.error("Usuario no válido");
      return;
    }

    const usuarioId = user._id;

    try {
      const response = await axiosInstance.post("/bathroom/ingreso-bano", {
        usuarioId,
      });
      console.log("Respuesta del servidor:", response.data);
      setIsIngresoEnabled(false);
      setIsSalidaEnabled(true);
      dispatch(getBathroom(usuarioId));
    } catch (error) {
      console.error("Error al hacer POST a /bathroom/ingreso-bano:", error);
    }
  };

  const handleSalida = async () => {
    if (!user || !user._id) {
      console.error("Usuario no válido");
      return;
    }

    const usuarioId = user._id;

    try {
      const response = await axiosInstance.post("/bathroom/salida-bano", {
        usuarioId,
      });
      console.log("Respuesta del servidor:", response.data);
      setIsIngresoEnabled(true);
      setIsSalidaEnabled(false);
      dispatch(getBathroom(usuarioId));
    } catch (error) {
      console.error("Error al hacer POST a /bathroom/salida-bano:", error);
    }
  };

  return (
    <div>
      <h1>Bathroom</h1>
      <button onClick={handleIngreso} disabled={!isIngresoEnabled}>
        Registrar Baño
      </button>
      <button onClick={handleSalida} disabled={!isSalidaEnabled}>
        Terminar Baño
      </button>
    </div>
  );
}

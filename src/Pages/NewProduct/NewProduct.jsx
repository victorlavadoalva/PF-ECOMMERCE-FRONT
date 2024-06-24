import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./NewProduct.css";

import { createProduct } from "../../Redux/Actions";

export default function NewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = () => {
    toast("Game creation successful!", {
      icon: "🎮",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });
  };

  const notifyError = () => {
    toast.error("Please fill out all the fields.", {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  // const [pictures, setPictures] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !platform || !stock) {
      return notifyError();
    }

    //Aca el dispatch de create product
    console.log(stock, "stock");
    dispatch(
      createProduct(name, description, price, category, platform, stock)
    );

    setTimeout(() => {
      notify();
      navigate("/store");
    }, 1000);
  }

  return (
    <form className="containerForm" onSubmit={handleSubmit}>
      <h1>Create Product</h1>
      <hr />
      <div className="productName">
        <label>Name</label>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="productDescription">
        <label>Description</label>
        <textarea
          placeholder="Product description"
          style={{ height: "100px" }}
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="productInfoExtra">
        <div>
          <label>Price(USD)</label>
          <input
            type="number"
            placeholder="$"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Category</label>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option disabled selected>
              Select...
            </option>
            <option value="Estrategia por Turnos">Estrategia por turnos</option>
            <option value="Aventura">Aventura</option>
            <option value="Indie">Indie</option>
            <option value="Mundo Abierto">Mundo abierto</option>
            <option value="Accion">Acción</option>
            <option value="Juegos de ritmo">Juegos de ritmo</option>
            <option value="Carrera">Carrera</option>
            <option value="Deportes">Deportes</option>
          </select>
        </div>
        <div>
          <label>Platform</label>
          <select onChange={(e) => setPlatform(e.target.value)}>
            <option disabled selected>
              Select...
            </option>
            <option value="PlayStation">Play Station</option>
            <option value="Xbox Live">Xbox live</option>
            <option value="Steam">Steam</option>
            <option value="Epic Games">Epic Games</option>
            <option value="Battle.Net">Battle net</option>
            <option value="Origin">Origin</option>
            <option value="Ubisoft">Ubisoft</option>
          </select>
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            placeholder="#"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          //   disabled={isLoading || isSuccess}
        >
          Create Product
        </button>
      </div>
    </form>
  );
}

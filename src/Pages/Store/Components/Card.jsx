import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { addToCart } from "../../../Redux/Actions";
import style from "./Card.module.css";

const Card = ({ data }) => {
  // Data.
  const { _id } = data;
  const formattedPrice = data.price.toLocaleString();

  const dispatch = useDispatch();

  // States.
  const user = useSelector((state) => state.user);

  // Add to Cart Notification.
  const notify = () =>
    toast("Game added to cart!", {
      icon: "🎮",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });

  // Add to Cart Function.
  const handleAddToCart = (event) => {
    // Reset Event.
    event.preventDefault();

    // If User exist.
    if (user && user._id) {
      // Notify.
      notify();

      dispatch(
        addToCart({
          userId: user._id,
          productId: _id,
          price: data.price,
        })
      );
    }
  };

  return (
    <Link
      to={data.isActive ? `detail/${_id}` : ""}
      style={{ textDecoration: "none" }}
    >
      <div
        className={
          data.stock > 0 && data.isActive
            ? style.container
            : style.containerTrans
        }
        key={data.id}
      >
        <div className={style.info}>
          <div>
            <h2>{data.name}</h2>
            <h3 className={style.price}>${formattedPrice}</h3>
          </div>
          {user &&
          data.stock > 0 &&
          data.isActive &&
          user.isActive &&
          !user.isAdmin ? (
            <div>
              <button
                onClick={(event) => handleAddToCart(event)}
                className={style.addToCart}
              >
                Add
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={style.infoSecundaria}>
          <article>
            <p>Category: </p>
            <p>{data.category}</p>
          </article>
          <hr />
          <article className={data.stock > 0 ? style.stock : style.stockCero}>
            <p>Stock: </p>
            <p>{data.stock}</p>
          </article>
        </div>
      </div>
    </Link>
  );
};

export default Card;

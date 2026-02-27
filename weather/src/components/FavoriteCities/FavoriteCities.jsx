import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/slices/favoritesSlice";
import "./FavoriteCities.css";

export default function FavoriteCities({ onSelect }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  if (favorites.length === 0) return null;

  return (
    <div className="fav-wrapper">
      <h2 className="fav-title">Favorite Cities</h2>

      <div className="fav-list">
        {favorites.map((city) => (
          <div
            key={city}
            className="fav-item"
            onClick={() => onSelect(city)}
          >
            <span>{city}</span>

            <button
              className="fav-remove"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(toggleFavorite(city));
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

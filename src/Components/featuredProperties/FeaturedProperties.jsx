import { useFetch } from "../../hooks/useFetch"
import "./featuredProperties.css"

const FeaturedProperties = () => {
  const {data, loading} = useFetch('/hotels?featured=true&limit=2&min=10&max=10000')
  return (
    <div className="fp">
      {loading ? (
        "loading please wait"
      ) : (
        <>
          {data.map((item, index) => (
            <div className="fpItem" key={index}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from {item.cheapestPrice}</span>
                {item.rating && 
                <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
                </div>
                }
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default FeaturedProperties
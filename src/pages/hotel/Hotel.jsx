import Footer from "../../Components/footer/Footer"
import Header from "../../Components/header/Header"
import MailList from "../../Components/mailList/MailList"
import Navbar from "../../Components/navbar/Navbar"
import "./hotel.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react"
import {useLocation} from "react-router-dom"
import {useFetch} from "../../hooks/useFetch"
import { useContext } from "react"
import { SearchContext, SearchContextProvider } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import Reserve from "../../Components/reserve/Reserve"

const Hotel = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const {data, loading} = useFetch(`/hotels/find/${id}`);
    const {dates} = useContext(SearchContext)
    const {user} = useContext(AuthContext)

    console.log("dates==>",dates);
      const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    }

      const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
        newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    }
    const navigate = useNavigate();
    const handleClick = () => {
      if (user) {
        setOpenModal(true)
      } else {
        navigate("/login");
      }
    }
    return (
      <div>
        <Navbar />
        <Header type="list" />
        {loading ? (
          "loading"
        ) : (
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="close"
                  onClick={() => setOpen(false)}
                />
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="arrow"
                  onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper">
                  <img
                    src={data.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="arrow"
                  onClick={() => handleMove("r")}
                />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Elton St 125 New york</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.distance} from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over {data.cheapestPrice} at this property and get a free airport
                taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=""
                      className="hotelImg"
                    />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.Title}</h1>
                  <p className="hotelDesc">{data.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a 9-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>$945</b> (9 nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div>
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
      </div>
    );
}

export default Hotel
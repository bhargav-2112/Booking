import React from 'react'
import Navbar from '../../Components/navbar/Navbar'
import Header from '../../Components/header/Header'
import {useLocation} from 'react-router-dom'
import './list.css'
import { useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../Components/searchItem/SearchItem.jsx'
import {useFetch} from '../../hooks/useFetch'

const List = () => {
  const location = useLocation();
  console.log("location",location);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const {data, loading, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0 }&max=${max || 10000}`);
  
  const handleClick = () => {
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                placeholder={destination}
                name="search"
                id="search"
              />
            </div>
            <div className="lsItem">
              <label htmlFor="check-in">Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label htmlFor="check-in">Options</label>
              <div className="lsOptionItem">
                <span className="lsItemText">
                  Min price <small> per night </small>
                </span>
                <input
                  onChange={(e) => setMin(e.target.value)}
                  type="number"
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">
                  Max price <small> per night </small>
                </span>
                <input
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">Adult</span>
                <input
                  type="number"
                  min={1}
                  placeholder={options.adult}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">Children</span>
                <input
                  type="number"
                  min={0}
                  placeholder={options.children}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">Room</span>
                <input
                  type="number"
                  min={1}
                  placeholder={options.room}
                  className="lsOptionInput"
                />
              </div>
            </div>
            <button onClick={handleClick} className="listSearch">
              Search
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading.."
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem key={item._id} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List
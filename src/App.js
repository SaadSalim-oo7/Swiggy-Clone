import React, { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
import Home from "./Home";
import Header from "./Components/Header";
import RestaurantMenu from "./Components/RestaurantMenu";
import SearchRestaurant from "./Components/SearchRestaurant";
import {BrowserRouter, Routes,Route } from "react-router-dom";
import SearchDishes from "./Components/SearchDishes";



function App() {
  let [popularRestaurants, setPopularRestaurants] = useState([]);
  let [locationName, setLocationName] = useState("");
  let [locations, setLocations] = useState([]);
  // let [searchedRestaurants, setSearchedRestaurants] = useState([]);
  // let [userSearch, setUserSearch] = useState("");
  let [coordinates, setCoordinates] = useState({ lat : 17.37240, lng : 78.43780 });



  useEffect(() => {
    axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      .then((res) => {
        setPopularRestaurants(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
        console.log(res.data)
      })
  }, [coordinates]);

  useEffect(() => {
    axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationName}&types=`)
    .then((res) => {
      if(res.data.data) {
        setLocations(res.data.data)
      }
    })
  }, [locationName])

  // useEffect(() => {
  //   axios.get(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=17.4400802&lng=78.3489168&str=${userSearch}&trackingId=undefined&includeIMItem=true`)
  //   .then((res) => {
  //     setSearchedRestaurants(res?.data?.data)
  //   })
  // }, [userSearch])

 

  return (
    <>
     <BrowserRouter>
     <Header/> 
      <Routes>
        <Route path="/" element= {<Home setLocationName= {setLocationName}
         popularRestaurants = {popularRestaurants} locations = {locations}
         locationName = {locationName} setCoordinates = {setCoordinates}
        />}
        />
        <Route path="/restaurantMenu/:restName/:restId" element = {<RestaurantMenu/>}/>
        <Route path="/searchRestaurants" element = {<SearchRestaurant/>}/>
        <Route path="/searchDishes" element = {<SearchDishes/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;


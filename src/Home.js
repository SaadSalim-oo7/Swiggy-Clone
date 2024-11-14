import React from 'react';
import axios from 'axios';
import LocationSection from './Components/LocationSection';
import PopularRestaurant from './Components/PopularRestaurant';

function Home({setLocationName, popularRestaurants, locations, locationName, setCoordinates}) {

  const getCoordinates = (placeId) => {
        axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`)
        .then((res) => {
          setCoordinates(res?.data?.data[0]?.geometry?.location)
        })
  }

  return (
    <div>
    <div className="row">

       <LocationSection
        setLocationName = {setLocationName}
        locations = {locations} locationName = {locationName} getCoordinates={getCoordinates}
       />
       <PopularRestaurant
        popularRestaurants = {popularRestaurants}
       />

      
       
    </div>

    
</div>

  )
}

export default Home
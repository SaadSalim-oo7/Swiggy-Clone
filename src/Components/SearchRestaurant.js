import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchRestaurant() {

  let [restaurantName, setRestaurantName] =  useState("");
  let [moreRestaurants, setMoreRestaurants] = useState([]);
  let [exactRestaurant, setExactRestaurant] = useState(null);

  useEffect(() => {
    axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4400802&lng=78.3489168&str=${restaurantName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=882cb323-c0d4-bf8a-7cfd-628f96145b82&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A155080%2C%22primaryRestaurantId%22%3A783084%2C%22cloudinaryId%22%3A%22eb35e0ccd0a2f3b4efa088f2238ee6c0%22%2C%22brandId%22%3A155080%2C%22dishFamilyId%22%3A%22846718%22%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D`)
    .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT) {
            if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT.cards.length == 2){
                setExactRestaurant(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[0]?.card?.card?.info)
                setMoreRestaurants(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants)
            } else {
                setExactRestaurant(null)
                setMoreRestaurants(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)
            }
        }
    })
  }, [restaurantName])

  return (
    <>
     <div style={{textAlign : "center"}}>
        <h1>Search Your Favourite Restaurant</h1>
        <input
         value={restaurantName}
         onChange={(e) => {
            setRestaurantName(e.target.value)
         }}
         placeholder='Search Restaurant' style={{borderRadius : "10px"}}
        />
     </div>
      <div className='container mt-2'>
        { exactRestaurant != null ? 
        <> <h3>Your Search</h3>
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mt-1 border-0">
            <Link to={`/restaurantMenu/${exactRestaurant?.name}/${exactRestaurant?.id}`}>
      <div className="cols">
    <div class="card h-100 border-0">
      <img style={{borderRadius : "15px"}}
      className='restaurant-thumbnail'
      src= {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${exactRestaurant.cloudinaryImageId}`}  alt="..."/>
      <div className="card-body">
        <h5 class="card-title">{exactRestaurant?.name}</h5>
        <p class="card-text m-0"><i class={`bi bi-star-fill ${exactRestaurant?.avgRating >= 4.5 ? "top-rated-restaurant" : exactRestaurant?.avgRating < 4 ? "poor-rated-restaurant" : "avg-rated-restaurant" }`}></i> {exactRestaurant?.avgRating ? exactRestaurant?.avgRating : exactRestaurant?.avgRating?.avgRatingString }</p>
        <p class= "m-0">{exactRestaurant?.sla.slaString}</p>
        <p class= "m-0">{exactRestaurant?.cuisines.slice(0,3).join(",")}</p>
        <p class= "m-0">{exactRestaurant?.areaName}</p>
      </div>
    </div>
  </div>
    </Link>
    </div> </> : "" }
      </div>
     <div className="container mt-4">
      { moreRestaurants.length > 0 ? <h3>Suggested Restaurant</h3> : "" }
  <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mt-2 border-0">
   { exactRestaurant == null ? moreRestaurants.map((item, i) => {
    return <Link to={`/restaurantMenu/${item?.card?.card?.info?.name}/${item?.card?.card?.info?.id}`}>
      <div className="cols">
    <div class="card h-100 border-0">
      <img style={{borderRadius : "15px"}}
      className='restaurant-thumbnail'
      src= {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.card?.info?.cloudinaryImageId}`}  alt="..."/>
      <div className="card-body">
        <h5 class="card-title">{item?.card?.card?.info?.name}</h5>
        <p class="card-text m-0"><i class={`bi bi-star-fill ${item?.card?.card?.info?.avgRating >= 4.5 ? "top-rated-restaurant" : item?.card?.card?.info?.avgRating < 4 ? "poor-rated-restaurant" : "avg-rated-restaurant" }`}></i> {item?.card?.card?.info?.avgRating ? item?.card?.card?.info?.avgRating : item?.card?.card?.info?.avgRating?.avgRatingString }</p>
        <p class= "m-0">{item?.card?.card?.info?.sla?.slaString}</p>
        <p class= "m-0">{item?.card?.card?.info?.cuisines?.slice(0,3).join(",")}</p>
        <p class= "m-0">{item?.card?.card?.info?.areaName}</p>
      </div>
    </div>
  </div>
    </Link>
   }) : moreRestaurants.map((item, i) => {
    return <Link to={`/restaurantMenu/${item.info.name}/${item.info.id}`}>
      <div className="cols">
    <div class="card h-100 border-0">
      <img style={{borderRadius : "15px"}}
      className='restaurant-thumbnail'
      src= {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}  alt="..."/>
      <div className="card-body">
        <h5 class="card-title">{item.info.name}</h5>
        <p class="card-text m-0"><i class={`bi bi-star-fill ${item?.info?.avgRating >= 4.5 ? "top-rated-restaurant" : item.info.avgRating < 4 ? "poor-rated-restaurant" : "avg-rated-restaurant" }`}></i> {item?.info?.avgRating ? item?.info?.avgRating : item?.info?.avgRating?.avgRatingString }</p>
        <p class= "m-0">{item.info.sla.slaString}</p>
        <p class= "m-0">{item.info.cuisines.slice(0,3).join(",")}</p>
        <p class= "m-0">{item?.info?.areaName}</p>
      </div>
    </div>
  </div>
    </Link>
   }) }
</div>
</div>
    </>
  )
}

export default SearchRestaurant
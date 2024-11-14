import React from 'react';
import { Link } from 'react-router-dom';

function PopularRestaurant({popularRestaurants}) {
  return (
    <div className="col-10">
    <div style={{ textAlign: "center", marginTop : "30px"  }}>
    <h1>Popular Restaurants in Hyderabad</h1>
    <input className="search-bar"
    //   value={userSearch} 
    //  onChange={(e) => {
    //   setUserSearch(e.target.value)
    //  }}
    placeholder="Search Restaurants" />
  </div>
  <div className="container mt-4">
  <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4  border-0">
   {  popularRestaurants.map((item, i) => {
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
   })}
</div>
</div>
    </div>
  )
}

export default PopularRestaurant
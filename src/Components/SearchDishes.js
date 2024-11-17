import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchDishes() {

  let [dishName, setDishName] = useState("");
  let [dishes, setDishes] = useState([]);

  useEffect(() => {
    axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4400802&lng=78.3489168&str=${dishName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=d7b020f4-820a-a6e0-f087-16e8acd07f2c`)
    .then((res) => {
        if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH) {
            setDishes(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards.splice(1))
        }
    })
  }, [dishName])



  return (
    <>
    <div style={{textAlign : "center"}}>
        <h1>Search Your Favourite Dishes</h1>
        <input style={{borderRadius : "10px"}}
        value={dishName}
        onChange={(e) => {
            setDishName(e.target.value)
        }}
         placeholder="Search Dish Name"
        />
    </div>
     
    <div className="container mt-4">
      { dishes.map((item, i) => {
        return  <div class="card mb-3" style={{ width : "max", height : "250px"}}> 
        <div  style={{display : "flex", justifyContent : "space-between"}}>
            <h3>{item?.card?.card?.restaurant?.info?.name}</h3>
            <span> <Link to={`/restaurantMenu/${item?.card?.card?.restaurant?.info?.name}/${item?.card?.card?.restaurant?.info?.id}`}><button type="button" class="btn btn-info">View Restaurant Menu</button></Link> </span>
        </div>
        <div class="row">
        <div class="col-md-4">
        { item?.card?.card?.info?.imageId ? 
        <img
        style={{ height : "200px", width : "300px", borderRadius : "10px"}}
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300,c_fit/${item?.card?.card?.info?.imageId}`}  class="img-fluid rounded-start" alt="..."/>
        : <img
         src="https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_640.jpg" class="img-fluid rounded-start" alt="..."
        />   
        }
    </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title" style={{textAlign : "left"}}><b>{item?.card?.card?.info?.name}</b></h5>
        <p class="card-text m-0"><i class="bi bi-currency-rupee"></i><b>{ item?.card?.card?.info?.price ? item?.card?.card?.info?.price/100 : item?.card?.card?.info?.defaultPrice/100}</b></p>
        <p class="card-text m-0"><i class="bi bi-star-fill"></i> {item?.card?.card?.info?.ratings?.aggregatedRating?.rating}</p>
        <p>{item?.card?.card?.info?.description?.slice(0, 200)}</p>
        <div className='cont-bottom'>
        {item?.card?.card?.info?.isVeg ? <p style={{color: 'green'}}><b> Veg </b></p> : <p style={{color : 'red'}}><b> Non-Veg</b></p>}
        <span><button type="button" class="btn btn-success">ADD</button> </span>
     </div>
        
</div>
</div>
</div>
</div>
      })}
    </div>
</>

  )
}

export default SearchDishes;
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function RestaurantMenu() {

  let params = useParams()
  
  let [restaurantMenuData, setRestaurantMenuData] = useState([]);

  useEffect(() => {
    axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4400802&lng=78.3489168&restaurantId=${params.restId}&catalog_qa=undefined&submitAction=ENTER`)
    .then((res) => {
        setRestaurantMenuData(res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.splice(1))
        //console.log(res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
        
    })
  }, [])


  return (
    <div className='container mt-3'>
        <h2>{params.restName}'s Menu.. </h2>
        <div class="accordion mt-4" id="accordionPanelsStayOpenExample">
        { restaurantMenuData.map((item, i) => {
            if (item.card.card.itemCards) {
                console.log(item.card.card);
                
            return <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${i}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${i}`}>
               <b> {item.card.card.title} - {item.card.card.title.length}</b>
              </button>
            </h2>
            <div id={`panelsStayOpen-collapse${i}`} class="accordion-collapse collapse">
              <div class="accordion-body">
              { item.card.card.itemCards.map((item, i) => {
                return  <div class="card mb-3 border-0" style={{ width : "max", height : "210px"}}> 
                <div class="row">
                <div class="col-md-4">
                <img
                  style={{ height : "200px", width : "300px", borderRadius : "10px"}}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300,c_fit/${item?.card?.info?.imageId}`}  class="img-fluid rounded-start" alt="..."/>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title" style={{textAlign : "left"}}><b>{item?.card?.info?.name}</b></h5>
                <p class="card-text m-0"><i class="bi bi-currency-rupee"></i><b>{ item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100}</b></p>
                <p class="card-text m-0"><i class="bi bi-star-fill"></i> {item?.card?.info?.ratings?.aggregatedRating?.rating}</p>
                <p>{item?.card?.info?.description?.slice(0, 200)}</p>
                <div className='cont-bottom'>
                {item?.card?.info?.isVeg ? <p style={{color: 'green'}}><b> Veg </b></p> : <p style={{color : 'red'}}><b> Non-Veg</b></p>}
                <button type="button" class="btn btn-success">ADD</button>
                </div>
                
        </div>
      </div>
    </div>
    </div>
              })}
    </div>
             
            </div>
          </div>
            }
        }) }
  
</div>

    </div>
  )
}

export default RestaurantMenu;
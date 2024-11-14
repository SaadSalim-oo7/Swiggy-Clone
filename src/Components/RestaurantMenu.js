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
            return <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
               <b> {item.card.card.title} - {item.card.card.title.length}</b>
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
            }
        }) }
  
</div>

    </div>
  )
}

export default RestaurantMenu
import React from 'react'

function LocationSection({setLocationName, locationName, getCoordinates, locations}) {
  return (
    <div className="col-2 p-4">
         <h3>Locations..</h3>
         <input className="search-bar"
          placeholder="Search Location"
          onChange={(e) => {
            setLocationName(e.target.value)
         }}
          value={locationName}
         />
         { locationName !== "" ? <ol>
          {locations.map( (item, i) => {
            return <li onClick={() => {
                getCoordinates(`${item.place_id}`)
            }}>{item.description}</li>
          })}
         </ol> : ""}
       </div>
  )
}

export default LocationSection
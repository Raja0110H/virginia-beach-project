import React from 'react'
export default function SubsetInfo(props) {
  const { schoolName, district, close, capacity, address } = props

  return (
    <div id="main-body">
      <section id="subset-data">
        <header>
          <h2>{schoolName}</h2>
          <div></div>
          <button className="info-button" onClick={close}>
            X
          </button>
        </header>
        <ul id="list">
          <li
            data-extra-info="extra data for dataset would go here"
            className="card"
          >
            <h2>Capacity_1 : {capacity}</h2>
            <h2>Address</h2>
            <p>{address}</p>
            <h2>District</h2>
            <p>{district}</p>
          </li>
        </ul>
      </section>
    </div>
  )
}

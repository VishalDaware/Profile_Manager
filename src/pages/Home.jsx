import React, { useState } from "react";
import "./Home.css";

const Home = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleViewMore = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };
  

  return (
    <>
    <div className="home-intro">
      <img src={`${process.env.PUBLIC_URL}/assets/img/slider-m-1.png`} alt="img" className="head-img" />
      <div className="home-head">
      <h1>Explore Professionals</h1>
      <br />
      <h5>All Professionals are here..!</h5>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt voluptas ad dolores perferendis repudiandae voluptatem unde, illo ipsum. Consequuntur aliquam expedita cumque officiis aspernatur nisi explicabo aut iure velit odio!</p>
      <br />
      </div>
    </div>
    <div className="profile-heading">
       <h3>Explore Professional's Profile</h3>
    </div>
      <div className="home-container">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className="card">
              <div className="profile-image">
                <img src={card.imgSrc} alt={card.name} className="navbar-logo" />
              </div>
              <div className="profile-info">
                <h2>{card.name}</h2>
                <p>
                  {card.description.length > 100
                    ? card.description.slice(0, 50) + "..."
                    : card.description}
                </p>
                <button className="vm" onClick={() => handleViewMore(card)}>View More</button>
              </div>
            </div>
          ))
        ) : (
          <p>No profiles available</p>
        )}
      </div>

      {selectedCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            
            <div className="profile-image">
              <img src={selectedCard.imgSrc} alt={selectedCard.name} className="navbar-logo" />
            </div>

            <div className="profile-info">
              <h2>{selectedCard.name}</h2>
              <p>{selectedCard.description}</p>

              {selectedCard.location ? (
                <div className="map-container">
                  <iframe
                    title="Google Maps"
                    src={`https://www.google.com/maps?q=${selectedCard.location.lat},${selectedCard.location.lng}&z=15&output=embed`}
                    width="100%"
                    height="200px"
                    style={{ border: "none", borderRadius: "10px" }}
                  ></iframe>
                </div>
              ) : (
                <p>No location provided</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;


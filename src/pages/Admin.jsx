import React, { useState } from "react";
import "./Admin.css";

const Admin = ({ cards, setCards }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [editId, setEditId] = useState(null);

  const handleAddCard = () => {
    if (!name || !description) return;

    const newCard = {
      id: Date.now(),
      name,
      description,
      imgSrc: imgSrc || `${process.env.PUBLIC_URL}/assets/img/profile.jpg`,
      location: location.lat && location.lng ? location : null,
    };

    setCards([...cards, newCard]);
    resetForm();
  };

  const handleEditCard = (id) => {
    const cardToEdit = cards.find((card) => card.id === id);
    if (cardToEdit) {
      setName(cardToEdit.name);
      setDescription(cardToEdit.description);
      setImgSrc(cardToEdit.imgSrc);
      setLocation(cardToEdit.location || { lat: "", lng: "" });
      setEditId(id);
    }
  };

  const handleUpdateCard = () => {
    const updatedCards = cards.map((card) =>
      card.id === editId
        ? { ...card, name, description, imgSrc, location }
        : card
    );
    setCards(updatedCards);
    resetForm();
  };

  const handleRemoveCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setImgSrc("");
    setLocation({ lat: "", lng: "" });
    setEditId(null);
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Manage Profile's</h2>

      <div className="add-card-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={location.lat}
          onChange={(e) => setLocation({ ...location, lat: e.target.value })}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={location.lng}
          onChange={(e) => setLocation({ ...location, lng: e.target.value })}
        />

        <button onClick={editId ? handleUpdateCard : handleAddCard}>
          {editId ? "Update Card" : "Add Card"}
        </button>
      </div>

      <div className="card-list">
        <h3>Existing Cards:</h3>
        <table className="card-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length > 0 ? (
              cards.map((card) => (
                <tr key={card.id}>
                  <td>{card.id}</td>
                  <td>{card.name}</td>
                  <td className="description-cell">{card.description}</td>
                  <td>
                    {card.location
                      ? `Lat: ${card.location.lat}, Lng: ${card.location.lng}`
                      : "N/A"}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEditCard(card.id)}>Edit</button>
                      <button onClick={() => handleRemoveCard(card.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No cards available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;

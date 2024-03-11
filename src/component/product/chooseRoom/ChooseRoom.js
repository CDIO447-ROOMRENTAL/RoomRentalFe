import React, { useEffect, useState } from 'react';
import "./ChooseRoom.css"
import { useDispatch, useSelector } from 'react-redux';
import { getPublicRoomsRequest } from '../../../store/redux/product/ProductRequest';
import ImageSlide from '../../image/slide/ImageSlide';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

function ChooseRoom({ accommodationId}) {
  const dispatch = useDispatch();
  const [selectedRoom, setSelectedRoom] = useState(null); // State to store the selected room
  const navigate = useNavigate();


  const rooms = useSelector(state => state?.products?.productById?.rooms?.data);

  useEffect(() => {
    getPublicRoomsRequest(dispatch, accommodationId);
  }, [dispatch, accommodationId]);

  const groupedRooms = {};
  if (rooms) {
    rooms.forEach(room => {
      const { floor } = room;
      if (!groupedRooms[floor]) {
        groupedRooms[floor] = [];
      }
      groupedRooms[floor].push(room);
    });
  }

  // Function to handle room selection
  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
  };

  const handleContractClick = () => {
    navigate(`/contract/${selectedRoom?.id}`)
  };

  return (
    <div className='choose-room-container'>
      <div className='image-slide-container'>
        <ImageSlide images={selectedRoom ? selectedRoom.images : []} limit={3} />
      </div>
      <div className='room-container'>
        <p style={{ textAlign: "center" }}><b>Price: </b>{selectedRoom?.price}</p>
        {Object.keys(groupedRooms).map(floor => (
          <div key={floor} className="floor-container">
            <div className="rooms-on-floor" style={{ display: "flex" }}>
              {groupedRooms[floor].map(room => (
                <div key={room.id} className="room-item">
                  <label
                    className={`custom-radio-label ${selectedRoom && selectedRoom.id === room.id ? 'selected' : ''}`}
                    style={{ backgroundColor: selectedRoom && selectedRoom.id === room.id ? "grey" : "", color: selectedRoom && selectedRoom.id === room.id ? "white" : "" }}
                  >
                    F{room.floor}-R{room.numberRoom}
                    <input
                      type="radio"
                      className="custom-radio"
                      name="radio-button"
                      value={room.id}
                      onChange={() => handleRoomSelection(room)} 
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          className={`btn-button ${!selectedRoom && "disabled"}`}
          onClick={handleContractClick}
          disabled={!selectedRoom}
        >
          Contract
        </button>
      </div>
    </div>
  );
}

export default ChooseRoom;

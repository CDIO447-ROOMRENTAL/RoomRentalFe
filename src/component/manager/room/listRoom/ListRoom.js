import React, { useEffect, useState } from 'react';
import "./ListRoom.css";
import { Link } from 'react-router-dom';
import { getRoomsRequest } from '../../../../store/redux/product/ProductRequest';
import { useParams } from 'react-router-dom';
import Pagination from '../../../pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';

function ListRoom() {
  const { id: accommodationId } = useParams();
  const dispatch = useDispatch();
  const roomsData = useSelector((state) => state?.products?.productById?.rooms?.data);
  const user = useSelector((state) => state?.auth?.login?.user);
  const jwt = user?.accessToken;

  useEffect(() => {
    getRoomMethod();
  }, [dispatch]);

  const getRoomMethod = () => {
    getRoomsRequest(dispatch, jwt, accommodationId, pageable.search, pageable.number);
  };

  const [pageable, setPageable] = useState({
    number: 0,
    search: ""
  });

  const handlePageChange = (pageNumber) => {
    setPageable({
      ...pageable,
      number: pageNumber
    });
  };

  const handleSearchChange = (e) => {
    setPageable({
      ...pageable,
      search: e.target.value // Update the search value, not the page number
    });
  };

  return (
    <div className='list-product-container'>
      <span className='title'>List Room</span>
      <div className='search-product-container'>
        <input className='search-input' placeholder='Enter search' name='search' onChange={handleSearchChange} />
        <Link className='create-link' to={`/management/product/detail/${accommodationId}/room/create`}>Create</Link>
      </div>
      <div className='product-table-container'>
        <table className='product-table'>
          <thead>
            <tr>
              <th className='table-header'>#</th>
              <th className='table-header'>ID</th>
              <th className='table-header'>Number room</th>
              <th className='table-header'>Floor</th>
              <th className='table-header'>Price</th>
              <th className='table-header'>Description</th>
              <th className='table-header'>Images</th>
              <th className='table-header'>Action</th>
            </tr>
          </thead>
          <tbody>
            {roomsData?.content?.map((room, index) => (
              <tr key={room.id} className='table-row'>
                <td className='table-data'>{index + 1}</td>
                <td className='table-data'>{room.id}</td>
                <td className='table-data'>{room.numberRoom}</td>
                <td className='table-data'>{room.floor}</td>
                <td className='table-data'>{room.price}</td>
                <td className='table-data'>{room.description}</td>
                <td className='table-data image-cell'>
                  {room.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image.url}
                      alt={`Image ${imageIndex + 1}`}
                      className='room-image'
                    />
                  ))}
                </td>
                <td className='table-data'>
                  <Link to={`/management/product/detail/${accommodationId}/room/update/${room.id}`} className='detail-link'>Detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {roomsData?.content?.length !== 0 ? (
        <div className='pagination-container'>
          <Pagination totalPages={roomsData?.totalPages || 0} currentPage={roomsData?.number || 0} onPageChange={handlePageChange} className='pagination' />
        </div>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "600" }}>Rooms Not Found</p>
      )}
    </div>
  );
}

export default ListRoom;

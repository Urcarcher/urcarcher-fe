import React from 'react';
import 'assets/Map.css'; 

const Modal = ({
  search,
  openMarkerId,
  setOpenMarkerId,
  isModalOpen,
  moveLatLng,
  pagination,
  currentPage,
  setCurrentPage,
  closeModal, // closeModal 함수도 props로 받아서 사용합니다.
}) => {
  if (!isModalOpen || !openMarkerId) return null;

  const selectedPlace = search.find((place) => place.id === openMarkerId);

  return (
    <div className="modal-overlay">
      <div className="modal-contents">
        <h2>{selectedPlace?.place_name}</h2>
        <p>{selectedPlace?.address_name}</p>
        <p>{selectedPlace?.phone}</p>
        <a href={selectedPlace?.place_url} target="_blank" rel="noopener noreferrer">
          자세히 보기
        </a>
        <button onClick={closeModal}>Close</button>
        
        {/* 페이지네이션 추가 */}
        {/* {pagination && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              다음
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Modal;
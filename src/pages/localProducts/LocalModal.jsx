import React from 'react';
import 'pages/localProducts/LocalModal.css';
import { Link } from 'react-router-dom';
function LocalModal({ show, onClose, region, description, link, modalImgSrc }) {
    if (!show) {
        return null;
    }

    return (
        <div className="local-modal-overlay" onClick={onClose}>
        <div className="local-modal-content" onClick={(e) => e.stopPropagation()}>
            <p>
              <img src={modalImgSrc} alt={region} style={{ width: '120px', borderRadius: '10px', marginBottom: '15px' }} />
            </p>
            <h3>{region}</h3>
            <p>{description}</p>
            <Link to={link}>
                <button>구매하기</button>
            </Link>
            <button onClick={onClose} style={{backgroundColor:'#F77777', marginLeft:'10px'}}>닫기</button>
        </div>
    </div>
    );
}

export default LocalModal;
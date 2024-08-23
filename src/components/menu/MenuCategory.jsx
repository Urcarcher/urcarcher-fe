import { Link } from 'react-router-dom';

function MenuCategory({ title, items , onClose }) {

    return (
        <div className="menu-category-wrap">
            {/* title담은 p태그에 key값 없다고 오류나고 있음 */}
            <p>{title}</p>
            <ul className='menu-category-list'>
                {items.map((item, index) => (
                <Link to={item.link} onClick={onClose}>
                <li key={index}>
                    <div>
                        <p className='menu-name'>{item.text}</p>
                    </div>
                    <div>
                        <img src="/icon/gray-right-arrow.png" alt="화살표" />
                    </div>
                </li>
                </Link>
                ))}
            </ul>
        </div>
    );
}

export default MenuCategory;
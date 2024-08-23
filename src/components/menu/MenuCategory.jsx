import { Link } from 'react-router-dom';

function MenuCategory({ title, items , onClose }) {
    console.log(items);
    return (
        <div className="menu-category-wrap">
            {title.map((t, index) => (
                <p key={t.id}>{t.title}</p>
            ))}
            <ul className='menu-category-list'>
                {items.map((item, index) => (
                <Link to={item.link} onClick={onClose}>
                <li key={item.id}>
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
import { Link } from 'react-router-dom';

function Menu({ items }) {
    return (
      <ul className='flex justify-center items-center gap-3'>
        {items.map((item) => (
          <Link to={`/${item.toLowerCase()}`} key={item}>
            <li className='cursor-pointer border-slate-100 bg-slate-100 text-black border-2 rounded-lg p-2 m-2'>
              {item}
            </li>
          </Link>
        ))}
      </ul>
    );
}

export default Menu;
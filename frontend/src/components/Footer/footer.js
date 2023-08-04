import { GoHome , GoHomeFill} from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';
import { BiMessageSquareEdit } from 'react-icons/bi';
import classes from './footer.module.css';
import { useEffect, useState } from 'react';
import { NavLink ,useParams} from 'react-router-dom';

const urlState = {
    'home': false,
    'search': false,
    'profile': false,
    'addpost': false,
    'active': false
};
const Footer = () => {
    const [activePage, setActivePage] = useState(urlState);
    useEffect(() => {
        const path = window.location.pathname;
        console.log(path);

        if(path === '/'){
            setActivePage((prevState) => ({ ...prevState, home: true }));
        }else if(path.includes('/profile')){
            setActivePage((prevState) => ({ ...prevState, profile: true }));
        }
    },[]);

    return <div className={classes.footer}>
        <ul>
            <li>
                {activePage['home'] ? <GoHomeFill size={30}/> : <NavLink to={'/'} ><GoHome size={30}/></NavLink>}
            </li>
            <li>
                <a href="1"><FiSearch size={30}/></a>
            </li>
            <li>
                <a href="1"><BiMessageSquareEdit size={30}/></a>
            </li>
            <li>
                <a href="1"><AiOutlineHeart size={30}/></a>
            </li>
            <li>
                {activePage['profile'] ? <RiUser3Fill size={30}/> : <NavLink to={'/profile/userId'} ><RiUser3Line size={30}/></NavLink>}
            </li>
        </ul>
    </div>
}

export default Footer;
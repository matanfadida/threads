import { GoHome } from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiUser3Line } from 'react-icons/ri';
import { BiMessageSquareEdit } from 'react-icons/bi';
import classes from './footer.module.css';
import { useEffect, useState } from 'react';


const Footer = () => {
    const [activeHome, setActiveHome] = useState(false);
    // useEffect(() => {
    //     if()
    //     setActiveHome()
    // },[])
    return <div className={classes.footer}>
        <ul>
            <li>
                <a href="1"><GoHome size={30}/></a>
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
                <a href="1"><RiUser3Line size={30}/></a>
            </li>
        </ul>
    </div>
}

export default Footer;
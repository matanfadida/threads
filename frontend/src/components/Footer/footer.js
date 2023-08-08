import { GoHome , GoHomeFill} from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RiUser3Line, RiUser3Fill } from 'react-icons/ri';
import { BiMessageSquareEdit } from 'react-icons/bi';
import classes from './footer.module.css';

const Footer = (props) => {
    const SetChangeHandler = (page) => {
        props.ChangePageHandler(page);
    }
    console.log('p',props.activePage['home']);
    return <div className={classes.footer}>
        <ul>
            <li>
                {props.activePage['home'] ? <GoHomeFill size={30}/> : <GoHome color='rgb(102, 102, 102)' onClick={() => SetChangeHandler('home')} size={30}/>}
            </li>
            <li>
                {props.activePage['search'] ? <FiSearch size={30}/> : <FiSearch color='rgb(102, 102, 102)' onClick={() => SetChangeHandler('search')} size={30}/>}
            </li>
            <li>
                {props.activePage['addpost'] ? <BiMessageSquareEdit size={30}/> : <BiMessageSquareEdit color='rgb(102, 102, 102)' onClick={() => SetChangeHandler('addpost')} size={30}/>}
            </li>
            <li>
                {props.activePage['active'] ? <AiFillHeart size={30}/> : <AiOutlineHeart color='rgb(102, 102, 102)' onClick={() => SetChangeHandler('active')} size={30}/>}
            </li>
            <li>
                {props.activePage['profile'] ? <RiUser3Fill size={30}/> : <RiUser3Line color='rgb(102, 102, 102)' onClick={() => SetChangeHandler('profile')} size={30}/>}
            </li>
        </ul>
    </div>
}

export default Footer;
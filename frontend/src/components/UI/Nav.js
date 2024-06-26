
import { GoHome, GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { BiMessageSquareEdit } from "react-icons/bi";
import classes from "./Nav.module.css";
import { useContext } from "react";
import Context from "../context/context";

const Nav = (props) => {
  const ctx = useContext(Context);

    const SetChangeHandler = (page) => {
        console.log('sadasd',page);
        ctx.ChangePageHandler(page);
      };
      console.log("p", ctx.activePage["home"]);

    return <ul className={`${classes.nav} ${props.className}`}>
    <li>
      {ctx.activePage["home"] ? (
        <GoHomeFill size={30} />
      ) : (
        <GoHome
          color="rgb(102, 102, 102)"
          onClick={() => SetChangeHandler("home")}
          size={30}
        />
      )}
    </li>
    <li>
      {ctx.activePage["search"] ? (
        <FiSearch size={30} />
      ) : (
        <FiSearch
          color="rgb(102, 102, 102)"
          onClick={() => SetChangeHandler("search")}
          size={30}
        />
      )}
    </li>
    <li>
      {ctx.activePage["addpost"] && ctx.showAddPopup ? (
        <BiMessageSquareEdit size={30} onClick={() => SetChangeHandler("addpost")} />
      ) : (
        <BiMessageSquareEdit
          color="rgb(102, 102, 102)"
          onClick={() => SetChangeHandler("addpost")}
          size={30}
        />
      )}
    </li>
    <li>
      {ctx.activePage["activity"] ? (
        <AiFillHeart size={30} />
      ) : (
        <AiOutlineHeart
          color="rgb(102, 102, 102)"
          onClick={() => SetChangeHandler("activity")}
          size={30}
        />
      )}
    </li>
    <li>
      {ctx.activePage["profile"] ? (
        <RiUser3Fill size={30} />
      ) : (
        <RiUser3Line
          color="rgb(102, 102, 102)"
          onClick={() => SetChangeHandler("profile")}
          size={30}
        />
      )}
    </li>
  </ul>
}

export default Nav;
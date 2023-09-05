import { NavLink } from "react-router-dom";
import classes from "./activity.module.css";
import { AiFillHeart } from "react-icons/ai";
import { RiUser3Fill, RiShareForwardFill } from "react-icons/ri";
import Button from "../UI/button";
import { useEffect, useState } from "react";

const Activity = (props) => {
  const [icon, setIcon] = useState();
  useEffect(() => {
    if (props.action === "like") {
      setIcon(
        <div className={`${classes.action} ${classes["background-like"]}`}>
          <AiFillHeart
            size={10}
            style={{
              display: "flex",
            }}
          />
        </div>
      );
    } else if (props.action === "comment") {
      setIcon(
        <div className={`${classes.action} ${classes["background-like"]}`}>
          <RiShareForwardFill
            size={10}
            style={{
              display: "flex",
            }}
          />
        </div>
      );
    } else if (props.action === "follow") {
      setIcon(
        <div className={`${classes.action} ${classes["background-like"]}`}>
          <RiUser3Fill
            size={10}
            style={{
              display: "flex",
            }}
          />
        </div>
      );
    }
  }, []);

  return (
    <div>
      <li className={classes["li-padding"]}>
        <div>
          <NavLink to={`/profile/${props.userId}`}>
            <img
              className={classes.img}
              src={props.image}
              alt={props.userName}
            />
          </NavLink>
          {icon}
        </div>
        <div className={classes.details}>
          <div>
            <ul>
              <li>
                <NavLink
                  className={classes.userName}
                  to={`/profile/${props.userId}`}
                >
                  <strong className={classes.name}>{props.userName}</strong>
                </NavLink>
                <span className={classes.span}>23h</span>
              </li>
              <li>
                {props.postContent && <span className={classes.span}>{props.postContent}</span>}
              </li>
            </ul>
          </div>
          <div>
            <Button>Follow</Button>
          </div>
        </div>
      </li>
      <hr className={classes.hr} />
    </div>
  );
};

export default Activity;

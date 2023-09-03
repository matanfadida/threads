import { NavLink } from "react-router-dom";
import classes from "./activity.module.css";
import { AiFillHeart } from "react-icons/ai";
import Button from "../UI/button";

const Activity = (props) => {
  return (
    <div>
      <li className={classes["li-padding"]}>
          <div>
            <NavLink to={`/profile/${props.userId}`}>
              <img
                className={classes.img}
                src={
                  props.image
                }
                alt={"sads"}
              />
            </NavLink>
            <div className={classes.action}>
              <AiFillHeart
                size={10}
                style={{
                  display: "flex",
                }}
              />
            </div>
          </div>
          <div className={classes.details}>
            <div>
              <ul>
                <li>
                  <NavLink className={classes.userName} to={`/profile/${props.userId}`}><strong className={classes.name}>{props.userName}</strong></NavLink>
                  <span className={classes.span}>23h</span>
                </li>
                <li>
                  <span className={classes.span}>Followed you</span>
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

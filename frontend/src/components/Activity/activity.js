import { NavLink } from "react-router-dom";
import classes from "./activity.module.css";
import { AiFillHeart } from "react-icons/ai";
import Button from "../UI/button";

const Activity = (props) => {
  return (
    <div>
      <li className={classes["li-padding"]}>
          <div>
            <NavLink to={`profile/`}>
              <img
                className={classes.img}
                src={
                  "http://localhost:5000/images/4521ccee-b72c-40e6-9bb5-66d30b3d3d12jurica-koletic-7YVZYZeITc8-unsplash.jpg"
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
                  <strong className={classes.name}>matantest</strong>
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

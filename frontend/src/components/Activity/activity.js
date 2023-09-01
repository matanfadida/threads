import { NavLink } from "react-router-dom";
import classes from "./activity.module.css";
import { AiFillHeart } from "react-icons/ai";

const Activity = () => {
  return (
    <div>
      <ul>
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
                <AiFillHeart size={10}style={{
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}/>
            </div>
          </div>
          <div className={classes.details}>
            <div>
              <ul>
                <li>
                  <strong className={classes.name}>matantest</strong>
                  <span className="span">23h</span>
                </li>
                <li>
                  <span className="span">followd</span>
                </li>
              </ul>
            </div>
            <div>
              <button>Follow</button>
            </div>
          </div>
        </li>
        <hr className={classes.hr} />
      </ul>
    </div>
  );
};

export default Activity;

import { createPortal } from "react-dom";
import classes from "./Popup.module.css";

const Popup = (props) => {

    const Close = () => {
       props.onClick();
    }

    return createPortal(<div className={`${classes["popup-main"]} ${props.show ? classes.open : classes.close}`}>
    <div>
      <ul className={classes["ul-header"]}>
        <li>
          <button onClick={Close}>Cancel</button>
          <h4>{props.title}</h4>
        </li>
      </ul>
    </div>
    <hr />
    <div>
        {props.children}
    </div>
    </div>,
    document.getElementById('popup')
    )
}

export default Popup;
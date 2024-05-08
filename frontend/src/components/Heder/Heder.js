import classes from "./Heder.module.css";
import Nav from "../UI/Nav";

const Heder = (props) => {
  return (
    <div className={`${classes.heder}`}>
      <span>תמונה</span>
      <Nav className={classes.nav_none}/>
      <span>עריכה</span>
    </div>
  );
};

export default Heder;

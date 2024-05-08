import Nav from "../UI/Nav";
import classes from "./footer.module.css";

const Footer = (props) => {

 
  return (
    <div className={`${classes.footer}`}>
      <Nav/>
    </div>
  );
};

export default Footer;

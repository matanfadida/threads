import { useContext } from "react";
import classes from "./error-popup.module.css";
import Context from "../context/context";

const ErrorPopup = (props) => {
  const ctx = useContext(Context);

  const ErrorConfimHandler = () => {
    if (ctx.error.status === "Authorization Error") {
        ctx.ChangePageHandler("signin");
        ctx.setErrorHandler(undefined);
    }
  };

  return (
    <div className={classes.background}>
      <div className={classes.popup}>
        <h3 className={classes.title}>{ctx.error.status}</h3>
        <hr />
        <div className={classes.message}>{ctx.error.message}</div>
        <hr />
        <div className={classes.footer}>
          <button className={classes["button-ok"]} onClick={ErrorConfimHandler}>
            ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;

import { useContext, useRef } from "react";
import Context from "../context/context";
import classes from "./sign-in.module.css";

const SignIn = (props) => {
  const ctx = useContext(Context);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const SendRequestSignIn = async (e) => {
    e.preventDefault();
    const enterdEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;

    try {
      const res = await fetch("http://localhost:5000/api/user/signin", {
        method: "post",
        body: JSON.stringify({
          email: enterdEmail,
          password: enterdPassword,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const error = await res.json();
        throw error;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      ctx.setTokenHandler(data.token);
      ctx.ChangePageHandler("home");
    } catch (error) {
      console.log("error message: ", error.message);
    }
  };

  const MoveToSignUpHandler = () => {
    ctx.ChangePageHandler("signup");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.background}></div>
      <form onSubmit={SendRequestSignIn} className={classes.form}>
        <h1 className={classes.title}>Sign In</h1>
        <div>
          <input className={classes.input} type="email" placeholder="email" ref={emailInputRef} />
        </div>
        <div>
          <input className={classes.input} type="password" placeholder="*********" ref={passwordInputRef} />
        </div>
        <div className={classes.div_button}>
          <button className={classes.button} onClick={MoveToSignUpHandler}>Register</button>
          <button className={classes.button} onClick={MoveToSignUpHandler}>Forget Password</button>
        </div>
        <div>
          <button className={classes.button_login}>Login</button>
        </div>
      </form>
    </div>
  );
};


export default SignIn;

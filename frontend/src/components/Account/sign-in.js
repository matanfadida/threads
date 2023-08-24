import { useContext, useRef } from "react";
import Context from "../context/context";

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
    <form onSubmit={SendRequestSignIn}>
      <div>
        <input type="email" placeholder='דוא"ל' ref={emailInputRef} />
      </div>
      <div>
        <input type="password" placeholder="*********" ref={passwordInputRef} />
      </div>
      <div>
        <button>היכנס</button>
        <button onClick={MoveToSignUpHandler}>הירשם</button>
      </div>
    </form>
  );
};

export default SignIn;

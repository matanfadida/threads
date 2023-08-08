import { useRef } from "react";

const isEmpty = val => {val.trim() === ""}

const SignUp = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();
    const userNameInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const imageInputRef = useRef();


    const SendRequestSignUp = (e) => {
        e.preventDefault();
    }

    return <form onSubmit={SendRequestSignUp}>
        <div>
            <input type="email" placeholder='דוא"ל' ref={emailInputRef}/>
        </div>
        <div>
            <input type="password" placeholder='*********' ref={passwordInputRef}/>
        </div>
        <div>
            <input type="password" placeholder='*********' ref={passwordConfirmInputRef}/>
        </div>
        <div>
            <input type="text" ref={userNameInputRef}/>
        </div>
        <div>
            <input type="text" ref={firstNameInputRef}/>
        </div>
        <div>
            <input type="text" ref={lastNameInputRef}/>
        </div>
        <div>
            <input type="text" ref={imageInputRef}/>
        </div>
        <div>
            <button type="submit">הירשם</button>
        </div>
    </form>
}

export default SignUp;

import { useRef } from "react";

// const isEmpty = val => {val.trim() === ""};

const SignUp = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordConfirmInputRef = useRef();
    const userNameInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const imageInputRef = useRef();


    const SendRequestSignUp = async(e) => {
        e.preventDefault();
        const enterdEmail = emailInputRef.current.value;
        const enterdPassword = passwordInputRef.current.value;
        const enterdPasswordConfirm = passwordConfirmInputRef.current.value;
        const enterdUserName = userNameInputRef.current.value;
        const enterdFirstName = firstNameInputRef.current.value;
        const enterdLastName = lastNameInputRef.current.value;
        const enterdImage = imageInputRef.current.value;

        try {
            const res = await fetch('http://localhost:5000/api/user/signup', {
              method: 'post',
              body: JSON.stringify({
                email: enterdEmail,
                password: enterdPassword,
                passwordConfirm: enterdPasswordConfirm,
                userName: enterdUserName,
                firstName: enterdFirstName,
                lastName: enterdLastName,
                image: enterdImage,
              }),
              headers: { 'Content-Type': 'application/json' },
            });
          
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
          
            const data = await res.json(); // Use res.json() to parse the response data
          
            console.log('res', data);
          } catch (error) {
            console.error(error);
          }
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

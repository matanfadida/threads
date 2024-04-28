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
        const formData = new FormData();
        const enterdEmail = emailInputRef.current.value;
        const enterdPassword = passwordInputRef.current.value;
        const enterdPasswordConfirm = passwordConfirmInputRef.current.value;
        const enterdUserName = userNameInputRef.current.value;
        const enterdFirstName = firstNameInputRef.current.value;
        const enterdLastName = lastNameInputRef.current.value;
        const enterdImage = imageInputRef.current.files[0];
        formData.append("email", enterdEmail);
        formData.append("password", enterdPassword);
        formData.append("passwordConfirm", enterdPasswordConfirm);
        formData.append("userName", enterdUserName);
        formData.append("firstName", enterdFirstName);
        formData.append("lastName", enterdLastName);
        formData.append("image", enterdImage);

        try {
            const res = await fetch('http://localhost:5000/api/user/signup', {
              method: 'post',
              body: formData,
            });
          
            if (!res.ok) {
                const error = await res.json();
                throw error;
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
            <input type="text" placeholder='userName' ref={userNameInputRef}/>
        </div>
        <div>
            <input type="text" placeholder='firstName' ref={firstNameInputRef}/>
        </div>
        <div>
            <input type="text" placeholder='lastName' ref={lastNameInputRef}/>
        </div>
        <div>
            <input type="file" name="image" ref={imageInputRef}/>
        </div>
        <div>
            <button type="submit">הירשם</button>
        </div>
    </form>
}

export default SignUp;

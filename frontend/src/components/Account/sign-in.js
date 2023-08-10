import { useRef } from "react";

const SignIn = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const SendRequestSignIn = async(e) => {
        e.preventDefault();
        const enterdEmail = emailInputRef.current.value;
        const enterdPassword = passwordInputRef.current.value;

        try {
            const res = await fetch('http://localhost:5000/api/user/signin', {
              method: 'post',
              body: JSON.stringify({
                email: enterdEmail,
                password: enterdPassword,
              }),
              headers: { 'Content-Type': 'application/json' },
            });
          
            if (!res.ok) {
              console.log(res.error);
            }
          
            const data = await res.json(); // Use res.json() to parse the response data
          
            console.log('res', data);
          } catch (error) {
            console.error(error);
          }
    }


    return <form onSubmit={SendRequestSignIn}>
        <div>
            <input type="email" placeholder='דוא"ל' ref={emailInputRef}/>
        </div>
        <div>
            <input type="password" placeholder='*********' ref={passwordInputRef}/>
        </div>
        <div>
            <button>היכנס</button>
        </div>
    </form>
}

export default SignIn;
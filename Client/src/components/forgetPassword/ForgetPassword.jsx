
import { toast } from 'react-toastify';
import Styles from "./forgetPassword.module.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



/*----------Reset Password----------*/
const ForgetPassword = () => {
    const [state, setState] = useState({
     email: ""
    })

    // state change with new password and compare them
    const setValues = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }


    const navigate = useNavigate()


    const [loading, setLoading] = useState(false);
    // Sent data into backend using fetch
    const handleClick = async(e) => {
        e.preventDefault()
        setLoading(true);
        const {email} = state;
        const registrationUrl = 'http://localhost:8500/api/v1/forget-password';

            try{
                fetch(registrationUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        email
                    })
                })
               .then((response) => response.json())
               .then((data) => {
                    if(data.success){
                        navigate("/login")
                        toast.success(data.message);
                    }
                    else{
                        toast.error(data.message)
                    }
               })
            }
           catch(error){
            console.error("Registration failed:", error);
            toast.error("Registration failed. Please try again.");
            }
            finally{
                setLoading(false)
            }
        
    
    }

     const loginPage = () => {
        navigate('/login')
    }



    // return jsx
    return (
        <div className={Styles.forgetForm}>
            <h1 className={Styles.forgetHeading}>Forgot Password</h1>
            <input type="email" className={Styles.forgetInputField} placeholder="Enter Your Email"  onChange={(e)=>setValues("email", e.target.value)}/>
            <div className={Styles.forgetButtons}>
                <button className={`btn ${Styles.forgetBtn}`} onClick={handleClick} >Send LInk</button>
                <button className={`btn ${Styles.forgetBtn}`} onClick={loginPage} >Back to login </button>
            </div>
        </div>
    );
};

export default ForgetPassword;
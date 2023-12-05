//Imports Required components
import { toast } from 'react-toastify';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./registration.module.css"


/*----------Registration Component----------*/
const RegistrationForm = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        userName: "",
        password: ""
    })

    //Set form value into state
    const setValues = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }
   
    const [loading, setLoading] = useState(false);

    // Sent data into backend using fetch
    const handleClick = async () => {
        setLoading(true);
        const { name, email, userName, password } = state;
        const registrationUrl = 'http://localhost:8500/api/v1/registration';
      
        try {
          const response = await fetch(registrationUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              userName,
              password,
            }),
          });
      
          const data = await response.json();
      
          if (data.success) {
            const userId = data.user._id;
            navigate(`/verify-email?id=${userId}`);
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error('Registration failed:', error);
          toast.error('Registration failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      

    //Navigate login page
    const navigate = useNavigate()
    const loginPage = () => {
        navigate('/login')
    }

    //Return JSX
    return (
                <div className={Styles.inputForm}>
                    <h1 className={Styles.registrationHeading}>Registration</h1>
                    <input className={Styles.registrationInputField} placeholder="Enter Your Name" onChange={(e)=>setValues("name", e.target.value)}/>
                    <input className={Styles.registrationInputField} placeholder="Enter Your Email" onChange={(e)=>setValues("email", e.target.value)}/>
                    <input className={Styles.registrationInputField} placeholder="Enter Your UserName" onChange={(e)=>setValues("userName", e.target.value)}/>
                    <input className={Styles.registrationInputField} placeholder="Password" onChange={(e)=>setValues("password", e.target.value)}/>
                    <div className={Styles.registrationButtons}>
                        <button className={`btn ${Styles.registrationBtn}`}  onClick={handleClick}>Submit</button>
                        <button className={`btn ${Styles.registrationBtn}`} onClick={loginPage}>Already a user</button>
                    </div>
                </div>
    );
};

export default RegistrationForm;
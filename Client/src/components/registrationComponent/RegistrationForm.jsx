//Imports Required components
import { toast } from 'react-toastify';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
   

    // Sent data into backend using fetch
    const handleClick = async () => {
        const { name, email, userName, password } = state;
        const registrationUrl = 'https://blog-project-2mkq.onrender.com/api/v1/registration';
      
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
        }
      };
      

    //Navigate login page
    const navigate = useNavigate()

    //Return JSX
    return (
                <div className={`${Styles.container}`}>
                <div className={`${Styles.wrapper}`}>
                  <span className={`${Styles.bgChange}`}></span>
                  <div className={`${Styles.formBox}`}>
                    <h2 className={`${Styles.registrationHeading}`}>Registration</h2>
                    <div>
                      <div className={`${Styles.inputBox}`}>
                        <input type="text" placeholder="Enter Your Name" onChange={(e)=>setValues("name", e.target.value)}/>
                      </div>
                      <div className={`${Styles.inputBox}`}>
                        <input type="text" placeholder="Enter Your Email" onChange={(e)=>setValues("email", e.target.value)}/>
                      </div>
                      <div className={`${Styles.inputBox}`}>
                        <input type="text" placeholder="Enter Your UserName" onChange={(e)=>setValues("userName", e.target.value)}/>
                      </div>
                      <div className={`${Styles.inputBox}`}>
                        <input type="password" placeholder="Enter Your Password" onChange={(e)=>setValues("password", e.target.value)}/>
                      </div>
                      <button className={`${Styles.btn}`} onClick={handleClick}>
                        Sign Up
                      </button>
                      <div className={`${Styles.loginLink}`}>
                        <p>
                          Already have an account? <Link to="/login">Login</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`${Styles.text}`}>
                    <h2>Welcome To Our Blog Website</h2>
                  </div>
                </div>
              </div>
    );
};

export default RegistrationForm;
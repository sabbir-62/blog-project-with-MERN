import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'
import Styles from "./otpVerification.module.css";
import { toast } from "react-toastify";



/*----------OTP verification----------*/
const OTPVerification = () => {
  // Initialize an array for 4 digit otp
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [id, setId] = useState("")

  // for move next input field
  const inputRefs = useRef(
    new Array(4).fill(null).map(() => React.createRef())
  );

  // set input otp values
  const setValues = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (index < inputRefs.current.length - 1 && value !== "") {
      inputRefs.current[index + 1].current.focus();
    }
  };

   //get token and id from url
   const location = useLocation()
   const getId = () => {
       const {id} = queryString.parse(location.search)
       setId({
           id
       })
   }

   useEffect(() => {
      getId()
  }, [])

  //clear otp
  const clearOTP = () => {
    setOtp(new Array(4).fill(""));
  };

  //navigation
  const navigate = useNavigate();

  // Sent data into backend using fetch
  const handleClick = async (e) => {
    e.preventDefault();
   
    const registrationUrl = "https://blog-project-2mkq.onrender.com/api/v1/verify-email";
    const otpValue = otp.join("")
      try {
        fetch(registrationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id.id,
            otp: otpValue
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
                console.log(data)
              navigate("/login");
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          });
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.");
      }
  };


  // resend otp
  const resendOTP = (e) => {
    e.preventDefault();
   
    const registrationUrl = "https://blog-project-2mkq.onrender.com/api/v1/resend-otp";
      try {
        fetch(registrationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id.id
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
                console.log(data)
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          });
      } catch (error) {
        console.error("Resend otp failed:", error);
        toast.error("OTP sent failed. Please try again.");
      }
  }


  // return jsx
  return (
    <>
      <div className="row">
        <div className={`col ${Styles.textCenter}`}>
          <h1 className={Styles.otpHeading}>Verification Code</h1>
          <p className={Styles.otpText}>Please enter the verification code.</p>

          {otp.map((data, index) => (
            <input
              key={index}
              className={Styles.otpField}
              type="text"
              name="otp"
              maxLength="1"
              value={data}
              onChange={(e) => setValues(index, e.target.value)}
              onFocus={(e) => e.target.select()}
              ref={inputRefs.current[index]}
              placeholder="0"
            />
          ))}

          <p className={Styles.resendOTP} onClick={resendOTP}>Resend OTP</p>
          <div className={Styles.otpButtons}>
            <button className={`btn btn-secondary mr-2 ${Styles.clearBtn}`} onClick={clearOTP}>Clear</button>
            <button className={`btn btn-primary mr-2 ${Styles.verifyBtn}`} onClick={handleClick} >Verify OTP</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;

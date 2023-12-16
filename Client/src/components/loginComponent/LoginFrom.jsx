import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import Styles from "./login.module.css";
import { NavLink } from "react-router-dom";
import { DataContext, LoginContext } from "../contextApi/DataProvider";

/*----------Login form----------*/
const LoginFrom = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  // user context
  const { account, setAccount } = useContext(DataContext);
  const { setLoggedIn } = useContext(LoginContext);

  //Set form value into state
  const setValues = (key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const [loading, setLoading] = useState(false);

  // Sent data into backend using fetch
  const handleClick = async () => {
    setLoading(true);
    const { email, password } = state;
    const registrationUrl = "https://blog-project-2mkq.onrender.com/api/v1/login";

    try {
      await fetch(registrationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("access token", `${data.token}`);
            setAccount({
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              userName: data.user.userName,
            });
            setLoggedIn(true);
            navigate("/");
            toast.success(data.message);
          } else if (data.success == false) {
            toast.error(data.message);
          } else if (!data.user.verified) {
            navigate(`/verify-email?id=${data.user._id}`);
            toast.success(data.message);
          }
        });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // navigate registration page
  const navigate = useNavigate();
  const registrationPage = () => {
    navigate("/registration");
  };

  // return jsx
  return (

    <div className={`${Styles.container}`}>
      <div className={`${Styles.wrapper}`}>
        <span className={`${Styles.bgChange}`}></span>
        <div className={`${Styles.formBox}`}>
          <h2 className={`${Styles.registrationHeading}`}>Login</h2>
          <div>
            <div className={`${Styles.inputBox}`}>
              <input
                type="text"
                placeholder="Enter Your Email"
                onChange={(e) => setValues("email", e.target.value)}
              />
            </div>
            <div className={`${Styles.inputBox}`}>
              <input
                type="password"
                placeholder="Enter Your Password"
                onChange={(e) => setValues("password", e.target.value)}
              />
            </div>
            <button className={`${Styles.btn}`} onClick={handleClick}>
              Login
            </button>
            <div className={`${Styles.loginLink}`}>
              <p>
                New User?<span onClick={registrationPage}> Registration</span>
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

export default LoginFrom;

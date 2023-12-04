import LoginFrom from "../../components/loginComponent/LoginFrom";
import Styles from "./loginPage.module.css";

const LoginPage = () => {
  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginBox}>
        <div className={Styles.loginForm}>
          <LoginFrom />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

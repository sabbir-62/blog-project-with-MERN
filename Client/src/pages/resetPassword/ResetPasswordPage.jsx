
import ResetPassword from "../../components/resetPassword/ResetPassword";
import Styles from "./resetPasswordPage.module.css" 

const ResetPasswordPage = () => {
  return (
    <div className={Styles.loginContainer}>
      <div className={Styles.loginBox}>
        <div className={Styles.loginForm}>
          <ResetPassword />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
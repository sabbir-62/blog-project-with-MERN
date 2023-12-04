
import ResetPassword from "../../components/resetPassword/ResetPassword";
import Styles from "./resetPasswordPage.module.css" 

const ResetPasswordPage = () => {
  return (
    <div className={Styles.resetContainer}>
      <div className={Styles.resetBox}>
        <div className={Styles.resetForm}>
          <ResetPassword />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
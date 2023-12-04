
import ForgetPassword from "../../components/forgetPassword/ForgetPassword"
import Styles from "./forgetPasswordPage.module.css" 

const ForgetPasswordPage = () => {
  return (
    <div className={Styles.forgetContainer}>
      <div className={Styles.forgetBox}>
        <div className={Styles.forgetForm}>
          <ForgetPassword />
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
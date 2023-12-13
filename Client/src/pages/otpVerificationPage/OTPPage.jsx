import Styles from "./otpPage.module.css";
import OTPVerification from "../../components/otpVerification/OTPVerificaton";

const OTPPage = () => {
  return (
   
      <div className={Styles.forgetContainer}>
        <div className={Styles.forgetBox}>
          <div className={Styles.forgetForm}>
            <OTPVerification />
          </div>
        </div>
      </div>
 
  );
};

export default OTPPage;

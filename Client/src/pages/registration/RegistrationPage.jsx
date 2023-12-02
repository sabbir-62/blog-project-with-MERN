import RegistrationForm from "./../../components/registrationComponent/RegistrationForm";

import Styles from "./registrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={Styles.registrationContainer}>
      <div className={Styles.registrationBox}>
        <div className={Styles.registrationForm}>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

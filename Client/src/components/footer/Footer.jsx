import Styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={`${Styles.footer}`}>
            <p className={`${Styles.footerText} ${Styles.copyright}`}>Copyright © 2023 Md Sabbir Hossain. </p>
            <p className={`${Styles.footerText} ${Styles.developerName}`}> Designed and Developed by Md Sabbir Hossain.</p>
        </div>
    );
};

export default Footer;
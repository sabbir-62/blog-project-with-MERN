import Styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={`${Styles.footerText} ${Styles.footer}`}>
            <p>
                Copyright © 2023 HSTU Alumni Association.
            </p>
            <p>
                Designed and Developed by Md Sabbir Hossain
            </p>
        </div>
    );
};

export default Footer;
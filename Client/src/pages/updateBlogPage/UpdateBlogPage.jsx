
import UpdateBlog from "../../components/createBlog/UpdateBlog";
import Styles from "../createBlogPage/createBlogPage.module.css";

const updateBlogPage = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.contents}>
        <div className={Styles.bannerImage}></div>
         <UpdateBlog />
      </div>
    </div>
  );
};

export default updateBlogPage;

import CreateBlog from "../../components/createBlog/CreateBlog";
import Styles from "./createBlogPage.module.css";

const CreateBlogPage = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.contents}>
        <div className={Styles.bannerImage}></div>
        <CreateBlog />
      </div>
    </div>
  );
};

export default CreateBlogPage;

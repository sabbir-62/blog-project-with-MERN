import CategoryComponent from "../../components/homeComponent/CategoryComponent";
import ReadAllBlogs from "../../components/readBlogs/ReadAllBlogs";
import Styles from "./home.module.css";

const Home = () => {
  return (
    <div>
      <div className={Styles.bannerImage}></div>
      <div className={`row ${Styles.row}`}>
        <div className="col-md-3">
          <CategoryComponent />
        </div>
        <div className="col-md-9">
          <ReadAllBlogs />
        </div>
      </div>
    </div>
  );
};

export default Home;

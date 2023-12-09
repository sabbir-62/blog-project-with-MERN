import CategoryComponent from "../../components/homeComponent/CategoryComponent";
import Styles from "./home.module.css";

const Home = () => {
  return (
    <div>
      <div className={Styles.bannerImage}></div>
      <div className="row">
        <div className="col-md-2">
          <CategoryComponent />
        </div>
        <div className="col-md-10">
          <h1>Sabbir</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

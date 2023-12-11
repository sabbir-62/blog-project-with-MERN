import Styles from "./category.module.css"
import {Link} from "react-router-dom"


const CategoryComponent = () => {
    const categories = ["Food", "Programming", "Robotics", "Electronics", "Networking"];

    return (
        <div className={`container ${Styles.container}`}>
            <div className={Styles.contents}>
                <button className={`btn ${Styles.blogBtn}`}><Link className={Styles.link} style={{color:"white"}} to="/create-blog">CREATE BLOG</Link></button>
                <table className={`table ${Styles.table}`}>
                    <thead>
                        <tr className={Styles.row}>
                        <td className={Styles.category}>
                                  <Link className={Styles.link} to="/">
                                       All Categories
                                  </Link>
                             </td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, i) => (
                            <tr key={i} className={Styles.row}>
                                <td className={Styles.category}>
                                  <Link className={Styles.link} to={`/?category=${item}`}>
                                       {item}
                                  </Link>
                             </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryComponent;

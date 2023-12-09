import Styles from "./category.module.css"


const CategoryComponent = () => {
    const categories = ["Movies", "Musics", "Sports", "Fashion", "Tech"];

    return (
        <div>
            <button className={`btn btn-primary ${Styles.blogBtn}`}>CREATE BLOG</button>
            <table className={`table ${Styles.table}`}>
                <thead>
                    <tr>
                        <th>All Categories</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item, i) => (
                        <tr key={i}>
                            <td>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryComponent;

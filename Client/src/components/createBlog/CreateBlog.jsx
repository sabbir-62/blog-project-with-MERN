import Styles from "./createBlog.module.css";

const CreateBlog = () => {
  return (
    <>
      <div className={Styles.box}>
        <label className={Styles.selectFileLabel}>
          Select File
          <input className={Styles.selectFile} type="file" />
        </label>
        <select className={`${Styles.selectCategory}`} name="category">
          <option value="movies">Movies</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="fashion">Fashion</option>
          <option value="tech">Tech</option>
        </select>
        <input className={Styles.title} placeholder="Enter Blog Title" />
        <button className={`btn ${Styles.addBtn}`}>Add Blog</button>
      </div>
      <div className={Styles.blogContent}>
        <textarea
          name="blog-content"
          className={Styles.blogText}
          id="blog-content"
          placeholder="Write Your Blog Descriptions..."
        ></textarea>
      </div>
    </>
  );
};

export default CreateBlog;

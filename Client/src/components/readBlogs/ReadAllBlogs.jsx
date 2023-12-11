import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Styles from "./readAllBlogs.module.css";

const ReadAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const handleAddBlogClick = async () => {
    const registrationUrl = "http://localhost:8500/api/v1/read-blog";
    try {
      const response = await fetch(registrationUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed", error);
      toast.error("Fail. Please try again.");
    }
  };

  useEffect(() => {
    handleAddBlogClick();
  }, []);

  return (
    <div className={Styles.container}>
      {blogs.map((blog, index) => (
        <div className={`card ${Styles.card}`} key={index}>
         <div className={Styles.carImageWrapper}>
            <img className={Styles.cardImgTop} src={blog.image} alt="Card image cap" />
         </div>
          <div className="card-body">
          <p className="card-category">{blog.category}</p>
            <h2 className="card-title">{blog.title}</h2><br></br>
            <p className={`card-text ${Styles.cardText}`}>{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadAllBlogs;

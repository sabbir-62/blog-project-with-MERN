import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Styles from "./blogDetails.module.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const blogDetails = async () => {
      try {
        const registrationUrl = "http://localhost:8500/api/v1/blog-details";
        const response = await fetch(registrationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setBlog(data.blog);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Failed", error);
        toast.error("Fail. Please try again.");
      }
    };
    blogDetails();
  }, [id]);

  return (
    <div className={`container ${Styles.container}`}>
      <div className={Styles.imageWrapper}>
        <img className={Styles.blogImage} src={blog.image} alt="blog image" />
      </div>
      <div className={Styles.flatIcons}>
            <img className={`${Styles.icon}`} src="../../../public/edit.png" alt="" />
            <img className={`${Styles.icon} ${Styles.deleteIcon}`} src="../../../public/delete.png" alt="" />
      </div>
      <h1 className={Styles.title}>{blog.title}</h1>
      <div className={Styles.authorAndDate}>
        <p className={`text-muted ${Styles.authorName}`}>Author: <span className={Styles.name}>{blog.name}</span></p>
        <p className={`${Styles.date}`}>
          {new Date(blog.createdAt).toDateString()}
        </p>
      </div>
      <p className={`${Styles.description}`}>{blog.description}</p>
    </div>
  );
};

export default BlogDetails;

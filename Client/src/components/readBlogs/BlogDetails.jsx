import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Styles from "./blogDetails.module.css"


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
        <img className={Styles.blogImage} src={blog.image} alt="blog image"/>
      </div>
      <p className={`text-muted ${Styles.category}`}>{blog.category}</p>
      <div className={Styles.title}>{blog.title}</div>
      <p className={`text-muted ${Styles.category}`}>{blog.name}</p>
      <p className={`${Styles.description}`}>{blog.description}</p>
      <p className={`${Styles.date}`}>{new Date(blog.createdAt).toDateString()}</p>
    </div>
  );
};

export default BlogDetails;

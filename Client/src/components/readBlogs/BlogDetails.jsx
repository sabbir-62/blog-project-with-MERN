import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Styles from "./blogDetails.module.css";
import { BeatLoader } from "react-spinners";



/*------------Blog Details Component----------*/
const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch specific blog details by id
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
          setLoading(false)
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

  // navigate update blog page
  const navigate = useNavigate();
  const updateClick = () => {
    navigate(`/update/${id}`);
  };

  // delete Blog
  const deleteClick = async (id) => {
    const result = window.confirm("Are you sure?");
    if (result) {
      try {
        const registrationUrl = "http://localhost:8500/api/v1/delete-blog";
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
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Failed", error);
        toast.error("Fail. Please try again.");
      }
    }
  };

  // Function to convert newline characters to HTML line breaks
  const formatDescription = (description) => {
    return description.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // Check if blog is not loaded yet
  if (!blog) {
   (
    <div className="loader">
          <BeatLoader color={"#36d7b7"} loading={loading} size={15} />
      </div>
   )
  }


  //get account information from local storage
  const account = JSON.parse(localStorage.getItem('account'));

  return (
    <div className="container">
      {loading ? (
      <div className="loader">
          <BeatLoader color={"#36d7b7"} loading={loading} size={15} />
      </div>
  ) : (
    <div className={`${Styles.container}`}>
      <div className={Styles.imageWrapper}>
        <img className={Styles.blogImage} src={blog.image} alt="blog image" />
      </div>
      {
        account.id === blog.owner ?
        <div className={Styles.flatIcons}>
        <button className={`${Styles.btn} ${Styles.updateBtn}`} onClick={() => updateClick(id)}>
          <img className={`${Styles.icon}`} src="../../../public/edit.png" alt="" />
        </button>
        <button className={`${Styles.btn} ${Styles.deleteBtn}`} onClick={() => deleteClick(id)}>
          <img className={`${Styles.icon} ${Styles.deleteIcon}`} src="../../../public/delete.png" alt=""/>
        </button>
      </div>: ""
      }
      <h1 className={Styles.title}>{blog.title}</h1>
      <div className={Styles.authorAndDate}>
        <p className={`text-muted ${Styles.authorName}`}>
          Author: <span className={Styles.name}>{blog.name}</span>
        </p>
        <p className={`${Styles.date}`}>
          {new Date(blog.createdAt).toDateString()}
        </p>
      </div>
      <p className={`${Styles.description}`}>
        {formatDescription(blog.description)}
      </p>
    </div>)}
    </div>
  );
};

export default BlogDetails;

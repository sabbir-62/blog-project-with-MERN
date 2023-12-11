import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Styles from "./readAllBlogs.module.css";
import { useSearchParams } from "react-router-dom";


/*----------Read All Blogs----------*/
const ReadAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchParams] = useSearchParams()

  let category = searchParams.get('category')

  useEffect(() => {
    const handleAddBlogClick = async () => {
    let response;
      try {
        if(!category){
            const registrationUrl = "http://localhost:8500/api/v1/read-blog";
            response = await fetch(registrationUrl, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
          },
        });
        }
        else{
            const registrationUrl = "http://localhost:8500/api/v1/read-blog-by-category";
            response = await fetch(registrationUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  category
                }),
              });
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

    handleAddBlogClick();
  }, [category]);

  return (
    <div className={Styles.container}>
      {blogs.map((blog, index) => (
        <div className={`card ${Styles.card}`} key={index}>
          <div className={Styles.carImageWrapper}>
            <img
              className={Styles.cardImgTop}
              src={blog.image}
              alt="Card image cap"
            />
          </div>
          <div className={`card-body ${Styles.cardBody}`}>
            <p className={`card-category text-muted ${Styles.category}`}>{blog.category}</p>
            <p className={`card-category text-muted ${Styles.category}`}>{blog.name}</p>
            <h2 className="card-title">{blog.title}</h2>
            <br></br>
            <p className={`card-text ${Styles.cardText}`}>{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadAllBlogs;

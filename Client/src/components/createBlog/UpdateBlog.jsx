import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Styles from "./createBlog.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";


const UpdateBlog = () => {
  const [selectText, setSelectText] = useState("Select Image");
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const [blog, setBlog] = useState({
    id: "",
    name: "",
    file: "",
    category: "",
    title: "",
    description: ""
  });

  const navigate = useNavigate();

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
          setBlog({
            id: data.blog._id,
            name: data.blog.name,
            file: data.blog.image,
            category: data.blog.category,
            title: data.blog.title,
            description: data.blog.description
          });
          setSelectText("Selected");
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

  const convertToBase64 = async (file) => {
    return await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBlog({
      ...blog,
      file: base64,
    });
    setSelectText("Selected");
  };

  const handleValueChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateBlogClick = async () => {
    const registrationUrl = 'http://localhost:8500/api/v1/update-blog';
    const {id, name, file, category, title, description } = blog;

    try {
      const response = await fetch(registrationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          image: file,
          category,
          title,
          description,
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
  };

  return (
    <div>
      {loading ? (
      <div className="loader">
          <BeatLoader color={"#36d7b7"} loading={loading} size={15} />
      </div>
  ) : (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <label className={Styles.selectFileLabel} style={{ background: selectText === "Selected" ? "#4BB543" : "#3498db" }}>
          {selectText}
          <input className={Styles.selectFile} accept=".jpeg, .png, .jpg" type="file" name="file" onChange={handleFileChange} />
        </label>
        <select className={`${Styles.selectCategory}`} name="category" value={blog.category} onChange={handleValueChange}>
          <option value="" disabled>Category</option>
          <option value="Food">Foods</option>
          <option value="Programming">Programming</option>
          <option value="Robotics">Robotics</option>
          <option value="Electronics">Electronics</option>
          <option value="Networking">Networking</option>
        </select>
        <input className={Styles.title} value={blog.title} placeholder="Enter Blog Title" name="title" onChange={handleValueChange} />
        <button className={`btn ${Styles.addBtn}`} onClick={handleUpdateBlogClick}>
          Update
        </button>
      </div>
      <div className={Styles.blogContent}>
        <textarea
          name="description"
          className={Styles.blogText}
          id="blog-content"
          placeholder="Write Your Blog Descriptions..."
          onChange={handleValueChange}
          value={blog.description}
        ></textarea>
      </div>
    </div>)}
    </div>
  );
};

export default UpdateBlog;

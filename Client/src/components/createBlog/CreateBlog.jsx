
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import Styles from "./createBlog.module.css";
import { DataContext } from "../contextApi/DataProvider";
import { useNavigate } from "react-router-dom";


/*----------Create Blog Component----------*/
const CreateBlog = () => {
  const [selectText, setSelectText] = useState("Select Image")
  const [state, setState] = useState({
    file: "",
    category: "",
    title: "",
    description: ""
  });

  // get id from context api
  const {account} = useContext(DataContext)
  
  //navigate
  const navigate  = useNavigate()

  // convert image into base64
  async function convertToBase64(file) {
    return await new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  // Handle file input change
  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setState({
      ...state,
      file: base64
    });
    setSelectText("Selected")
  };

    // Handle file input change
  const handleValueChange = async(e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };


  // Handle button click
  const handleAddBlogClick = async() => {
    const registrationUrl = 'http://localhost:8500/api/v1/create-blog';
    const {file, category, title, description} = state
            try{
                fetch(registrationUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        id: account.id, image: file, category, title, description
                    })
                })
               .then((response) => response.json())
               .then((data) => {
                    if(data.success){
                        navigate("/")
                        toast.success(data.message);
                    }
                    else{
                        toast.error(data.message)
                    }
               })
            }
           catch(error){
            console.error("Failed", error);
            toast.error("Fail. Please try again.");
            }
  };



  return (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <label className={Styles.selectFileLabel} style={{ background: selectText === "Selected" ? "#4BB543" : "#3498db" }}>
          {selectText}
          <input className={Styles.selectFile} accept=".jpeg, .png, .jpg" type="file" name="file" onChange={handleFileChange} />
        </label>
        <select className={`${Styles.selectCategory}`} name="category" value={state.category} onChange={handleValueChange}>
          <option value="" disabled>Category</option>
          <option value="movies">Movies</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="fashion">Fashion</option>
          <option value="tech">Tech</option>
        </select>
        <input className={Styles.title} placeholder="Enter Blog Title" name="title" onChange={handleValueChange} />
        <button className={`btn ${Styles.addBtn}`} onClick={handleAddBlogClick}>
          Add Blog
        </button>
      </div>
      <div className={Styles.blogContent}>
        <textarea
          name="description"
          className={Styles.blogText}
          id="blog-content"
          placeholder="Write Your Blog Descriptions..."
          onChange={handleValueChange}
        ></textarea>
      </div>
    </div>
  );
};

export default CreateBlog;

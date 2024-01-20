
/*-----------Imports---------*/
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './myAccount.css'
import { BeatLoader } from "react-spinners";




/*-----------Main function component---------*/
const MyAccount = () => {
    const [loading, setLoading] = useState(true)  //for set loading spinner
    const [state, setState] = useState({
        name: "",
        userName: "",
        email: "",
    })

    const navigate = useNavigate(); // Call useNavigate as a function

    // Getting profile information from database
    const myAccountPage = async() => {
        const account = JSON.parse(localStorage.getItem("account"))
        setState({
            name: account.name,
            userName: account.userName,
            email: account.email
        })
        setLoading(false)
    }

    // Set input values into state
    const setValues = (key, value) => {
        setState({
          ...state,
          [key]: value,
        });
      };




    useEffect(() => {
        myAccountPage();
    }, []); // Empty dependency array to run the effect once


    

    return (
        <div>
            {
                loading ?
                (
                    <div className="loader">
                      <BeatLoader
                        color={"#36d7b7"}
                        loading={loading}
                        size={15}
                      />
                    </div>
                  )
                :
                
               <div className="container profile">
                 <div className="profile-card min-height">
                <form className="profile-form" method='POST'>
                    <h1 className="profile-heading">
                        Your Profile
                    </h1>
                    <div className="profile-box">
                        <div className="profile-field">
                            <label htmlFor="name">Full Name :</label>
                            <input type="text" name="name" id='name' className='profile-input'  value={state.name} onChange={(e) => {setValues("name", e.target.value)}} placeholder="Enter Your Name"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="studentId">UserName :</label>
                            <input type="text" name="studentId" id='studentId' className='profile-input'  value={state.userName} onChange={(e) => {setValues("studentId", e.target.value)}} placeholder="Enter Your Student ID"/>
                        </div>
                        <div className="profile-field">
                            <label htmlFor="department">Email :</label>
                            <input type="text" name="department" id='department' className='profile-input'  value={state.email} onChange={(e) => {setValues("department", e.target.value)}} placeholder="Enter Your Department Name"/>
                        </div>
                        <div className="account-buttons">
                            <button type='submit' className='btn save-profile-btn ac-btn btn-primary mt-3'>Save Profile</button>
                        </div>
                    </div>
                </form>
            </div>
               </div>
            }
        </div>
    );
};

export default MyAccount;
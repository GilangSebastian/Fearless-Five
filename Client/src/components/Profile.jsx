import React, {useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import ModalInput from './ModalInput'
import CardJob from './CardJob'
import CardList from './CardList'

const Profile = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);

  const [lamaran, setLamaran] = useState([]);
  const [job, setJob] = useState([]);

  const token = localStorage.getItem("token");

  const getProfile = async (token) => {
    try {
      const data = await axios.get("http://localhost:3001/users", {
        headers: {
          token,
        },
      });
      dispatch({ type: "ADD_LOGIN", payload: data.data });
    } catch (err) {
    }
  };

  const getLamaran = async (fields,id) => {
    const data = await axios.get(`http://localhost:3001/applies?${fields}=${id}`, {
      headers: {
        token
      }
    });
    setLamaran(data.data.apply)
  }

  const getJob = async (email) => {
    try {
      const data = await axios.get(`http://localhost:3001/vacancies?hrdEmail=${email}`, {
        headers: {
          token
        }
      });
      setJob(data.data)
      // setJob(data)
    } catch (err) {
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    getProfile(token);
  }, []);

  useEffect(() => {
    if (user.role === 'user') {
      getLamaran('id',user._id)
    } else {
      getLamaran('email', user.email)
      getJob(user.email);
    }
  }, [user])

  return (
    <React.Fragment>
      {!user.name ? null : (
        <div>
          <img src={user.profile} width="80" alt="noProfile"/>
          <h1>{user.name}</h1>
          <p>{user.jobTitle}</p>
          <p>{user.phoneNumber}</p>
          <p>{user.nationality}</p>
          <p>{user.jobStatus}</p>
          <p>{user.citizen}</p>
          <p>{user.location}</p>
          <p>{user.summary}</p>
          <p>{user.email}</p>
          <p>{user.workNow}</p>
          {user.cv ? <a className="text-blue-300" href={user.cv}>Check CV</a> : null}
        </div>
      )}
      <button onClick={() => setModal(true)}>Edit</button>
      {
        modal ? 
        <div>
          <h1 className="text-lg font-bold">Form Edit</h1>
          <ModalInput />
        </div> :
        null
      }
      {lamaran.map((el, i) => <CardJob getLamaran={getLamaran} email={user.email} key={i} userRole={user.role} {...el}/>)}
      {job.map((el, i) => <CardList key={i} {...el}/>)}
    </React.Fragment>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { getUserName, updateName } from "../features/UserSlice";
import axios from "axios";


function UserProfil() {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState(null)


  const token = useSelector(state => state.auth.value.token)
  useEffect(() => {
    axios.post('http://localhost:3001/api/v1/user/profile',{}, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      },
     })
    .then( res => {
      console.log(res);
      dispatch(getUserName({firstName:res.data.body.firstName, lastName: res.data.body.lastName, id: res.data.body.id, status:  res.data.status, message : res.data.message }))
       
    })
    .catch(err => console.log(err))
  })

  const lastName = useSelector(state => state.user.value.lastName)

  function handleEditName() {
    axios.put('http://localhost:3001/api/v1/user/profile', {firstName: userName, lastName: lastName}, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      },
     })
    .then ((res) => {
      console.log(res);
      dispatch(updateName({firstName:res.data.body.firstName, lastName: res.data.body.lastName, id: res.data.body.id, status:  res.data.status, message : res.data.message }))
      dispatch(getUserName({firstName:res.data.body.firstName, lastName: res.data.body.lastName, id: res.data.body.id, status:  res.data.status, message : res.data.message }))
    })
    .catch((err) => console.log(err))
  } 


  const firstName = useSelector(state => state.user.value.firstName)

  return  <div className="header">
      <h1>Welcome back<br/>{firstName}</h1>
      <div>
        <label htmlFor="userName">New Username</label>
        <input type="text" id="userName"  onChange={(e) => setUserName(e.target.value)} />
      </div>
      <button className="edit-button" type="submit" onClick={() => handleEditName()}>Edit Name</button>
    </div>
}

export default UserProfil
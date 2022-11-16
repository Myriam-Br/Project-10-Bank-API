import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { getUserName, updateName } from "../Features/UserSlice";
import { checkInput, deleteInput } from "../Features/FormProfil";
import axios from "axios";



function UserProfil() {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false);
  const [errorFirstName, setErrorFirstName] = useState(null)
  const [errorLastName, setErrorLastName] = useState(null)
  const token = localStorage.getItem('token')
  console.log('TOKEN',token);

  useEffect(() => {
    
    axios.post('http://localhost:3001/api/v1/user/profile',{}, {
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      },
     })
    .then( res => {
      dispatch(getUserName({firstName:res.data.body.firstName, lastName: res.data.body.lastName, id: res.data.body.id, status:  res.data.status, message : res.data.message })) 
    })
    .catch(err => console.log(err))
  })

  //firstname and lastname to display
  const userLastName = useSelector(state => state.user.value.lastName)
  const userFirstName = useSelector(state => state.user.value.firstName)
  let firstName = useSelector(state => state.formProfil.value.firstName)
  let lastName = useSelector(state => state.formProfil.value.lastName)

  //validate input
  function validator(value, input) { 
    var letters = /^[A-Za-z]+$/g;   
    if(value && letters.test(value)) {
      switch(input){
        case 'firstName':
          dispatch(checkInput({firstName : value, lastName : lastName}))
          setErrorFirstName('')
          break
        case 'lastName':
          dispatch(checkInput({firstName : firstName, lastName: value}))
          setErrorLastName('')
          break
          default:
          console.log("input doesn't exist");
      }     
    }else{
      switch(input){
        case 'firstName':
          setErrorFirstName('firstname must contain only letters and no spaces')
          break
        case 'lastName':
          setErrorLastName('lastName must contain only letters and no spaces')
          break
          default:
          console.log("input doesn't exist");
      }  
    }  
  }

 
  function handleEditName() {
    setEdit(!edit)
    if(!firstName) {
      firstName = userFirstName
    }
    if(!lastName) {
      lastName = userLastName
    }

    axios.put('http://localhost:3001/api/v1/user/profile', {firstName: firstName, lastName:lastName},{
      headers: {
        'Authorization': 'Bearer' + ' ' + token
      },
      })
      .then ((res) => {
        dispatch(updateName({firstName:res.data.body.firstName, lastName: res.data.body.lastName, id: res.data.body.id,  status: res.data.status, message : res.data.message }))
        dispatch(getUserName({firstName:res.data.body.firstName, lastName: res.data.body.lastName, id: res.data.body.id, status:  res.data.status, message : res.data.message }))
        dispatch(deleteInput())
      })
      .catch((err) => console.log(err))    
  } 

  return  <div className="header">
    {edit ? (
      <section className="input-wrapper edit-info" >
        <label htmlFor="firstName">New Firstname</label>
        <input type="text" id="firstName"  onChange={(e) => validator(e.target.value,'firstName')}/> 
        <span>{errorFirstName}</span>     
        <label htmlFor="lastName">New Lastname</label>
        <input type="text" id="lastName" onChange={(e) => validator(e.target.value,'lastName')} />
        <span>{errorLastName}</span>       
      </section>
      ):(
       <h1>Welcome back<br/>{userFirstName} {userLastName}</h1>
      )}
     <button className="edit-button" type="submit" onClick={() => handleEditName()}>Edit Name</button>     
    </div>
}

export default UserProfil
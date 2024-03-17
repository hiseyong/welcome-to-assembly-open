import { Login } from "./pages/Login";
import { Pass } from "./pages/Pass";
import { Fail } from "./pages/Fail";
import './style.css'
import { useState, useEffect } from "react";
function App() {
  const [userInfo, setUserInfo] = useState({
    'id':'',
    'name':'',
    'ispass':'',
    'isfail':'',
    'isunknown':'',
    'hash':'',
    'isaccept':''
  })
  useEffect(()=>{
    console.log(userInfo)
  },[userInfo])
  if (userInfo.ispass === '' && userInfo.isfail === '' && userInfo.isunknown === '') {
    return (
      <center className="App">
        <Login userInfo={userInfo} setUserInfo={setUserInfo}/>
      </center>
    );
  } else if (userInfo.ispass === true) {
    return(
      <center>
        <Pass userInfo={userInfo}/>
      </center>
    )
  } else if (userInfo.isfail === true) {
    return(
      <center id="failcontain">
        <Fail userInfo={userInfo}/>
      </center>
    )
  }
  
}

export default App;

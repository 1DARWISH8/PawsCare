import {useState} from 'react'
import { userLoginContext } from './userLoginContext'
import axios from 'axios'
import { compareSync } from 'bcryptjs'
// import {useNavigate} from 'react-router-dom'

function UserContextProvider({children}) {

    let [currentUser,setCurrentUser]=useState({})
    let [userLoginStatus,setUserLoginStatus]=useState(false)
    // let navigate = useNavigate()
    let [error,setError]=useState('')
    let [cart,setCart]=useState([])
    // let [food,setFood]=useState([])
    // let [treats,setTreats]=useState([])
    // let [toys,setToys]=useState([])
    // let [essentials,setEssentials]=useState([])


    async function formSubmit(data)
    {
        // console.log(data)
        let res = await axios.get(`http://localhost:4000/userdata?username=${data.username}`)
        let userList = res.data;
        if (userList.length===0)
        {
            setError("INVALID USERNAME")
        }
        else
        {
            let result=compareSync(data.password,userList[0].password)
            // console.log(result)
            if (result===false)
            {
                setError("INVALID PASSWORD")
            }
            else
            {
                setCurrentUser(userList[0])
                setUserLoginStatus(true)
                // navigate('/userprofile')
            }
        }
    }

return (
    <userLoginContext.Provider
    value={[currentUser,setCurrentUser,userLoginStatus,setUserLoginStatus,formSubmit,error,cart,setCart]}>
    {children}
    </userLoginContext.Provider>
)
}

export default UserContextProvider

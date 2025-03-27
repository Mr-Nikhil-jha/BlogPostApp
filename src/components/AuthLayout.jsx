import React ,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"

export default function Protected({children,authentcation = true}) {

    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authstatus = useSelector(state=>state.auth.status)

    useEffect(()=>{
        if(authentcation && authstatus !== authentcation){
            navigate('/login')
        }
        else if(!authentcation && authstatus !==authentcation){
            navigate('/')
        }
        setLoader(false)
    },[authstatus,navigate,authentcation])

  return (
   loader ? <h1>...loading</h1>: {children}
  )
}


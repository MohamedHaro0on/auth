import {FaEnvelope, FaKey, FaLock, FaRedhat, FaUserAlt} from "react-icons/fa";
const inputs = [
    {
        name : "firstName", 
        label : "First Name" , 
        type : "text",
        id : "firstName",
        icon :<FaUserAlt/>

    },
    {
        name : "lastName", 
        label : "Last Name" , 
        type : "text",
        id : "lastName",
        icon :<FaUserAlt/>
    },
    {
        name : "email", 
        label : "Email" , 
        type : "text",
        id : "email",
        icon : <FaEnvelope/>

    },
    {
        name : "password", 
        label : "Password" , 
        type : "password",
        id : "password",
        icon : <FaLock/>

    },
    {
        name : "confirmPassword", 
        label : "Confirm Password" , 
        type : "password",
        id : "password",
        icon : <FaKey/>
    },
    {
        name : "role", 
        label : "Role" , 
        type : "select",
        id : "role",
        options : ["user" , "admin"],
        icon : <FaRedhat/>
    },
    
]

export default inputs ; 
"use client"
import ProfileInfoNav from "./ProfileInfoNav";
import "../profile.css"

import {FaPen, FaUpload} from 'react-icons/fa'



interface props{
    img:string,
    username:string
}



const ProfileAvatar = (props:props) => {


    


const upload = () => {
   
    var avatar = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', avatar.files[0])
data.append('user', 'hubot')

fetch('http://localhost:1337/user/edit/avatar', {
  method: 'POST',
  body: data
})
  };



const avatar = document.getElementById('avatar');
    return (
        <div>

            <div className="profile_avatar">
                <div className="avatar_edit_real">
                    <img src={props.img} className="my_profile_img"></img>
                    <label>
                    <FaUpload/>
                    <form >
                        
                        <input type="file" id="avatar" name="file" onChange={upload}/>
                        
                    </form>
                    
                    </label>
                    
                </div>


                        <div>
                        <p className="username">{props.username}</p>
                        </div>
                        <div>
                        <ProfileInfoNav/> 
                        </div>
                               
                </div>
        </div>
    );


    
};
export default ProfileAvatar;
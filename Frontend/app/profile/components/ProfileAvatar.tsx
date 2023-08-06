"use client"
import "../profile.css"
import Cookies from 'js-cookie';
import { useState } from "react";
import { Avatar, useToast } from '@chakra-ui/react'


interface props{
    img:string,
    username:string,
    avatar_updated:boolean
}



const ProfileAvatar = (props:props) => {

    let new_src_img;
    const [realimg, setrealimg] = useState("");
    const [first_time, setfirsttime] = useState(false)
    const toast = useToast()

        const upload = async () => {
   
            var avatar = document.querySelector('input[type="file"]')

            var data = new FormData()
            data.append('file', avatar?.files[0])
            data.append('user', 'hubot')

            
            const  res = await fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/edit/avatar`, {
                method: 'PUT',
                headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                    },
                body: data
            })
            

            if (res.status == 200)
            {
                toast({
                    title: 'Profile Avatar Updated',
                    description: "Your Profile Avatar changed!",
                    status: 'info',
                    duration: 9000,
                    isClosable: true,
                  })
            }
            

            if (res.status == 400)
            {
                toast({
                    title: 'Invalid File',
                    description: "Please upload Valid Image type PNG OR JPG OR JPEG, or reduce the file size",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                  return ;
            }
            if (!res.ok)
                throw new Error("failed to fetch users");
            else
            {
                setrealimg(URL.createObjectURL(avatar?.files[0]));
                setfirsttime(true);
                
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
                
                sessionStorage.setItem('avatar', new_src_img);
            }
                
            };


            if (props.avatar_updated)
            {
               
                new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.img;
                sessionStorage.setItem('avatar', new_src_img);
            }
            else
            {
                sessionStorage.setItem('avatar', props.img );
            }
                


    return (

                <div className="avatar_edit_real border-2 border-blue-500/100 rounded-full">

                    <label className="cursor-pointer animate-pulse">
                    <Avatar size='xl' name={props.username} src={props.avatar_updated || first_time ? realimg ? realimg  : !props.avatar_updated ? props.img : new_src_img : props.img}>
                        </Avatar>
                        
                            <form >
                                <input type="file" id="avatar" name="file" onChange={upload}/>
                            </form>
                    </label>  
                </div>


    );


    
};
export default ProfileAvatar;
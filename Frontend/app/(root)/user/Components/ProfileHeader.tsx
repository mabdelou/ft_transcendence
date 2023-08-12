import Link from "next/link";
import ProfileAvatar from "./ProfileAvatar";
import Cookies from 'js-cookie';
import useSWR from "swr"

import { useRouter } from "next/navigation";
import { useState } from "react";
import UserRank from "./UserRank";

  interface props{
    avatar:string,
    email:string,
    username:string,
    rank:string,
    avatar_updated:boolean,
    id:number,
    status:boolean,
    isIngame:boolean
  }


const ProfileHeader = (props:props) => {


  const router = useRouter();
    
  let button_placeholder = 'request';
  const [status, setstatus] = useState("")
  const [statusbg, setstatusbg] = useState("")
 


  const fetchFriendStatus = async (url:string) => {
      const res = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`
           }});

      if (res.status == 401)
          router.replace("/")
           
      if (!res.ok)
          throw new Error("failed to fetch users");
      return res.json();
  }


  const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/status/${props.id}`,
  fetchFriendStatus
  );

  if (!data)
      return null;

  

    const send_request = () =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/send/${props.id}`, {
            method: 'POST',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
        }
            
          }).then((response) => response.json())
          .then(data => setstatus("cancel"))
    }
    


    const handel_response_user = (friendRequestId:string, user_response:string) =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/response/${friendRequestId}`, {
            method: 'PUT',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({ status: user_response })
            
          }).then((response) => response.json())
          .then(data => setstatus(data.status))
    }

    const deleteFriendRequest = (friendRequestId:string) =>
    {
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friend-request/remove/${friendRequestId}`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'Content-Type': 'application/json'
                },
            
          });
    }

    console.log(data)




    if (data.status === 'pending')
        button_placeholder = 'cancel';
    else if (data.status === 'not-sent')
        button_placeholder = 'Add Friend';
    else if (data.status === 'waiting-for-current-user-response')
        button_placeholder = 'accept';
    else if (data.status === 'accepted')
        button_placeholder = 'unfriend';
    else if (data.status === 'declined')
        button_placeholder = 'Add Friend';






        const handel_all_request = () =>
        {
    
            if (data.status === 'pending'){
                deleteFriendRequest(data.id);
                button_placeholder = 'Add Friend';
                setstatusbg('bg-blue-500');
            }
            else if (data.status === 'not-sent')
            {
                
                send_request();
                button_placeholder = 'cancel';
                setstatusbg('bg-orange-500');
                console.log("requested")
            }
            else if (data.status === 'waiting-for-current-user-response')
            {
                handel_response_user(data.id, 'accepted');
                button_placeholder = 'Unfriend';
                console.log("accepted")
            }
            else if (data.status === 'accepted')
            {
                deleteFriendRequest(data.id);
                button_placeholder = 'Add Friend';
                setstatusbg('bg-blue-500');
                console.log("unfriend")
            }
            else if (data.status === 'declined')
            {
                button_placeholder = 'request';
                send_request();
                console.log("requested")
            }
            
            setstatus(button_placeholder)
        }




    let new_src_img;
    if (props.avatar_updated)
        new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + props.avatar;
    return (
        
        <div className="flex items-center justify-between mb-6 flex-wrap">
    <div className="flex items-center">
     
      <div className="relative">
       
       <ProfileAvatar img={props.avatar} username={props.username} avatar_updated={props.avatar_updated} id={props.id} status={props.status}/>
        
      </div>
      <div className="ml-4">
      
        <h1 className="text-3xl font-semibold text-blue-500">{props.username}</h1>
        <p className="text-gray-600">{props.email}</p>
        <p className={`${`${props.isIngame ? 'block' : 'hidden'} text-blue-600 font-semibold my-[4px]`}`}>Player In Game...</p>
       
         
        <UserRank id={props.id}/>
      
      </div>
    </div>

    



    <div className="py-4">
    
    <button className={data.status == 'pending' ? 'bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg' : 'bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'} onClick={handel_all_request}>{status ? status : button_placeholder}</button>
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 ml-4 rounded-lg">block</button>
    </div>
      
      

  </div>
    );
};
export default ProfileHeader;

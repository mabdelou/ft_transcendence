import Friend from "./friends";
import { BiSearchAlt } from 'react-icons/bi'
import { useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';
import Groups from "./groups";
import Search from "./search";

export default function Chats()
{
    const [friends, setFriends] = useState([]);
    const [forg, setForg] = useState(true);
    const [search, setSearch] = useState([]);
    const searchRef = useRef<any>(null);
    const searching = (e:any) => {
        console.log(e.target.value)
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/groups/search?value=${e.target.value}`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }).then((response) => response.json())
        .then(data => setSearch(data))
    }
    useEffect(()=>{
        
        fetch(`${process.env.NEXT_PUBLIC_BACK_IP}/user/friends`, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
            
        }).then((response) => response.json())
        .then(data => setFriends(data))  
    },[]);

    let new_src_img:string;
    const newArray = friends.map((frnd:any, index)=>
    {
        if (frnd.is_profile_img_updated)
        {
            new_src_img = process.env.NEXT_PUBLIC_BACK_IP + "/user/profile-img/" + frnd.profile_img;
        }
        return (<Friend key={index} user={frnd} />)
    })
    const friend_click = () =>{setForg(true)}
    const group_click = () =>{setForg(false)}
    useEffect(()=>{
        document.addEventListener('click', (e) => {((searchRef.current)&&(!searchRef.current.contains(e.target)))?setSearch([]):console.log('dd')}, true)
    },[])
    return (
        <div className="flex flex-col h-full">
            <div className="text-center text-2xl pb-1">Chats</div>
            <div className="flex justify-around m-2">
                <div onClick={friend_click} className="hover:bg-sky-900 w-1/2 text-center bg-[#363672] rounded-full cursor-pointer p-2 drop-shadow-md">friends</div>
                <div onClick={group_click} className="hover:bg-sky-900 w-1/2 text-center bg-[#363672] rounded-full cursor-pointer p-2 drop-shadow-md" >groups</div>
            </div>
            <div className="self-center mt-2 mb-2 w-[90%] relative drop-shadow-md">
                <form action="">
                    <input onChange={searching} className="bg-[#363672] rounded-full pl-3 pr-2 p-1 focus:outline-none w-full" type="search" placeholder="search..."/>
                    <button className="absolute right-2 top-1" type="submit"><BiSearchAlt size={21}/></button>
                    <div ref={searchRef} className="bg-sky-900 absolute w-full rounded-lg mt-1">
                        <Search search={search}/>
                    </div>
                </form>
            </div>
            <div className="pl-3 h-[100%] overflow-scroll">
                {(forg)?newArray:<Groups/>}
            </div>
        </div>
    )
}

import { useContext } from 'react'
import {HiUserGroup} from 'react-icons/hi'
import reciverContext from '../reciverContext'
import activeContext from '../activeContext';

export default function Group(props:any) {
    const reciver = useContext(reciverContext);
    const active = useContext(activeContext);
    const group_click = () =>{
        reciver.setReciver({isgroup:true, id:props.id, name:props.name});
        active.setActive('message');
    }
    return(
        <div onClick={group_click} className="flex hover:bg-sky-900 cursor-pointer">
            <div>
                <HiUserGroup size={30} />
            </div>
            <div className='p-2'>
                <h1>{props.name}</h1>
            </div>
        </div>
    )
};

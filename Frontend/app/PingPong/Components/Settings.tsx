'use client'

import Link from "next/link";
import "../style/style.css"
import { io } from 'socket.io-client'
import { Socket } from "dgram";

export let MapNumber = 3;
export let Speed = 1;
export let pause_game = 0;
export let other_tools = 0;
export let host = false;
export let Online = 1;
// export let ID = "";
function change_map_value(param: number)
{
    for(let a=1;a<4;a++)
    {
        const mapv = document.getElementById(`mapv${a}`);
        if(mapv !== null)
            mapv.style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    }
    const changemap= document.getElementById(`mapv${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    MapNumber = param;
}

function change_online_value(param: number)
{
    const changemap= document.getElementById(`match_mood_${param}`);
    const play = document.getElementById('play');
    const play2 = document.getElementById('play2');
    const other_tools = document.getElementById('other_tools');
    const pause_game = document.getElementById('pause_game');
    for(let a=0;a<2;a++)
    {
        const match_mood_ = document.getElementById(`match_mood_${a}`);
        if(match_mood_ !== null)
            match_mood_.style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    }
    if(changemap !== null)
        changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    if(param === 1)
    {
        
        if(play !== null)
            play.style.zIndex = "1";
        if(play2 !== null)
            play2.style.zIndex = "2";
        if(other_tools !== null)
            other_tools.style.opacity = "0";
        if(pause_game !== null)
            pause_game.style.opacity = "0";
    }
    else
    {
        if(play !== null)
            play.style.zIndex = "2";
        if(play2 !== null)
            play2.style.zIndex = "1";
        if(other_tools !== null)
            other_tools.style.opacity = "1";
        if(pause_game !== null)
            pause_game.style.opacity = "1";
    }
    Online = param;
}

function change_other_tools_value(param: number)
{
    for(let a=0;a<2;a++)
    {
        const other_tools_ = document.getElementById(`other_tools_${a}`)
        if(other_tools_ !== null)
            other_tools_.style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    }
    const changemap= document.getElementById(`other_tools_${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    other_tools = param;
}

function change_pausegame_value(param: number)
{
    for(let a=0;a<2;a++)
    {
        const pause_game_ = document.getElementById(`pause_game_${a}`);
        if(pause_game_ !== null)
            pause_game_.style.backgroundColor = "rgba(88, 21, 141, 0.4)";
    }
    const changemap = document.getElementById(`pause_game_${param}`);
    if(changemap !== null)
        changemap.style.backgroundColor = "rgba(88, 21, 141, 1)";
    pause_game = param;
}

function is_Online_mod(socket: Socket, router: any)
{
    const settings = document.getElementById("Settings")
    if(Online === 1)
    {
        if(settings !== null)
            settings.style.filter = "blur(15px)";
        socket.emit('join_user','new User join party');
        socket.on('join_user', (data) => {
            console.log(data);
        });
        socket.emit('send_data',{Speed,MapNumber,});
        socket.on('send_data', (data) => {
            host = data;
            console.log(host);
            socket.disconnect();
            router.replace('/PingPong/Play/Online');
        });
    }
    else
        router.replace('/PingPong/Play/Ofline');
}

function change_pos(param :number)
{
    const element = document.getElementById("scroll");
    if(element != null)
    {
        if(param === 1)
        element.style.left = "35%";
        else if(param === 2)
        element.style.left = "58.5%";
        else
        element.style.left = "83%";
        Speed = param;
    }
}

const PingPongSettings = ({ router }: any) => 
{
    const socket = io('http://10.11.8.1:1339', {extraHeaders:{
            'Access-Control-Allow-Origin': "*"
        }});
    return(
        <div id="Settings">
            <p id="Game_title">
                PingPong
            </p>
            <div id="speed">
                <p id="speed_p">
                    Speed :
                </p>
                <div id="scroll" style = {{left: '35%'}}></div>
                <button  onClick={()=>  change_pos(1)} id="p_1">x1</button>
                <button  onClick={()=>  change_pos(2)} id="p_2">x2</button>
                <button  onClick={()=>  change_pos(4)} id="p_4">x4</button>
                <div id="speed_scrool">
                </div>
            </div>
            <div id="map">
                <p id="map_p">
                    Map :
                </p>
                <button  onClick={()=> change_map_value(1)} id="mapv1">
                    <p>
                        v1
                    </p>
                </button>
                <button onClick={()=> change_map_value(2)} id="mapv2">
                    <p>
                        v2
                    </p>
                </button>
                <button onClick={()=> change_map_value(3)} id="mapv3">
                    <p>
                        v3
                    </p>
                </button>
            </div>
            <div id="match_mood">
                <p id="match_mood_p">
                    Match Mood :
                </p>
                <button onClick={()=> change_online_value(1)} id="match_mood_1">
                    <p>
                        Online
                    </p>
                </button>
                <button onClick={()=> change_online_value(0)} id="match_mood_0">
                    <p>
                        Ofline
                    </p>
                </button>
            </div>
            <div id="pause_game">
                <p id="pause_game_p">
                    pause game :
                </p>
                <button onClick={()=> change_pausegame_value(1)} id="pause_game_1">
                    <p>
                        Yes
                    </p>
                </button>
                <button onClick={()=> change_pausegame_value(0)} id="pause_game_0">
                    <p>
                        No
                    </p>
                </button>
            </div>
            <div id="other_tools">
                <p id="other_tools_p">
                    Other Tools:
                </p>
                <button onClick={()=> change_other_tools_value(0)} id="other_tools_0">
                    <p>
                        Bot
                    </p>
                </button>
                <button onClick={()=> change_other_tools_value(1)} id="other_tools_1">
                    <p>
                       2P
                    </p>
                </button>
            </div>
                <button onClick={() => {is_Online_mod(socket,router)}} id="play">
                    <p>
                        Play
                    </p>
                </button>
            </div>
    );
}
export default PingPongSettings;
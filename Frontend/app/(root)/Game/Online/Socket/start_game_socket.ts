import { io } from 'socket.io-client';
export const player1 = io('http://10.12.3.7:1340', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
export const player2 = io('http://10.12.3.7:1341', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
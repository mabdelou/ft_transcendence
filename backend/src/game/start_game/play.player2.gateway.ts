/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   play.player2.gateway.ts                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:06 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/05 13:53:12 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { GameObj } from './play.ball.gateway';
  export let Player2ID: string = '',speed2: number = 0,points2: number = 0,enemyusername:string = '';;
  let none: Socket;
  @WebSocketGateway(1341, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer2Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket, data): void {
      Player2ID = client.id;
      speed2 = data.Speed1;
      points2 = data.Points1;
      enemyusername = data.myusername1;
      console.log(data);
      console.log('Player2Arr_content: ', Player2ID);
    }
    @SubscribeMessage('send_player2_data')
    handleSendUser2Data(client: Socket, data: number): void {
        for(let a = 0 ; a<GameObj.length; a++ )
        {
          if(GameObj[a].PlayersInfo.Player2ID === client.id)
          {
            if(GameObj[a].PlayersInfo.Player2Client === undefined)
              GameObj[a].PlayersInfo.Player2Client = client;
            GameObj[a].RacketsInfo.Racket1Ypos = data;
            if(GameObj[a].PlayersInfo.Player1Client != undefined)
              GameObj[a].PlayersInfo.Player1Client.emit('send_player1_data', data);
          }
        }
      }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
      for(let a = 0 ; a<GameObj.length; a++ )
      {
        if(GameObj[a].PlayersInfo.Player2ID === client.id)
        {
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player1ID = '';
          GameObj[a].PlayersInfo.Player2ID = '';
          Player2ID = '';
        }
      }
  }
  handleDisconnect(client: Socket): void {
      for(let a = 0 ; a<GameObj.length; a++ )
      {
        if(GameObj[a].PlayersInfo.Player2ID === client.id)
        {
          GameObj[a].RoomInfo.GameStatus = 0;
          GameObj[a].PlayersInfo.Player1ID = '';
          GameObj[a].PlayersInfo.Player2ID = '';
          Player2ID = '';
        }
      }
    }
}
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayDisconnect,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket, Server } from 'socket.io';
  import { OBJ } from '../game_brain/logic/game_server_class';
  export let Player1ID: string = '';
  let none:Socket;
  @WebSocketGateway(1340, {
    cors: { origin: '*', credentials: true },
  })
  export class PlayPlayer1Gateway implements OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    @SubscribeMessage('first_conection')
    handleFirst_conct(client: Socket): void {
        Player1ID = client.id;
      console.log('Player1Arr_content: ', Player1ID);
    }
    @SubscribeMessage('send_player1_data')
    handleSendUser1Data(client: Socket, data: number): void {
      if(OBJ.GameHead)
      {
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        {
          if(OBJ.GameHead[a].Player1ID === client.id)
          {
            if(OBJ.GameHead[a].Player1Client === undefined)
              OBJ.GameHead[a].Player1Client = client;
            OBJ.GameHead[a].Racket2Ypos = data;
            if(OBJ.GameHead[a].Player2Client != undefined)
              OBJ.GameHead[a].Player2Client.emit('send_player2_data', data);
          }
        }
    }
  }
	@SubscribeMessage('conection_closed')
	handleconection_closed(client: Socket): void {
    if(OBJ.GameHead)
      for(let a = 0 ; a<OBJ.GameHead.length; a++ )
        if(OBJ.GameHead[a].Player1ID === client.id)
          OBJ.GameHead[a].GameStatus = 0;
    OBJ.GameHead.filter((obj) => obj.Player1ID !== Player1ID);
  }
    handleDisconnect(client: Socket): void {
      if(OBJ.GameHead)
        for(let a = 0 ; a<OBJ.GameHead.length; a++ )
          if(OBJ.GameHead[a].Player1ID === client.id)
            OBJ.GameHead[a].GameStatus = 0;
      OBJ.GameHead.filter((obj) => obj.Player1ID !== Player1ID);
    }
  }
  

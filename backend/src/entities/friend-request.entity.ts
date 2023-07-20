import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { FriendRequest_Status } from "./friend-request.interface";

@Entity()
export class FriendRequest{

    @PrimaryGeneratedColumn()
    id:number;


    
    @ManyToOne(() => User, (user) => user.sentFriendRequest)
    creator: User;


    @ManyToOne(() => User, (user) => user.receivedFriendRequest)
    receiver: User;


    @Column()
    status:FriendRequest_Status;

}
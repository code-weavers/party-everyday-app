import { IUser } from "./user.interface";

export interface IGuest {
   user: IUser;
   selected: boolean;
}
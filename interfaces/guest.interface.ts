import { IUser } from "./user.interface";

export interface IGuest {
   id?: string;
   user: IUser;
   selected?: boolean;
   status?: string
}

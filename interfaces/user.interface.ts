import { IFile } from "./file.interface";

export interface IUser {
   id: string;
   username: string;
   email: string;
   telephoneNumber?: string;
   billingAccountKey?: string;
   pushNotificationToken?: string;
   file?: IFile;
}

export interface IAuthCredentials {
   email: string;
   password: string;
}

export interface IUserLoginResponse {
   id: string;
   username: string;
   email: string;
   telephoneNumber?: string;
   billingAccountKey?: string;
   pushNotificationToken?: string;
   file: IFile;
   accessToken: string;
}

export interface IUserSignupResponse {
   id: string;
   email: string;
   username: string;
   telephoneNumber: string;
   file: IFile;
   password: string;
   accessToken: string;
}
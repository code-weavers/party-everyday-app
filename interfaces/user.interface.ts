import { IBankInfo } from "./bank.interface";
import { IFile } from "./file.interface";

export interface IUser {
   id: string;
   username: string;
   email: string;
   phoneNumber?: string;
   file: IFile;
   bankInfo?: IBankInfo
}

export interface IAuthCredentials {
   email: string;
   password: string;
}

export interface IUserLoginResponse {
   id: string;
   username: string;
   email: string;
   file: IFile;
   accessToken: string;
}

export interface IUserSignupResponse {
   id: string;
   email: string;
   username: string;
   file: IFile;
   password: string;
   accessToken: string;
}
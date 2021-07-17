
import { User } from './user';
import { ApplicationProfile } from './application-profile';
export interface WebResponse {
    user:User |undefined;
    applicationProfile:ApplicationProfile|undefined;
    code:string;
    message:string;
    requestId:string|undefined;
}

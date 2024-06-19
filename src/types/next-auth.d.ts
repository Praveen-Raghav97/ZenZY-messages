import  "next-auth";
import { DefaultSession } from "next-auth";


declare module 'next-auth' {

    interface Session{
        user:{
       _id?:string;
       isVarified?:boolean;
       isAcceptingMessage?:boolean;
       username?:string; 
    

        } & DefaultSession['user'];
    }

    interface User{
       _id:string,
       isVarified:boolean,
       isAcceptingMessage? :boolean,
       username?:string

    }
}
    

declare module 'next-auth/jwt' {
    interface JWT {
        _id?:string;
        isVarified?:boolean;
        isAcceptingMessage? :boolean;
        username?:string;
}
}

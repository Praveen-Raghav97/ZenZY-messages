import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                username: { label: "Email", type: "email " },
                password: { label: "Password", type: "password" },
              },
              async authorize (credentials:any ):Promise<any>{
                  await dbConnect()
                  try {
                 const user =   await UserModel.findOne({
                    $or:[
                          {email:credentials.identifier},
                          {username:credentials.identifier},
                          {},

                          
                    ]
                 });
                 if (!user) {
                   throw new Error( "User Not Found This Email") 
                 } 
                 if(!user.isVarified){
                    throw new Error('Please Varified Your  Account First ,Before Login')
                 }
                const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
                   if(isPasswordCorrect){
                    return user;
                   }else{
                    throw new Error ("Password Is Not Correct")
                   }

                  } catch (err:any) {
                    throw new Error(err);
                  }
              }
            }),
        
    ],
    callbacks: {
        
        async jwt({user, token }) {
         
          if (user) {
              token.id = user._id?.toString()
              token.isVarified = user.isVarified;
              token.isAcceptingMessage = user.isAcceptingMessage;
              token.username = user.username
          
          }
               return token
        },
        async session({ session, token }) {
            if (token) {
              session.user._id = token._id;
              session.user.isVarified = token.isVarified;
              session.user.isAcceptingMessage= token.isAcceptingMessage;
              session.user.username = token.username;
            }
            return session;
          },
    
    },
    pages:{
        signIn: '/sign-in',
    },
    session:{
     strategy:"jwt"
    },

    secret:process.env.NEXTAUTH_SECRET,


}

'use client' ;
import { zodResolver } from "@hookform/resolvers/zod"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue,useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { Router } from "next/router"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios ,{AxiosError} from 'axios'
import { ApiResponse } from "@/types/apiResponse"
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import {
   Form,FormField,
  FormItem,FormLabel,
  FormDescription,FormControl,
  FormMessage } 
  from "@/components/ui/form"
import { Button } from "@/components/ui/button";


 const   page = () => {
  const [userName , setUserName] = useState('');
  const [usernameMessage , setUsernameMessage] = useState('');
  const [isChekingUsername , setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced= useDebounceCallback(setUserName ,300)
  const { toast } = useToast();
  const router = useRouter()


  //Zod Implementation 
  const form = useForm <z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })

  useEffect (() => {

    const checkUserNameUnique = async () => {
      if (userName) {
        setIsCheckingUsername(true)
        setUsernameMessage('');
        try {
       const response =   await axios.get<ApiResponse>
       (`/api/check-username-unique?username=${userName}`);
       console.log(response.data.message)
       setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
           setUsernameMessage(
            axiosError.response?.data.message ?? "Error Cheking Username Unique"
           )
        }
        finally{
          setIsCheckingUsername(false);
        }
      }
    }
            checkUserNameUnique();
  },[userName]);
     
 
  //Submit Method

  const onSubmit = async(data: z.infer<typeof signUpSchema>) =>{
    setIsSubmitting(true);
    try {
  const response =    await axios.post<ApiResponse>('/api/sign-up' ,data)
      toast(
        {
          title:'Success',
          description:response.data.message

        }
      )
      router.replace(`/verify/${userName}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error('Error During Sign-Up:', error);
             
      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      ('There Was A Problem With Your SignUp , Please Try Again')

      toast({
        title:'Sign Up Faild',
        description:errorMessage,
        variant:'destructive'
      });

      setIsSubmitting(false);
    }
  };
  

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      
       <div className="w-md max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
       <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join ZenZY
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         
         <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              
                <Input type="text" placeholder="username" {...field}  
                onChange={(e)=>{
                  field.onChange(e)
                  debounced
                  (e.target.value)
                }}
                />
                {isChekingUsername && <Loader2 className="animate-spin" />}
                 
                    <p
                      className={`text-sm ${
                        usernameMessage === 'Username is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                     {usernameMessage}
                    </p>
                  
              
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
             
                <Input type="email" placeholder="email" {...field}  />
                <p className=' text-xs text-gray-900 text-sm'>We will send you a verification code</p>
              
             
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              
                <Input type="password" placeholder="password" {...field}  />
              
              <FormMessage />
            </FormItem>
          )}
        />
          
        <Button type="submit" disabled ={isSubmitting} >
          {
            isSubmitting ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
               Please wait...
              </>
            ) : ('SignUP')
          }
        </Button>
         </form>  
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign In
            </Link>
          </p>
        </div>
        </div>
    </div>
  )
}
export default page
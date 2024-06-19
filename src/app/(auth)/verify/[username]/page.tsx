'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/schemas/signUpSchema';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { title } from 'process';
import { Description } from '@radix-ui/react-toast';
import { ApiResponse } from '@/types/apiResponse';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const VerifyAccount = () => {

    const router = useRouter();
    const params = useParams <{username :string }>()
    const {toast} = useToast()


     //Zod Implementation 
  const form = useForm <z.infer<typeof verifySchema>>({
    resolver:zodResolver(verifySchema),

  })

  const OnSubmit = async (data:z.infer<typeof  verifySchema>) => {
        
    try {
     const response = await axios.post(`/api/verify-code` , {
           username:params.username,
           code: data.code

        })
       
        toast({
                title:'Success',
                 description :response.data.message
        })

       router.replace('/sign -in')


    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        let errorMessage = axiosError.response?.data.message;
    
  
        toast({
          title:'Verify Faild',
          description:errorMessage,
          variant:'destructive'
        });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify True Feedback
          </h1>
          <p className="mb-4">Verify password  send on your email</p>
        </div>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6">
        <FormField
        name ="code"
          control={form.control}
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
            <Input placeholder="shadcn" {...field} />
             </FormItem>
            
          )}
        />
        <Button type="submit">Verify</Button>
      </form>
    </Form>

      </div>
    </div>
  )
}

export default VerifyAccount

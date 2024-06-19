import { Content } from 'next/font/google';
import { z } from 'zod'

export const messageSchema = z.object({
  Content:z
  .string()
  .min(10 ,'Content must be at least 10 charactres')
  .max(300 , 'Content must be no longer 300 characters')

});

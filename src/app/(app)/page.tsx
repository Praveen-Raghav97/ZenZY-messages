"use client"
import Image from "next/image";
import * as React from "react"
 import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import messages from '@/message.json'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center  md:px-24 py-12 h-screen bg-slate-900 text-white">
    <section className="text-center mb:mb-12">
      <h1 className="text-3xl md:text-5xl font-bold"> Dive into the World of Anonymous Conversations </h1>
      <p className=" mt-3  md:mt-4  text-base  md:text-lg mb-4">Explore Mystery Message - Where Your identity remains a secret.</p>
    </section>
    <Carousel 
      plugins={[Autoplay({ delay: 2000 })]}
    className="w-full max-w-xs md:max-w-2xl rounded-xl  ">
      <CarouselContent className="" >
      {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4  bg-slate-200  ">
                <Card>
                  <CardHeader className="bg-slate-200">
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4 bg-slate-200">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious className="text-black hidden" />
      <CarouselNext className="text-black hidden" />
    </Carousel>

    </main>
     {/* Footer */}
     <footer className="text-center p-4 md:p-6 text-gray-900 bg-gray-100">
     © 2024 ZenZY Feedback. All rights reserved.
   </footer>
   </>
  );
}
 
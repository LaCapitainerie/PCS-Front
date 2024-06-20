"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Property } from "@/type/Property"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCarouselPlugin() {

  return (
    <Carousel
      className="w-full h-full"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="h-full">
        {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem className="h-full" key={index}>
              <div className="p-1">
                <Skeleton className="w-full h-[400px] rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"/>
              </div>
            </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

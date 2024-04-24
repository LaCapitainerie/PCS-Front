"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Photos } from "../../../customclass"

export function CarouselPlugin({ images }: { images: Photos[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true})
  )
  

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="h-full">
        {images.map((photo, index) => (
          <CarouselItem className="h-full" key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-0">
                    <img
                        src={photo.Image}
                        alt={`Random Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg max-h-96"
                    />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

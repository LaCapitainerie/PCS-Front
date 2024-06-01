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

export function CarouselPlugin({ images }: { images: Property["images"]}) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true})
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
        {(images?.length > 0 ? images : ["void.null"])?.map((photo, index) => (
          
          <CarouselItem className="h-full" key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-0">
                    <img
                        src={photo}
                        onError={(e) => { e.currentTarget.src = "https://i.imgur.com/1kH8tiQ.png" }}
                        alt={`Random Image ${index + 1}`}
                        className="rounded-lg"
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

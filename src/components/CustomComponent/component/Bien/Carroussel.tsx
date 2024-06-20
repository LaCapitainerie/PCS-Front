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
          photo !== "void.null" ? (
            <CarouselItem className="h-full" key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-0 overflow-hidden " style={{maxHeight: '400px'}}>
                      <img
                          src={photo !== "void.null" ? photo : "https://i.imgur.com/1kH8tiQ.png"}
                          onError={(e) => { e.currentTarget.src = "https://i.imgur.com/1kH8tiQ.png" }}
                          alt={`Random Image ${index + 1}`}
                          className="rounded-lg"
                          height="400px"
                      />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ) : null
        ))}
      </CarouselContent>
    </Carousel>
  )
}

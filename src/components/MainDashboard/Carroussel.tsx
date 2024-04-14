"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true})
  )
  const links = [
    "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933a.jpg",
    "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933b.jpg",
    "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933c.jpg",
    "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933d.jpg",
    "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933e.jpg",
  ]

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
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem className="h-full" key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-0">
                    <img
                        src={links[index]}
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

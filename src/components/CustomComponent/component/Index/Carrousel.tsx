import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function CarouselSize() {

    const Images = [
        {
            "url": "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933a.jpg"
        },
        {
            "url": "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933b.jpg"
        },
        {
            "url": "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933c.jpg"
        },
        {
            "url": "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933d.jpg"
        },
        {
            "url": "https://media.immo-facile.com/office10/stepha_2104210854/catalog/images/pr_p/4/5/7/2/9/3/3/4572933e.jpg"
        }
    ]

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true})
    )

    return (
        <div className="flex justify-center">
            <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                }}
                className="w-full max-w-7xl"
            >
                <CarouselContent className="">
                    {Images.map((image, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <img src={image.url} alt="carousel image" className="w-full h-full object-cover" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext/>
                <CarouselPrevious/>
            </Carousel>
        </div>
    )
}
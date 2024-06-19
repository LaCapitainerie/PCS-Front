import React, { ReactNode } from 'react';
import SkeletonSidebar from '@/components/Sidebar/loading';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';


interface LayoutProps {
    children?: ReactNode;
}

const LoadingProfilLayout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <SkeletonSidebar/>

            <div className="flex flex-col w-full h-full overflow-hidden" style={{paddingLeft: '3.5rem'}}>
                <div className="flex flex-col w-full" style={{ height: '33%' }}>
                    <div className="bg-muted" style={{ height: '66%' }}>

                    </div>
                    <div className="" style={{ height: '33%' }}>
                        <div className="flex justify-center items-center h-full">
                            <div className="w-full flex flex-row gap-4" style={{ paddingLeft: '10%' }}>
                                <Skeleton className="w-24 h-24 rounded-full" />

                                <div className="flex flex-col gap-2 py-4">
                                    <h1 className="text-3xl font-bold">
                                        <Skeleton className="w-40 h-6" />
                                    </h1>
                                    <p className="text-lg">
                                        <Skeleton className="w-60 h-4" />
                                    </p>
                                </div>

                                <div className="flex flex-col p-4 gap-2" style={{ marginLeft: '10%' }}>
                                    <div className="flex flex-row gap-4 text-center items-center">
                                        <Mail />
                                        <p className="text-sm">
                                            <Skeleton className="w-24 h-4" />
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-4 text-center items-center">
                                        <Phone />
                                        <p className="text-sm">
                                            <Skeleton className="w-24 h-4" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator/>


                <div className="flex flex-row justify-around w-full p-4" style={{height: '66%'}}>
                    <div className="flex flex-col w-full justify-between gap-8 p-4">
                        <div className="flex flex-col gap-2 border rounded-lg w-full h-full p-4">
                            <h1 className="text-2xl font-bold">
                                Présentation
                            </h1>
                            <div className="w-full h-full">
                                <Skeleton className="w-full h-full" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 border rounded-lg w-full h-full p-4">
                            <h1 className="text-2xl font-bold">
                                Contact
                            </h1>
                            <div className="w-full h-full">
                                <Skeleton className="w-full h-full" />
                            </div>
                        </div>
                    </div>

                    <div className='h-full w-full'>
                        {
                            <Carousel
                            className="w-full h-full"
                            opts={{
                            align: "start",
                            }}
                        >
                            <CarouselContent className="h-full">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <CarouselItem className="h-full" key={index}>
                                    <div className="p-1 h-full">
                                        <Skeleton className="h-full w-full rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"/>
                                    </div>
                                </CarouselItem>
                            ))}
                            </CarouselContent>
                        </Carousel>
                        }
                    </div>
                </div>


            </div>
        </>
    );
}

export default LoadingProfilLayout;
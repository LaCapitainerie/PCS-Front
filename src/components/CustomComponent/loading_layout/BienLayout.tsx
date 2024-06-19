import React, { ReactNode } from 'react';

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import SkeletonSidebar from '@/components/Sidebar/loading';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingCarouselPlugin } from '../component/Bien/LoadingCarrousel';
import Title from '@/components/ui/title';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface LayoutProps {
    children: ReactNode;
}

const Loading_Bien_Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <SkeletonSidebar/>

            <div className="fixed inset-y-0 left-[3.5rem] z-0 w-[30%] flex-col border-r bg-background sm:flex">
                <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">Biens Immobiliers</a>

                <Separator className="my-2" />

                <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Skeleton className="w-full h-10 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"/>
                </div>

                <div className="flex flex-col gap-2 p-4 pt-0 overflow-y-hidden">
                    {Array.from({ length: 5 }).map(() =>
                        <Skeleton className="w-full h-20 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"/>
                    )}
                </div>
            </div>

            

            <div className="absolute right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%]">
                <main className="w-full h-full flex flex-col">

                    <LoadingCarouselPlugin/>

                    <div className="p-1 flex flex-row gap-2">
                        <Card className="w-full">
                            <CardHeader>
                                <div className="flex flex-row justify-between">
                                    <CardTitle className="">Details du bien</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-4">

                                <div className="grid max-h-64 gap-2" style={{
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gridTemplateRows: '1fr 1fr 1fr',
                                    gridTemplateAreas: `
                                    ". . ."
                                    ". . ."
                                    ". . ."
                                    `
                                }}>

                                {Array.from({ length: 9}).map((key, index) => (
                                    <div key={index} className="mb-4 pb-4 last:mb-0 last:pb-0" >
                                    <div className="w-full">
                                        <Skeleton className="w-full h-8 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"/>
                                    </div>
                                    </div>
                                ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                            </CardFooter>
                        </Card>

                        <Card className="w-full flex flex-col justify-between">
                            <div>
                                <CardHeader>
                                    <div className="flex flex-row justify-between">
                                        <CardTitle className="">Prestataires associés</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="grid gap-4">

                                    <div className="grid max-h-64 gap-2" style={{
                                        gridTemplateColumns: 'repeat(5, 1fr)',
                                        gridTemplateRows: 'repeat(3, 1fr)',
                                        gridRowGap: '2rem',
                                        gridTemplateAreas: `
                                        ". . . . ."
                                        ". . . . ."
                                        ". . . . ."
                                        `
                                    }}>
                                        {Array.from({ length: 15 }).map((presta, index) => (
                                            <Skeleton className="w-9 h-9 rounded-full" />
                                        ))}
                                    </div>
                                </CardContent>
                            </div>
                            <CardFooter className="">
                            </CardFooter>
                            </Card>

                    </div>
                    <div className="p-1">
                        <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2" style={{height: '400px'}}>
                            <Title titre="Réservations" sous_titre=""/>
                            <div className="flex flex-col justify-around gap-2 h-full">
                                <Skeleton className="w-full h-full rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"/>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

        </>
    );
}

export default Loading_Bien_Layout;
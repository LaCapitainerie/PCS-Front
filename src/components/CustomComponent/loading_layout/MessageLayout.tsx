import SkeletonSidebar from "@/components/Sidebar/loading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Loading_Message_Layout: React.FC<LayoutProps> = () => {

    return (
        <>
            <SkeletonSidebar/>

            <div className="fixed inset-y-0 left-[3.5rem] z-0 hidden w-[30%] flex-col border-r bg-background sm:flex">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">Messages</a>

            <Separator className="my-2" />

            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Skeleton className="w-full h-10 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"/>
            </div>

            <div className="flex flex-col gap-2 p-4 pt-0">
                <div>
                    {Array.from({ length: 5 }).map((value, index) =>
                        <button key={index} className="flex flex-col w-full my-4 items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex flex-row items-center gap-2">
                                        <Skeleton className="w-20 h-5"/>
                                    </div>
                                </div>
                                <Skeleton className="w-10 h-3"/>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                <Skeleton className="w-20 h-3"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground shadow hover:bg-primary/80">
                                    <Skeleton className="w-10 h-3"/>
                                </div>
                                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    <Skeleton className="w-10 h-3"/>
                                </div>
                            </div>
                        </button>
                    )}
                </div>
            </div>
            
        </div>

        <div className="absolute right-0 flex flex-col left-[calc(3.5rem+30%)] w-auto h-full">

            <div className="m-2">
                <Skeleton className="py-2 w-1/3 h-10 px-4"/>
            </div>
            
            <Separator className="my-2" />

            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-2 p-4 pt-0">
                    {Array.from({ length: 5 }).map((_, index) => 
                        <div key={index} className={`flex ${index%2?"justify-end":""}`}>
                            {
                                <div style={{ maxWidth: '40%' }} className={`flex flex-col w-fit items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all ${index%2?"bg-accent":""}`}>
                                    <div className="flex w-full flex-col gap-1">
                                        <Skeleton className="w-20 h-3"/>
                                    </div>
                                    <Skeleton className="w-40 h-6"/>
                                </div>
                            }
                        </div>
                    )}
                </div>

                <div className="flex flex-row p-4 gap-4">
                <Skeleton className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold"/>
                </div>
            </div>

        </div>

        
        </>
    );
}

export default Loading_Message_Layout;
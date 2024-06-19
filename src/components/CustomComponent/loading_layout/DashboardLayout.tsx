import SkeletonSidebar from "@/components/Sidebar/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashBoardProps {
    children?: ReactNode;
}

const Loading_Dashboard_Layout: React.FC<DashBoardProps> = () => {

    return (
        <>
            <SkeletonSidebar/>
            
            <div className="flex min-h-screen h-full w-full flex-col left-[3.5rem]" style={{paddingLeft: '3.5rem'}}>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    
                    <div className={`grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5`}>
                        {
                            Array.from({ length: 3 }).map((_, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            <Skeleton className="w-24 h-4" />
                                        </CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            <Skeleton className="w-24 h-6" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>

                    <div className="flex flex-row gap-4 justify-between h-20 w-fit">
                        <Skeleton className="w-24 h-6" />
                        <Skeleton className="w-24 h-6" />
                        <Skeleton className="w-24 h-6" />
                    </div>
                    
                    <div className={`h-full w-full`}>
                    
                        <Skeleton className="w-full h-full" />

                    </div>

                </main>
                </div>
        </>
    );
}

export default Loading_Dashboard_Layout;
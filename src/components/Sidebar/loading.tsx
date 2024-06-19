import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const SkeletonSidebar = () => {

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav key={0} className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <Skeleton className="w-9 h-9 rounded-full" />

                <Separator className="my-2" />

                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="w-9 h-9 rounded-full" />
                ))}
            </nav>
            <nav key={1} className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">

                <Skeleton className="w-9 h-9 rounded-full" />
            </nav>
        </aside>
    )
}

export default SkeletonSidebar;
import * as React from "react"
import DemoPage from "../MainDashboard/Finaltable";

const MainContent = () => {

    return (
        <div className="fixed flex flex-col left-[calc(3.5rem+30%)] w-full sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <DemoPage />
            </main>
        </div>
    )
};


export default MainContent;
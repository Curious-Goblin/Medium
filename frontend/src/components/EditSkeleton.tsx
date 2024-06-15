export const EditSkeleton=()=>{
    return (
        <div role="status" className="animate-pulse">
            <div>
            <div className="flex justify-center pt-5 w-full">
                <div className="max-w-screen-lg w-full px-5">
                    <div className="w-full h-10 mb-2 focus:outline-none bg-gray-200 rounded-lg p-2.5"/>
                    <div className="w-full h-44 mb-2 focus:outline-none bg-gray-200 rounded-lg p-2.5"/>
                    <div className="h-8 w-28 mt-5 w-16 bg-gray-200 rounded-xl mb-2.5"></div>
                </div>
            </div>
        </div>
        </div>
    )
}

export const FullBlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse">

            <div>
                <div className="flex justify-center pt-4 md:pt-12">
                    <div className="md:grid grid-cols-12 px-10 w-full max-w-screen-xl">
                        <div className="md:hidden pb-4">
                            <div className="text-xl text-slate-800 font-semibold">
                                <div className="h-6 bg-gray-200 rounded-lg w-16 mb-2.5 ml-2"></div>
                            </div>
                            <div className="flex pt-6">
                                <div className="flex justify-center flex-col">
                                    <div className="h-6 w-6 bg-gray-200 rounded-full mb-4 mr-2"></div>
                                </div>
                                <div className="pl-4 ">
                                    <div className="text-lg font-bold">
                                        <div className="h-6 bg-gray-200 rounded-lg w-36 mb-2.5 ml-2"></div>

                                    </div>
                                    <div className="text-lg pt-2 font-light text-gray-600">
                                        <div className="h-4 bg-gray-200 rounded-lg w-48 mb-2.5 ml-2"></div>
                                        <div className="h-4 bg-gray-200 rounded-lg w-48 mb-2.5 ml-2"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-8">
                            <div className="text-4xl font-extrabold">
                                <div className="h-10 bg-gray-200 rounded-md mb-2.5"></div>
                            </div>
                            <div className="text-slate-400 pt-2">
                                <div className="h-6 bg-gray-200 rounded-lg w-36 mb-2.5 ml-2"></div>
                            </div>
                            <div className="text-lg pt-4 font-light text-slate-600">
                                <div className="h-96 bg-gray-200 rounded mb-2.5"></div>
                            </div>
                        </div>
                        <div className="hidden md:block col-span-4 pl-16">
                            <div className="text-xl text-slate-800 font-semibold">
                                <div className="h-6 bg-gray-200 rounded-lg w-16 mb-2.5 ml-2"></div>
                            </div>
                            <div className="flex pt-6">
                                <div className="flex justify-center flex-col">
                                    <div className="h-6 w-6 bg-gray-200 rounded-full mb-4 mr-2"></div>
                                </div>
                                <div className="pl-4 ">
                                    <div className="text-3xl font-bold">
                                        <div className="h-6 bg-gray-200 rounded-lg w-36 mb-2.5 ml-2"></div>

                                    </div>
                                    <div className="text-lg pt-2 font-light text-gray-600">
                                        <div className="h-4 bg-gray-200 rounded-lg w-48 mb-2.5 ml-2"></div>
                                        <div className="h-4 bg-gray-200 rounded-lg w-48 mb-2.5 ml-2"></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
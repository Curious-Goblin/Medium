interface Blog {
    title: string,
    content: string,
    id?: string,
    author: {
        name: string
    }
}

export const FullBlog = ( blog : Blog) => {
    return (
        <div className="grid grid-cols-12 px-10 w-full">
            <div className="grid-cols-8">
                {blog.title}
            </div>
            <div className="grid-cols-4">
                {/* {blog.author.name} */}
            </div>
        </div>
    )
}

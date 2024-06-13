interface BlogCardProps {
    author: {
        name: string
    };
    title: string;
    content: string;
    id: string;
}

export const FullBlog = ({ blog }: BlogCardProps) => {
    return (
        <div className="grid grid-cols-12 px-10 w-full">
            <div className="grid-cols-8">
                {blog.title}
            </div>
            <div className="grid-cols-4">
                {blog.author.name}
            </div>
        </div>
    )
}
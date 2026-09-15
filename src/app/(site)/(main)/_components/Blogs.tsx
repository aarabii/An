import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container, Title } from "@/components/common";
import { BlogCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { getFeaturedBlogs } from "@/sanity/lib/queries";

const Blogs = async () => {
    const blogs = await getFeaturedBlogs();

    if (!blogs || blogs.length === 0) {
        return null;
    }

    return (
        <>
            <Container id="blogs">
                <Title heading="Blogs">
                    <Button
                        nativeButton={false}
                        variant="outline"
                        size="sm"
                        className="group p-2"
                        render={
                            <Link
                                className="flex items-center gap-1"
                                href="/blogs"
                            />
                        }
                    >
                        View all blogs
                        <ArrowUpRight
                            data-icon="inline-end"
                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Button>
                </Title>

                <div className="grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-2">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            </Container>
            <RepeatSeparator />
        </>
    );
};

export default Blogs;

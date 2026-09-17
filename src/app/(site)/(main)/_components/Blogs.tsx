import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container, Title } from "@/components/common";
import { BlogCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { getFeaturedBlogs } from "@/sanity/lib/queries";

const Blogs = async () => {
  const blogs = await getFeaturedBlogs();

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <Container id="blogs">
      <Title heading="Things I've written">
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          render={<Link className="flex items-center gap-1.5" href="/blogs" />}
        >
          View all blogs
          <ArrowUpRight data-icon="inline-end" className="size-4 shrink-0" />
        </Button>
      </Title>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </Container>
  );
};

export default Blogs;

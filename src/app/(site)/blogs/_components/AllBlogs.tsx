import { Container, Title } from "@/components/common";
import { BlogCard } from "@/components/cards";
import type { BlogPost } from "@/types/blog";

interface AllBlogsProps {
  blogs: BlogPost[];
}

const AllBlogs: React.FC<AllBlogsProps> = ({ blogs }) => {
  return (
    <Container id="all-blogs">
      <Title heading="All Blogs" />

      {blogs.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center p-8 sm:p-12">
          <p className="font-mono text-sm text-muted-foreground">
            No blog available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-5 sm:gap-6 sm:p-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default AllBlogs;

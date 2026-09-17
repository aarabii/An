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
        <div className="flex min-h-48 items-center justify-center py-12 text-center">
          <p className="font-para text-sm text-muted-foreground">
            No blogs available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default AllBlogs;

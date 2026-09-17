import { getProjectNav, getBlogNav } from "@/constant/navigation";
import NavbarClient from "./NavbarClient";

export const Navbar = async () => {
  const [projectNav, blogNav] = await Promise.all([
    getProjectNav(),
    getBlogNav(),
  ]);

  return <NavbarClient projectNav={projectNav} blogNav={blogNav} />;
};

export default Navbar;

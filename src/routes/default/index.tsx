
import { BlogDetails } from "./Details";
import { Home } from "./home";
import { Login } from "./LogIn";
import { New_Blogs } from "./NewBlog";
import { Register_Confirmation_Page } from "./RegisterConfirmationPage";
import { registration } from "./Registration";
import { shoes } from "./Shoes";
import { UsedBlogs } from "./UsedBlog";

export const Default_Routes = [
  ...New_Blogs,
  ...Login,
  ...Home,
  ...BlogDetails,
  ...Register_Confirmation_Page,
  ...registration,
  ...shoes,
  ...UsedBlogs
];
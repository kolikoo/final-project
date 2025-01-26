import { Addblog } from "./AddBlog";
import { Blog_Edit_Page } from "./BlogEditPage";
import { Checkout_View } from "./CheckoutView";
import { Profile } from "./profile";
import { Profile_Details_Edit } from "./profileDetailsEdit";

export const Auth_Routes = [
  ...Addblog,
  ...Checkout_View,
  ...Profile,
  ...Blog_Edit_Page,
  ...Profile_Details_Edit,
];

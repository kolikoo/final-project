import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { HomeBlogStyles } from "../../../Pages/Home-Blog/home-blog-styles.tsx/home-blog-styles";
import { cn } from "../../../lib/utils";
import searchSvg from "../../../../src/images/search-svgrepo-com (2).svg"
import worldSvg from "../../../images/world-1-svgrepo-com.svg"
import { NavLink } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import sunImg from "../../../images/icons8-sun.svg"
import moonImg from "../../../images/icons8-moon-symbol-30.png";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../supabase/auth/index"
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";



const Header:React.FC=()=>{
   const { t } = useTranslation();

  const [user] = useAtom(userAtom);

  const {mutate:handlelogout}=useMutation({
    mutationKey:["logout"],
    mutationFn:logout
  })

 
 const handleChangeToggle = (value: string) => {
   const html = document.querySelector("html");
   const imgElement = document.querySelector(
     "#theme-toggle-img",
   ) as HTMLImageElement;

   if (value === "dark") {
     html?.classList.add("dark");
     if (imgElement) {
       imgElement.src = moonImg;
     }
   } else if (value === "light") {
     html?.classList.remove("dark");
     if (imgElement) {
       imgElement.src = sunImg;
     }
   }
 };


  const selectedImage = i18n.language === "ka" ? worldSvg : worldSvg;

const handleChangeLanguange = (lang: string) => {
  i18n.changeLanguage(lang);
};

return (
  <header className="m-auto h-[100px] w-[95%] dark:bg-black">
    <div className="header flex justify-between p-10">
      <div className={HomeBlogStyles({ background: "white", size: "big" })}>
        <NavLink to={"/"}>BitBlogs</NavLink>
      </div>

      <nav className="w-35">
        <ul className="flex space-x-6 dark:text-white">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <a href="">Write</a>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
        </ul>
      </nav>
      <div className="header-right-items flex w-[25%] justify-between dark:text-white">
        <p>
          <img className="w-10" src={searchSvg} alt="worldsvg" />
        </p>
        <Select defaultValue="light" onValueChange={handleChangeToggle}>
          <SelectTrigger className="text-yellow-300">
            <SelectValue placeholder={t("change Theme")}>
              <img
                className="w-10"
                id="theme-toggle-img"
                src={sunImg}
                alt="theme-toggle"
              />
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className={cn(
              "h-19 flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-bold ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            )}
          >
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="light" onValueChange={handleChangeLanguange}>
          <SelectTrigger className="selecttriger text-black">
            <SelectValue>
              <img className="w-10" src={selectedImage} alt="worldsvg" />
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            className={cn(
              "h-19 flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm font-bold ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
            )}
          >
            <SelectItem value="ka">
              <button onClick={() => handleChangeLanguange("ka")}>Geo</button>;
            </SelectItem>
            <SelectItem value="en">
              <button onClick={() => handleChangeLanguange("en")}>ENG</button>;
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-3">
          {user ? (
            <>
              <NavLink className="text-[10px]" to={"/profile"}>
                <div className="mt-1 h-10 rounded-[100%] bg-yellow-400 p-2 text-white dark:bg-blue-700 dark:text-black ">
                  <img
                    src="https://api.dicebear.com/9.x/avataaars/svg"
                    alt="avatar"
                  />
                  Profile
                </div>
              </NavLink>

              <div className="mt-1 h-10 rounded-[10px] bg-yellow-400 p-2 text-white dark:bg-blue-700 dark:text-white">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    handlelogout();
                  }}
                >
                  log out{" "}
                </span>
              </div>
            </>
          ) : (
            <NavLink
              className="rounded-[10px] bg-yellow-400 p-2 text-white dark:bg-blue-700 dark:text-white"
              to={"/LogIn"}
            >
              <button>{t("Home-Page.log in")}</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  </header>
);



}

export default Header;
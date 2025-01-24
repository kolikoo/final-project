import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { NavLink, useNavigate } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/supabase/auth/index";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import { useEffect, useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { supabase } from "@/supabase";


const HeaderRight:React.FC = () => {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);

  const { mutate: handlelogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
  const fetchFavoritesCount = async () => {
    const { count, error } = await supabase
      .from("favorites") // ცხრილის სახელი
      .select("*", { count: "exact" });

    if (error) {
      console.error("Error fetching favorites count:", error);
    } else {
      setFavoritesCount(count || 0);
    }
  };

  useEffect(() => {

    fetchFavoritesCount();

    const subscription = supabase
      .channel("realtime:favorites") 
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => {
          fetchFavoritesCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);


 

    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
      setIsDarkMode(!isDarkMode);
      const html = document.querySelector("html");
      if (isDarkMode) {
        html?.classList.remove("dark");
      } else {
        html?.classList.add("dark");
      }
    };

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

 const containerClassName = `header-right-items mb-4 flex text-black gap-3 ${
   user ? "justify-between" : "justify-center"
 } dark:text-white w-[30%] p-2 h-10 rounded-[25px] small:w-100`;
  
 const containerClassNameSecond = ` small: border-[1px] border-[#450920] dark:border-[#C4D7F2] rounded-[25px] flex ${user ? "w-[70%]" : "w-[40%] sm:w-[20%] extramedium:w-[60%]"} justify-center gap-5 h-10 p-1 @media-(min-width: 640px)-w-13 `;

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
   ;
  return (
    <>
      <div
        className={`${containerClassName} small:w-[100%] large:w-[90%] lg:w-[40%] `}
      >
        {user && (
          <div
            onClick={() => handleNavigate("/AddBlog")}
            className="w-[50%] bg-[#450920] dark:bg-[#C4D7F2] dark:text-black cursor-pointer align-middle h-10   rounded-[25px] pr-1 pl-8 pt-2 text-white  hover:scale-110 transition-transform duration-300 hover:bg-opacity-40
            
            small:w-[30%]
            small:text-center
            small:relative
            small:h-10
            small:pl-3
             small:pr-0
             large:w-[20%]
             lg:w-[30%]
             
            
            "
          >
            <p className=" small:text-[7px] mr-3 large:text-[10px] lg:text-[15px]">
              {t("Home-Page.Add List +")}
            </p>
          </div>
        )}

        <div
          className={`${containerClassNameSecond} small:w-[70%] large:w-[70%] lg:w-[50%]`}
        >
          <div
            className="relative"
            onClick={() => handleNavigate("/CheckoutView")}
          >
            <p
              className="small:text-[1px]"
              id="cart-icon"
              onClick={() => handleNavigate("/CheckoutView")}
            >
              <AddShoppingCartIcon className="text-[#450920] dark:text-white hover:scale-110 transition-transform duration-300 hover:text-black cursor-pointer" />
            </p>

            {favoritesCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-limited animate-bounce duration-2000">
                {favoritesCount}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 ">
            <div
              onClick={handleToggle}
              className={` w-10 h-6 flex items-center bg-gray-400 dark:bg-gray-800 rounded-full p-1 cursor-pointer transition-colors small:w-8 small:h-4 ${
                isDarkMode ? "justify-end" : "justify-start"
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-md small:w-3 small:h-3"></div>
            </div>
            <span className="text-gray-800 dark:text-white">
              {isDarkMode ? (
                <BedtimeIcon />
              ) : (
                <WbSunnyIcon className="text-yellow-500" />
              )}
            </span>
          </div>

          {/* Language toggle */}
          <Select defaultValue="light" onValueChange={handleChangeLanguage}>
            <SelectTrigger className="selecttriger text-black">
              <SelectValue>
                <LanguageIcon className="text-black dark:text-white" />
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-black text-white dark:bg-[#C4D7F2] dark:text-black mt-9 w-20 text-center p-2 border-white border-[1px] rounded-lg z-50">
              <SelectItem value="ka">
                <button onClick={() => handleChangeLanguage("ka")}>
                  {t("header.geo")}
                </button>
              </SelectItem>
              <SelectItem value="en">
                <button onClick={() => handleChangeLanguage("en")}>
                  {t("header.eng")}
                </button>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Profile and Logout */}
        <div className="flex gap-3">
          {user ? (
            <Popover>
              <PopoverTrigger>
                <div className="h-10 w-10 rounded-full bg-[#450920] text-black dark:bg-[#C4D7F2] dark:text-white flex justify-center items-center relative">
                  <img
                    src="https://api.dicebear.com/9.x/avataaars/svg"
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="bg-black text-white  dark:bg-zinc-700 dark:text-white mt-7 w-30 text-center p-2 border-[1px] rounded-[7px] z-50">
                <ul className="flex flex-col space-y-2">
                  <li>
                    <NavLink to="/profile">{t("header.Profile")}</NavLink>
                  </li>
                  <li>
                    <span
                      className="cursor-pointer text-red-600"
                      onClick={() => handlelogout()}
                    >
                      {t("header.logout")}
                    </span>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <NavLink
              className="rounded-[10px] h-10 p-2 w-18 bg-[#450920] text-white dark:bg-[#C4D7F2] dark:text-white"
              to={"/LogIn"}
            >
              <button>{t("Home-Page.log in")}</button>
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderRight;

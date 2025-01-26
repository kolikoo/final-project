import  { useState, useEffect } from "react";
import { supabase } from "@/supabase";
import { useTranslation } from "react-i18next";

interface Blog {
  title: string;
  price: number;
  currency: string;
  image_url: string;
}

interface FavoriteItem {
  blog_id: string;
  quantity: number;
  "blogs-list": Blog;
}

const CheckoutContent=()=>{

 const { t } = useTranslation();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const exchangeRate = 2.84;

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
        return;
      }
      if (data?.session?.user) {
        setUserId(data.session.user.id);
      } else {
        console.log("No user is logged in.");
      }
    };

    getUser();
  }, []);


  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        const { data, error } = await supabase
          .from("favorites")
          .select("blog_id, blogs-list(*)")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching favorites:", error.message);
          return;
        }

        setFavorites(data as unknown as FavoriteItem[]);
      };

      fetchFavorites();
    }
  }, [userId]);

  // Handle quantity change for a favorite item
  const handleQuantityChange = (id: string, delta: number) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.blog_id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item,
      ),
    );
  };

  // Calculate subtotal and total
  const subtotal = favorites.reduce(
    (sum, item) => sum + (item["blogs-list"].price || 0) * (item.quantity || 1),
    0,
  );

  const subtotalInUSD = subtotal / exchangeRate;

  const shipping = 20;
  const shippingInUSD = shipping / exchangeRate;

  const subtotalInGEL = subtotal.toFixed(2);
  const shippingInGEL = shipping.toFixed(2);

  const finalTotalInUSD = (subtotalInUSD + shippingInUSD).toFixed(2);
 return(
   <div className="w-[70%] m-auto flex flex-col gap-10 small:w-[150%] semismall:w-[130%] semimedium:w-[90%] xl:w-[70%] ">
      <h2 className="text-3xl mt-11 font-semibold mb-4 self-center">
        {t("Checkout.CheckoutView.checkYourCart")}
      </h2>

      <div className="flex gap-10">
        <div className="w-[60%]">
          <div className="flex flex-col gap-7">
            {favorites.map((item) => (
              <div
                key={item.blog_id}
                className="bg-white dark:bg-zinc-900 flex p-4 shadow-md rounded-xl"
              >
                <div className="w-[20%]">
                  <img
                    src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${item["blogs-list"].image_url}`}
                    alt={item["blogs-list"].title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-[60%] pl-4">
                  <h3 className="font-medium text-[23px]">
                    {item["blogs-list"].title}
                  </h3>
                  <p className="text-gray-600 text-[16px] dark:text-white">
                    {item["blogs-list"].price} {item["blogs-list"].currency}
                  </p>
                </div>
                <div className="w-[20%] flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.blog_id, -1)}
                    className="px-3 py-2 bg-black dark:bg-white hover:bg-gray-300"
                  >
                    <p className="dark:text-black text-white">-</p>
                  </button>
                  <span className="px-3">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.blog_id, 1)}
                    className="px-3 py-2 bg-black dark:bg-white hover:bg-gray-300"
                  >
                    <p className="text-white dark:text-black">+</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[40%] max-h-[350px] bg-gray-50 p-6 shadow-md dark:bg-zinc-900">
          <h3 className="text-lg font-semibold mb-4">
            {t("Checkout.CheckoutView.summary")}
          </h3>
          <div className="mb-4">
            <p className="flex justify-between">
              <span>{t("Checkout.CheckoutView.subtotal")}</span>
              <span>{subtotalInGEL} GEL</span>
            </p>
            <p className="flex justify-between">
              <span>{t("Checkout.CheckoutView.shipping")}</span>
              <span>{shippingInGEL} GEL</span>
            </p>
            <hr className="my-2" />

            <p className="flex justify-between font-bold">
              <span>{t("Checkout.CheckoutView.totalGEL")}</span>
              <span>{(subtotal + shipping).toFixed(2)} GEL</span>
            </p>
            <hr className="my-2" />

            <p className="flex justify-between font-bold">
              <span>{t("Checkout.CheckoutView.totalUSD")}</span>
              <span>{finalTotalInUSD} USD</span>
            </p>
          </div>
          <div>
            <button className="w-full bg-black dark:hover:bg-[#C4D7F2] text-white py-2 dark:text-black dark:bg-white">
              {t("Checkout.CheckoutView.checkOut")}
            </button>
          </div>
        </div>
      </div>
    </div>
 )
}
export default CheckoutContent
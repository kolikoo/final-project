import React, { useState, useEffect,} from "react";
import { supabase } from "@/supabase";
import { useTranslation } from "react-i18next";


const CheckoutView: React.FC = () => {

    const { t } = useTranslation();
  const [favorites, setFavorites] = useState<any[]>([]);
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

        setFavorites(data);
      };

      fetchFavorites();
    }
  }, [userId]);


  const handleQuantityChange = (id: string, delta: number) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.blog_id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  const subtotal = favorites.reduce(
    (sum, item) => sum + (item["blogs-list"].price || 0) * (item.quantity || 1),
    0
  );


  const subtotalInUSD = subtotal / exchangeRate;


  const shipping = 20; 
  const shippingInUSD = shipping / exchangeRate;


  const subtotalInGEL = subtotal.toFixed(2);
  const shippingInGEL = shipping.toFixed(2);


  const finalTotalInUSD = (subtotalInUSD + shippingInUSD).toFixed(2);

  return (
    <div className="w-[70%] m-auto flex flex-col gap-10">
      <h2 className="text-3xl mt-11 font-semibold mb-4 self-center">
        {t("Checkout.CheckoutView.checkYourCart")}
      </h2>

      <div className="flex gap-10">
        <div className="w-[60%]">
          <div className="flex flex-col gap-7">
            {favorites.map((item) => (
              <div key={item.blog_id} className="bg-white flex p-4 shadow-md">
                <div className="w-[20%]">
                  <img
                    src={`https://ezorpkouhvpeqvlzrolq.supabase.co/storage/v1/object/public/blog-images/${item["blogs-list"].image_url}`}
                    alt={item["blogs-list"].title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-[60%] pl-4">
                  <h3 className="font-medium">{item["blogs-list"].title}</h3>
                  <p className="text-gray-600">
                    {item["blogs-list"].price} {item["blogs-list"].currency}
                  </p>
                </div>
                <div className="w-[20%] flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.blog_id, -1)}
                    className="px-2 bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.blog_id, 1)}
                    className="px-2 bg-gray-200 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[40%] max-h-[350px] bg-gray-50 p-6 shadow-md">
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
            <button className="w-full bg-black text-white py-2">
              {t("Checkout.CheckoutView.checkOut")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;

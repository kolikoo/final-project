import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HomeKa from "./ka/pages/homeKa.json"
import HomeEn from "./en/pages/homeEn.json"
import LanguageDetector from "i18next-browser-languagedetector";
import LoginKa from "./ka/pages/LogInKa.json";
import LoginEN from "./en/pages/LogInEn.json";
import SignEn from "./en/pages/SignInEn.json"
import SignKa from "./ka/pages/SignInKa.json"
import headerKa from "./ka/pages/headerKa.json"
import headerEn from "./en/pages/headerEn.json";
import addblogKa from "./ka/pages/AddblogKa.json"
import addblogEn from "./en/pages/AddblogEn.json"
import ProfileInformationEn from "./en/pages/ProfileInformationEn.json"
import ProfileInformationKa from "@/i18n/ka/pages/ProfileInformationKa.json";
import CheckoutKa from "./ka/pages/CheckoutKa.json"
import CheckoutEn from "./en/pages/checkoutEn.json";


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["ka", "en"],
    resources: {
      ka: {
        translation: {
          "Home-Page": HomeKa,
          "LogIn-Page": LoginKa,
          "SignIn-Page": SignKa,
          "header": headerKa,
          "addBlog": addblogKa,
          "ProfileInformation": ProfileInformationKa,
          "Checkout":CheckoutKa
        },
      },

      en: {
        translation: {
          "Home-Page": HomeEn,
          "LogIn-Page": LoginEN,
          "SignIn-Page": SignEn,
          "header": headerEn,
          "addBlog": addblogEn,
          "ProfileInformation": ProfileInformationEn,
          "Checkout":CheckoutEn
        },
      },
    },
    lng: "en",
    fallbackLng: "ka",

    interpolation: {
      escapeValue: false,
    },
  });

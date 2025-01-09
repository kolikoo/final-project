import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HomeKa from "./ka/pages/homeKa.json"
import HomeEn from "./en/pages/homeEn.json"
import LanguageDetector from "i18next-browser-languagedetector";
import LoginKa from "./ka/pages/LogInKa.json";
import LoginEN from "./en/pages/LogInEn.json";
import SignEn from "./en/pages/SignInEn.json"
import SignKa from "./ka/pages/SignInKa.json"


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
        },
      },

      en: {
        translation: {
          "Home-Page": HomeEn,
          "LogIn-Page": LoginEN,
          "SignIn-Page": SignEn,
        },
      },
    },
    lng: "en",
    fallbackLng: "ka",

    interpolation: {
      escapeValue: false,
    },
  });

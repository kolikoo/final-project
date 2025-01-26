import { AuthContext } from "@/context/Auth";
import { useContext } from "react";

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("you must use authContext inside auth context provide ");
  }
  return authContext;
};

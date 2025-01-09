import { supabase } from "..";

import { FillProfileInfoPayload } from "./index.types";

export const fillProfileInfo = (payload: FillProfileInfoPayload) => {
  return supabase
    .from("profiles")
    .upsert(payload as any)
    .throwOnError();
};



export const getProfileInfo = (id:string|number)=>{
 return supabase.from("profiles").select("*").eq("id",id)

}
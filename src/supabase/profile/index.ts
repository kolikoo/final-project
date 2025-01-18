import { supabase } from "..";



type FillProfileInfoPayload = {
  username: string;
  full_name_ka: string;
  full_name_en: string;
  avatar_url: string;
  phone_number?:string;
  id: string;
};

export const fillProfileInfo = async (
  payload: FillProfileInfoPayload
): Promise<void> => {
  const { error } = await supabase
    .from("profiles")
    .upsert(payload)
    .throwOnError();

  if (error) {
    throw new Error(error.message);
  }
};

export const getProfileInfo = async (id: string): Promise<any> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};




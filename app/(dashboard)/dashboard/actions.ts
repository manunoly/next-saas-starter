"use server";

import { revalidatePath } from "next/cache";

interface RevalidateUrlParams {
  url: string;
}

export const revalidateUrl = async (url: string): Promise<boolean> => {
  console.log("revalidateUrl", url);
  revalidatePath(url);
  return true;
};

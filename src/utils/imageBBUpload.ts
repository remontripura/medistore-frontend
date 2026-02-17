import { env } from "@/env";

export const uploadToImgbb = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  return data.data.url; // এটা হচ্ছে image URL
};

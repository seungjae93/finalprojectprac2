import { getCookie } from "../../shared/cookie";
import { instance } from "./instance";
import setToken from "../../shared/setToken";

export const getmypageReviews = async () => {
  const accessToken = getCookie("token");
  setToken(accessToken);
  const headers = { authorization: `Bearer ${accessToken}` };
  const response = await instance.get("/review/myReview", {
    headers: headers,
  });
  const { data } = response.data;
  return data;
};

export const getmypagePosts = async () => {
  const response = await instance.get("/posts/me");
  return response.data;
};

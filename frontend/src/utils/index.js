import { jwtDecode } from "jwt-decode";

export const tokenDecode = (token) => {
  if (token) {
    const data = jwtDecode(token);
    return data;
  }
};

import axios from "axios";

export const axiosInstance = axios.create({
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();

    for (const key of Object.keys(params)) {
      const param = params[key];

      if (Array.isArray(param)) {
        for (const value of param) {
          searchParams.append(key, value);
        }
      } else {
        searchParams.set(key, param);
      }
    }

    return searchParams.toString();
  },
});

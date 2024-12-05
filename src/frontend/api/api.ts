import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3080/api",
  //   withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": "true",
  },
});

// export const endpoint = await api.get("/endpoints");
// console.log("endpoint", endpoint.data.message);

export const endpoints = [
  {
    url: "http://localhost/api/crud/products",
    endpoint: "/products",
    table: "products",
  },
  {
    url: "http://localhost/api/crud/photos",
    endpoint: "/photos",
    table: "photos",
  },
  {
    url: "http://localhost/api/crud/files",
    endpoint: "/files",
    table: "files",
  },
  {
    url: "http://localhost/api/crud/products_photos_files",
    endpoint: "/products_photos_files",
    table: "products_photos_files",
  },
];

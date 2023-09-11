import API from "./common";

// auth
export const RegisterUser = async (data) => {
	return API.post(`auth/signup`, data);
};
export const LoginUser = async (data) => API.post(`auth/login`, data);
export const GetUser = async () => API.get("user/getProfile");
export const UpdateCart = async (data) => API.post("user/updateCart", data);

//products and categories
export const getCategories = async () => API.get("admin/categories");
export const getProductsBySearch = async (data) =>
	API.get(`admin/product/search/${data.search}`);
export const getProductsBySubCat = async (data) =>
	API.get(`admin/product/category/${data.subcat}`);

export const getProducts = async () => API.get("admin/product");
export const addProducts = async (data) => API.post("admin/product", data);
export const updateProducts = async (data) => API.patch("admin/product", data);
export const deleteProducts = async (data) =>
	API.delete(`admin/product/${data}`);

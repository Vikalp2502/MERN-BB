import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/",
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem("token")) {
		req.headers["authorization"] = `Bearer ${localStorage.getItem("token")}`;
	}
	return req;
});

export default API;

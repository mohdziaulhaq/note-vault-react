import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL)

//create an axios instance

const api = axios.create({
    // baseURL: `${process.env.REACT_APP_API_URL}/api`,
    baseURL: `${import.meta.env.VITE_API_URL}/api`,

    headers : {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
})

// add a request interceptor to include JWT and CSRF tokens

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("JWT_TOKEN");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        let csrfToken = localStorage.getItem("CSRF_TOKEN");

        // id csrf does not exist
        if(!csrfToken){
            try{
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/csrf-token`,
                    {withCredentials: true}
                );
                csrfToken = response.data.token;
                localStorage.setItem("CSRF_TOKEN", csrfToken);
            }catch(error){
                console.log("Failed to fetch CSRF token", error);
            }
        }

        if(csrfToken){
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }
        console.log("X-XSRF-TOKEN " + csrfToken);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
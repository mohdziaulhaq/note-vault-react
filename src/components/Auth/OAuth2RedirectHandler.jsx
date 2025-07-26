import { React, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../store/ContextApi";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
      const location = useLocation();
  const { setToken, setIsAdmin } = useMyContext();

  useEffect(() => {
    // Create a URLSearchParams object from the query string in the URL
    // location.search gives you everything after the '?' in the URL
    // Example: if URL is http://localhost:3003/oauth2/redirect?token=abc123
    // then location.search === "?token=abc123"
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    console.log("OAuth2RedirectHandler : params: ", params.toString());
    console.log("OAuth2RedirectHandler: TokenL", token);

    if(token){
        try{
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token", decodedToken);

            localStorage.setItem('JWT_TOKEN', token);
            const user = {
                username: decodedToken.sub,
                roles: decodedToken.roles.split(','),
            };

            console.log("User object:", user);
            localStorage.setItem('USER', JSON.stringify(user));

            //update context state
            setToken(token);
            setIsAdmin(user.roles.includes('ADMIN'));

            //delay navigation to ensure local storage operations complete
            setTimeout(() => {
                console.log("Navigating to /notes");
                navigate("/notes");
            }, 100);

        }catch(error){
            console.error("Token decoding failed:", error);
            navigate('/login');
        }
    }else{
        console.log("Token not found in URL, redirecting to login");
        navigate("/login");
    
  }}, [location, navigate, setToken, setIsAdmin]);

  return <div>Redirecting</div>
};

export default OAuth2RedirectHandler;
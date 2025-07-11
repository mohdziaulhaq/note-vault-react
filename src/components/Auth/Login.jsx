// Example: About.jsx
import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import api from "../../services/api";
import {jwtDecode} from "jwt-decode";
import InputField from "../../utils/InputField";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Divider from "@mui/material/Divider";
import Buttons from "../../utils/Buttons";
import toast from "react-hot-toast";
import {useMyContext} from "../../store/ContextApi";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {

  // step1 is login step 2 is verify 2fa
  const [step, setStep] = useState(1);
  const [jwtToken, setJwtToken] = useState("");
  const [loading, setLoading] = useState(false);

  const {setToken, token} = useMyContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues:{
      username: "",
      password: "",
      code: "",
    },
    mode : "onTouched",
  });

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username : decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));

    //store the token on the context state so that 
    // it can be shared anywhere in our application 
    // by context provider
    setToken(token);
    navigate("/notes");
  };

  //function to handle login with credentials
  const onLoginHandler = async (data) => {
    try{
      setLoading(true);
      const response = await api.post("/auth/public/signin", data);

      //showing success message with react hot toast
      toast.success("Login successful");

      //reset the input field by using reset() function provided by
      // react hook form after submission
      reset();

      if(response.status === 200 && response.data.jwtToken){
        setJwtToken(response.data.jwtToken);
        const decodedToken = jwtDecode(response.data.jwtToken);
        if(decodedToken.is2faEnabled){
          setStep(2); // move to 2fa verification step
        }else{
          handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        }
      }else{
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    }catch(error){
      if(error){
        toast.error("Invalid credentials");
      }
    } finally{
      setLoading(false);
    }
  };

  //fucntion for verify 2fa authentication
  const onVerify2FaHandler = async (data) => {
    const code = data.code;
    setLoading(true);

    try{

      const formData = new URLSearchParams();
      formData.append("code", code);
      formData.append("jwtToken", jwtToken);

      await api.post("/auth/public/verify-2fa-login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const decodedToken = jwtDecode(jwtToken);
      handleSuccessfulLogin(jwtToken, decodedToken);

    }catch(error){
      console.log("2FA verification error", error);
      toast.error("Invalid 2FA code. Please try again");
    }finally{
      setLoading(false);
    }
  };

  // if there exists a token ,navigate user to home page if he tried accessing login page

  useEffect(() => {
    if(token) navigate("/");
  }, [navigate, token]

  );

  //step 1 renders login page and step 2 renders 2fa form
  return (
  <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
    About Page</div>);
};

export default Login;

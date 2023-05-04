import axios from "axios";
import React, { useState } from "react";
import Navbar from "./Navbar";
import '../App.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [objectId, setObjectId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // login function with api
  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
      objectId: objectId
    };
    // axios call
    localStorage.setItem("email", email)
    localStorage.setItem("objectId", objectId)

    axios
      .post("https://qa-server-testing.onrender.com/user/login", data)
      .then((res) => {
        alert("Login Success")
        console.log(res);
        // localStorage.clear();
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem('objectId', JSON.stringify(res.data.user['_id']))
        // const objectId = res.data.user._id;
        // localStorage.setItem("objectId",objectId);
        navigate("/Dashboard");
      })
      .catch((err) => {
        alert("Login Fail invalid credientials")
        console.log(err);
      });
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <Navbar />
      <div className="w-screen h-[80vh] flex  justify-center items-center" >

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col  w-[50%]  space-y-4  "
        >
          <h1 className="text-center text-xl"> 🆂🅸🅶🅽🅸🅽</h1>

          <div className="flex flex-col ">
            <label className="text-xl ">𝐄𝐦𝐚𝐢𝐥</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required="Please enter Your Email"
              placeholder="Enter Your Email"
              className=" border border-zinc-400 outline-none  px-6 py-2 text-black "
            />
          </div>
          <div className="flex flex-col ">
            <label className="text-xl ">𝐏𝐚𝐬𝐬𝐰𝐨𝐫𝐝</label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required="Please enter Your Password"
                placeholder="Enter Your Password"
                className="border border-zinc-400 outline-none px-6 py-2 text-black w-full"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-blue-300 py-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>


  );
}

export default Login;

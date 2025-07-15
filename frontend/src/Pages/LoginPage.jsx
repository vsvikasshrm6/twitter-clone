import React, { useState } from "react";
import { MdOutlineMail} from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function LoginPage() {
  const queryClient = useQueryClient();
  const {mutate: loginMutation, isError, isPending, error} = useMutation({
    mutationFn : async ({userName, password})=>{
      try {
        const res = await fetch("/api/login", {
          method : "POST",
          headers :{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({userName, password})
        })
        if(!res.ok){
          throw new Error(error)
        }
        return res.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey : ["authUser"]});
    }
      
  })
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  });
  const handleInputChange = (e)=>{
    setFormData({...formData, [e.target.name] : e.target.value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    loginMutation(formData);
  }
  return (
    <div className="grid lg:grid-cols-2">
      
      <div className="flex flex-col  h-screen justify-center items-center ">
        <form onSubmit={handleSubmit} className="space-y-2">
          <h1 className="font-extrabold text-3xl text-left">Login</h1>
          <label className="input input-bordered flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              onChange={handleInputChange}
              name="email"
              value={formData.email}

              
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <TbLockPassword />
            <input
              type="text"
              className="grow"
              placeholder="Password"
              onChange={handleInputChange}
              name="password"
              value={formData.password}
              
            />
          </label>
          <button className="btn w-full" type="submit">Login</button>
          <p>Don't have an account?</p>
        <Link to={"/signup"} className>
        <button className="btn w-full ">{isPending ? "Loading..." : "Sign up"}</button>
        {isError && <p className="text-red-500">{error.message}</p>}
        </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

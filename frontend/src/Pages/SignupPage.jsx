import { useState } from "react";
import { MdOutlineMail} from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";

import XSvg from './../components/svgs/Xsvg';
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

function SignupPage() {

  const queryClient =  useQueryClient()

  const {mutate: signupMutate, isPending, isError, error} = useMutation({
    mutationFn: async({email, password, fullName, userName})=>{
      try {
        const res = await fetch("/api/signup", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email, password, fullName, userName})
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error(res.data);
      }
      console.log(data);
      return data;
      } catch (error) {
        toast.error(error.message)
        throw new Error(error.message)  
      }
      
    },
    onSuccess:()=>{
      toast.success("Sign up successfull")
      queryClient.invalidateQueries({queryKey : ["authUser"]});
    }
  });
  const [form , setForm] = useState({
    email : "",
    password : "",
    fullName : "",
    userName : "",
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    signupMutate(form);
  }
  return (
    <div className="grid lg:grid-cols-2">
      <div className=""><XSvg></XSvg></div>

      <div className="flex flex-col items-center justify-center h-screen space-y-2">
        

        <form onSubmit={handleSubmit} className="flex-col space-y-2">
          <p className="font-extrabold text-3xl text-left">Join Today.</p>
          <label className="input input-bordered flex items-center gap-2">
          <MdOutlineMail />
          <input type="text" className="grow" placeholder="Email" onChange={(e)=>setForm({...form , email : e.target.value})} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <FaUserAlt />
          <input type="text" className="grow" placeholder="User Name" onChange={(e)=>setForm({...form ,userName : e.target.value})} />
        </label>
         <label className="input input-bordered flex items-center gap-2">
          <IoPencil />
          <input type="text" className="grow" placeholder="Full Name" onChange={(e)=>setForm({...form ,fullName : e.target.value})} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <TbLockPassword />
          <input type="text" className="grow" placeholder="Password" onChange={(e)=>setForm({...form ,password : e.target.value})} />
        </label>
        <button className="btn w-full" type="submit">{isPending ? "...Loading" : "Sign up"}</button>
         {isError && <p className="text-red-500">{error.message}</p>}

        <p>Already have an account?</p>
        <Link to={"/login"} className>
        <button className="btn w-full">Login</button>
        </Link>

        </form>

        
      </div>
    </div>
  );
}

export default SignupPage;

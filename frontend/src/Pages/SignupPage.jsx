import { useState } from "react";
import { MdOutlineMail} from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";

import XSvg from './../components/svgs/Xsvg';
import { useMutation } from "@tanstack/react-query";
import toast from './../../node_modules/react-hot-toast/src/index';

function SignupPage() {

  const {mutate: signupMutate, isPending, isError, error} = useMutation({
    mutationFn: async({email, password, fullName, userName})=>{
      try {
        const res = await fetch("/api/signup", {
        method : "Post",
        headers : {
          contentType : "application/json"
        },
        body : JSON.stringify({email, password, fullName, userName})
      })
      if(!res.ok){
        throw new Error(res.data);
      }
      if(!res.data){
        console.log(res.data)
      }
      if(res.data){
        toast.success("Sign up successfull")
      }
      } catch (error) {
        toast.error(error)  
      }
      
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
        <button className="btn w-full" type="submit">Signup</button>

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

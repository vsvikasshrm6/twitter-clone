import React, { useState } from "react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email : "",
    password : ""
  });
  const handleInputChange = (e)=>{
    setFormData({...formData, name : e.target.value});
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(formData);
  }
  return (
    <div className="grid lg:grid-cols-2">
      <div>Left Pane</div>
      <div className="flex flex-col space-y-2">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              onChange={handleInputChange}
              
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <TbLockPassword />
            <input
              type="text"
              className="grow"
              placeholder="Password"
              onChange={handleInputChange}
              
            />
          </label>
          <button className="btn w-full" type="submit">Login</button>
          <p>Don't have an account?</p>
        <Link to={"/signup"} className>
        <button className="btn w-full">Sign Up</button>
        </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

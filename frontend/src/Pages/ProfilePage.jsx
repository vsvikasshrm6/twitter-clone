import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Posts from "../components/common/Posts";

import EditProfileModal from "../components/common/EditProfileModal"

import { POSTS } from "../components/utils/db/dummy"

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

  const user = {
		_id: "1",
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy2.png",
		coverImg: "/cover.png",
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		link: "https://youtube.com/@asaprogrammer_",
		following: ["1", "2", "3"],
		followers: ["1", "2", "3"],
	};

  return (
    <div className="w-full flex flex-col">
      <div className="flex p-4 gap-8 items-center">
        <Link><FaArrowLeft></FaArrowLeft></Link>
        <div>
          <h1 className="font-bold">{user.fullName}</h1>
          <span className="text-gray-500">{POSTS.length} Post</span>
        </div>
      </div>
      <div className="w-full relative">
        <img src={user.coverImg} alt="" className="w-full h-56"/>
        <input type="file" ref={coverImgRef} className="hidden"/>
        <button className="flex justify-center items-center absolute top-4 right-4 rounded-full size-9 bg-slate-900" onClick={()=>coverImgRef.current.click()}><MdEdit className="size-6"></MdEdit></button>
      </div>
      <div className="flex items-center relative pt-10">
        <div className="absolute -top-20 left-4">
          <div className="relative rounded-full">
            <button onClick={profileImgRef.current.click() } className="absolute top-0 right-0"><MdEdit className="size-4"></MdEdit></button>
            <input type="file" className="hidden" ref={profileImgRef}/>
            <img src={user.profileImg} className="w-48 rounded-full" /> 
          </div>
          </div>
        <button className="btn ml-auto border border-gray-400 rounded-full">Edit Profile</button>
      </div>
    </div>
  )
}

export default ProfilePage
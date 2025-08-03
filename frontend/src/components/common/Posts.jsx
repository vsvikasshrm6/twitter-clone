
import  PostSkeleton from "../skeletons/PostSkeleton"
import PostComponent from "../common/PostComponent"
import {useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({feedType, userName, userId}) => {
	
	var feedUrl = "";
	
	if(feedType==="following"){
		feedUrl = "/api/post/following"
	}
	else if(feedType==="forYou"){
		feedUrl = "/api/post/all"
	}
	else if(feedType==="posts"){
		feedUrl = `/api/post/user/${userName}`
	}
	else if(feedType==="likes"){
		feedUrl = `/api/post/like/${userId.toString()}`
	} 
	// /
  
	const {data: POSTS, isLoading, error, refetch, isRefetching} = useQuery({
		queryKey : ["Post"],
		queryFn : async()=>{
			try {
				// if there is some error in getting post it will show previous post
				
				const res = await fetch(feedUrl, {
					method : "GET"
				})
				if(!res.ok){
					throw new Error(error)
				}
				const data = await res.json();
				if(data.error){
					throw new Error(data.error);
				}
				return data;
			} catch (error) {
				throw new Error(error);
			}
		}
		
	});
	useEffect(()=>{
  refetch();
	}, [feedType, refetch])
	return (
		<>
			{isLoading && isRefetching && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading  && !isRefetching && POSTS && (
				<div>
					{POSTS.map((post) => (
						<PostComponent key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;

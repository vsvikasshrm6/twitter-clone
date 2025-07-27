
import  PostSkeleton from "../skeletons/PostSkeleton"
import PostComponent from "../common/PostComponent"
import {useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({feedType}) => {
	// const isLoading = false;
	const feedUrl = feedType==="following" ? "/api/post/following" : "/api/post/all";
	
  
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
			{!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && POSTS && (
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


import {POSTS} from "../utils/db/dummy"
import  PostSkeleton from "../skeletons/PostSkeleton"
import PostComponent from "../common/PostComponent"

const Posts = () => {
	const isLoading = false;

	return (
		<>
			{isLoading && (
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

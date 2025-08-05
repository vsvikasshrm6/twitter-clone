import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreatePost = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const queryClient = new QueryClient();
    const {data : authUser}  = useQuery({queryKey : ["authUser"]})

    const {mutate : createPost, isError, error, isPending} = useMutation({
        mutationFn: async ()=>{
            try {
                const res = await fetch("/api/post/create", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({text, image : img})
            })
            const data = res.json()
            if(!res.ok){
                
                throw new Error(error)
            }
            return data;
            } catch (error) {
                console.log(error)
                throw new Error(error);
            }
            
        },
        onSuccess : ()=>{
            setImg("");
            setText("");
            queryClient.invalidateQueries({queryKey : ["Post"]})
            toast.success("POST created successfully")
        },
        onError : ()=>{
            console.log(error)
        }
        
    })

    const imgRef = useRef(null);
   



    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
        
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setImg(fileReader.result)
            }
        }


    }
    return (
        <div className='flex items-start border-b border-gray-700'>
            <div className='avator'>
                <div className='w-8 rounded-full'>
                    <img src={authUser.profileImg || "/avatar-placeholder.png"} />
                </div>
            </div>
            <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
                <textarea value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='What is happening'
                    className='textarea w-full'

                ></textarea>
                {img && (
                    <div className='relative w-72 mx-auto'>
                        <IoCloseSharp
                            className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                            onClick={() => {
                                setImg(null);
                                imgRef.current.value = null;
                            }}
                        />
                        <img src={img} className='w-full mx-auto h-72 object-contain rounded' />
                    </div>
                )}

                <div className='flex justify-between border-t py-2 border-t-gray-700'>
                    <div className='flex gap-1 items-center'>
                        <CiImageOn
                            className='fill-primary w-6 h-6 cursor-pointer'
                            onClick={() => imgRef.current.click()}
                        />
                        <BsEmojiSmileFill className='fill-primary w-5 h-5 cursor-pointer' />
                    </div>
                    <input type='file' hidden ref={imgRef} onChange={handleImageUpload} />
                    <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                        {isPending ? "Posting..." : "Post"}
                    </button>
                </div>
                {isError && <div className='text-red-500'>{error || "something went wrong"}</div>}
            </form>


        </div>
    )
}

export default CreatePost
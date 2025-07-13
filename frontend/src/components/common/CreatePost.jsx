import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const CreatePost = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const imgRef = useRef(null);

    const isPending = false;
    const isError = false;

    const data = {
        profileImg: "/avatars/boy1.png",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Post created successfully");
    };
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setImage(fileReader.result)
            }
        }


    }
    return (
        <div className='flex items-start border-b border-gray-700'>
            <div className='avator'>
                <div className='w-8 rounded-full'>
                    <img src={data.profileImg || "/avatar-placeholder.png"} />
                </div>
            </div>
            <form className='flex flex-col gap-2 w-full' onSubmit={handleSubmit}>
                <textarea value={text}
                    onChange={() => setText(e.target.value)}
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
                {isError && <div className='text-red-500'>Something went wrong</div>}
            </form>


        </div>
    )
}

export default CreatePost
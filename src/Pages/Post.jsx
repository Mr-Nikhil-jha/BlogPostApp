import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appWrite/Config";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";

export default function Post() {
    const [post, setPost] = useState(null);
    let [show, setShow] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.userData.$id : false;

    const postInStore = useSelector((state) => state.post.post);

    useEffect(() => {
        if (postInStore.length > 0) {
            let filteredBlogs = postInStore.filter((blog) => blog.$id === slug);
            setPost(filteredBlogs[0]);
            // navigate("/");
        } else if (postInStore.length === 0) {
            if (slug) {
                appwriteService.getPost(slug).then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                });
            }
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImg);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden bg-white my-2 relative">
            <img className="object-cover w-full md:w-1/3 h-60 md:h-auto" src={appwriteService.getFilePreview(post.featuredImg)} alt={post.title} />
            <div className="flex flex-col p-6 space-y-4">
                <h5 className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{post.title}</h5>
                <div className="text-gray-600 text-base leading-relaxed">{parse(post.content)}</div>
            </div>
            {isAuthor && (
                <div className="absolute top-2 right-2">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 rounded-lg text-sm p-1.5 cursor-pointer" type="button" onClick={() => setShow((prev) => !prev)}>
                        <span className="sr-only">Open dropdown</span>
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                    </button>
                    <div id="dropdown" className={`z-10 ${!show && "hidden"} text-base list-none bg-white divide-y shadow-md rounded-md absolute right-0 mt-2 w-32`}>
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <Link to={`/edit-post/${post.$id}`} className="block px-4 py-2 text-sm text-black">
                                    Edit
                                </Link>
                            </li>
                            <li>
                                <button onClick={deletePost} className="blockpx-4 py-2 text-sm text-black">
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    ) : null;
}

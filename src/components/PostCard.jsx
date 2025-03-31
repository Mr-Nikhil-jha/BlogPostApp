import React from "react";
import appwriteService from "../appWrite/Config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PostCard({ $id, title, featuredImg }) {
    const navigate = useNavigate();
    return (
        <Link to={`/post/${$id}`} state={{ triggerLoader: true }}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={appwriteService.getFilePreview(featuredImg)} alt={title} className="rounded-xl" />
                </div>
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {/* <button className="btn"> */}
                    <button className="btn cursor-pointer" onClick={() => navigate(`/post/${$id}`)}>
                        Read More
                    </button>
                    {/* </button> */}
                </div>
            </div>
        </Link>
    );
}

export default PostCard;

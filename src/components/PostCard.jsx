import React from "react";
import appwriteService from "../appWrite/Config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImg }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImg)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="btn">
            <Link to={`/post/${$id}`}>Read More</Link>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

import React, { useState, useEffect } from "react";
import store from "../store/Store";
import appwriteService from "../appWrite/Config";
import { setPost } from "../store/PostSlice";
import { Container, PostCard } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

function AllPosts() {
    // const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.post.post);

    const AllPostData = useLoaderData();
    useEffect(() => {
        if (!AllPostData || AllPostData.length === 0) {
            appwriteService.getPosts([]).then((posts) => {
                if (posts?.documents) {
                    dispatch(setPost(posts.documents));
                }
            });
        } else {
            dispatch(setPost(AllPostData));
        }
    }, [AllPostData, dispatch, setPost]);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {postData.map((pos) => (
                        <div key={pos.$id} className="p-2 w-1/4">
                            <PostCard {...pos} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;

export const getAllPostsData = () => {
    const postData = store.getState().post.post;
    if (postData.length > 0) {
        return postData;
    }
};

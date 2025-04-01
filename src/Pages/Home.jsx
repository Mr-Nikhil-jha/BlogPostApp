import React, { useEffect } from "react";
import store from "../store/Store";
import appwriteService from "../appWrite/Config";
import { Container, PostCard } from "../components/index";
import { setPost } from "../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Login from "../components/Login";

function Home() {
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

    if (!postData || postData.length === 0) {
        return (
            <div className="w-full py-3">
                <Container>
                    {/* <div className="PY-6"> */}
                    <h1>No Posts</h1>
                    {/* </div> */}
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {postData.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;

export const getAllPostsDataForHome = () => {
    const postData = store.getState().post.post;
    return postData?.length > 0 ? postData : [];
};

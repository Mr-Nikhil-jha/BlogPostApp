import React, { useEffect, useState } from "react";
import appwriteService from "../appWrite/Config";
import { Container, PostCard } from "../components/index";
import { useParams } from "react-router-dom";
import { setPost } from "../store/PostSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
    const postData = useSelector((state) => state.post.post);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (postData.length > 0) {
            setPosts(postData);
        } else {
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                    dispatch(setPost(posts.documents));
                }
            });
        }
    }, []);

    if (posts.length == 0) {
        return (
            <div className="py-8">
                <Container>
                    <h1 className="text-3xl font-bold">No Posts Found</h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((pos) => (
                        <div key={pos.$id} className="p-2 w-1/4">
                            <PostCard {...pos} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;

import React, { useState, useEffect } from "react";
import appwriteService from "../appWrite/Config";
import { Container, PostCard } from "../components/index";
import { useDispatch, useSelector } from "react-redux";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const postData = useSelector((state) => state.post.post);
    useEffect(() => {
        if (postData.length > 0) {
            setPosts(postData);
        } else {
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, []);
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

export default AllPosts;

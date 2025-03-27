import React, { useState, useEffect } from "react";
import appwriteService from "../appWrite/Config";
import { Container, PostCard } from "../components/index";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((pos) => (
                        <div key={pos.$id} className="p-2 w-1/4">
                            <PostCard post={pos} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;

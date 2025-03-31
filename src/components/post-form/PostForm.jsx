import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../index";

import Rte from "../Rte";

import appwriteService from "../../appWrite/Config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImg);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImg: file ? file.$id : undefined,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;

                data.featuredImg = fileId;
                const slug = data.slug ? data.slug : slugTransform(data.title);

                const dbpost = await appwriteService.createPost({
                    ...data,
                    slug: slug,

                    userId: userData.userData.$id,
                });

                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            const formattedValue = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
                .replace(/\s+/g, "_"); // Replace spaces with underscores

            const uniqueSuffix = Math.floor(Math.random() * 10000);
            return formattedValue.length > 0 ? `${formattedValue}_${uniqueSuffix}` : `value_${uniqueSuffix}`;
        } else {
            return "";
        }
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input label="Featured Image :" type="file" className="mb-4" accept="image/png, image/jpg, image/jpeg, image/gif" {...register("image", { required: !post })} />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFilePreview(post.featuredImg)} alt={post.title} className="rounded-lg" />
                    </div>
                )}
                <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;

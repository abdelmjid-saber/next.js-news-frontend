"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useQuill } from "react-quilljs";
import 'quill/dist/quill.snow.css';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import fetchClientWithFiles from "@/lib/fetch-client-with-files";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import toast from "react-hot-toast";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType, FilePondPluginFileValidateSize)

export default function CreatePost() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([])

    const { quill, quillRef } = useQuill();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget);

            formData.append('featured_image', files[0].file);

            const selectedTags = Array.from(formData.getAll('tags[]'));
            formData.set('tags', JSON.stringify(selectedTags));

            const response = await fetchClientWithFiles({
                method: "POST",
                url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/dashboard/posts/store",
                body: formData,
            });


            if (!response.ok) {
                throw response;
            }

            const data = await response.json();
            toast.success(data.message)

            setIsLoading(false);
            router.push("/dashboard/posts");
        } catch (error) {
            setIsLoading(false);

            if (error instanceof Response) {
                const response = await error.json();

                if (!response.errors) {
                    throw error;
                }

                return Object.keys(response.errors).map((errorKey) => {
                    const input = document.querySelector(`[name="${errorKey}"]`) as HTMLInputElement;
                    input.setCustomValidity(response.errors[errorKey]);
                    input.reportValidity();
                });
            }

            throw new Error("An error has occurred post store request");
        }
    }

    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                const editorContent = quill.root.innerHTML;
                setContent(editorContent);
            });
        }
    }, [quill]);

    useEffect(() => {
        const apiCategoriesUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboard/posts/categories`;
        const apiTagsUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/dashboard/posts/tags`;

        fetch(apiCategoriesUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                throw new Error("Error fetching categories");
            });

        fetch(apiTagsUrl)
            .then((response) => response.json())
            .then((data) => {
                setTags(data);
            })
            .catch((error) => {
                throw new Error("Error fetching tags");
            });
    }, []);

    const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = '3MB';

    const pondOptions = {
        acceptedFileTypes: acceptedFileTypes,
        allowFileSizeValidation: true,
        maxFileSize: maxFileSize,
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4" encType="multipart/form-data">
            <div className="grid gap-2">
                <Label htmlFor="name">Title</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    minLength={6}
                    maxLength={255}
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="excerpt">Short Description</Label>
                <Textarea id="excerpt" name="excerpt" maxLength={158} required />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <textarea name="content" value={content} hidden></textarea>
                <div ref={quillRef} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <select id="category" name="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option selected disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tags">Tags</Label>
                    <select id="tags" name="tags[]" multiple className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option selected value="Pending Review">Pending Review</option>
                    <option value="Draft">Draft</option>
                </select>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="featured_image">Featured Image</Label>
                <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    name="featured_image"
                    required
                    {...pondOptions}
                />
            </div>
            <Button disabled={isLoading} >
                {
                    isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Submit"
                    )
                }
            </Button>
        </form >
    );
}

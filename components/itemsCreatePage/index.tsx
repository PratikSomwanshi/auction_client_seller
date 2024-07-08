"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ItemAcceptanceForm({
    seller,
    token,
}: {
    seller: string | undefined;
    token: string | undefined;
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [initialAmount, setInitialAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = () => {
        // Clear error message when input changes
        setErrorMessage("");
    };

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if any required field is empty
        if (!name || !description || !initialAmount) {
            setErrorMessage("All fields are required.");
            return;
        }

        setLoading(true); // Set loading state to true

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("initialAmount", initialAmount);
        formData.append("username", seller as string);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BIDDING_SERVICE_URL}/items`,
                {
                    method: "POST",
                    headers: {
                        Authorization: token ? token : "",
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                const data = await res.json();
                setErrorMessage(
                    data.error || "Something went wrong. Please try again."
                );
                setLoading(false); // Reset loading state
                return;
            }

            // Clear the form after successful submission
            setName("");
            setDescription("");
            setImageFile(null);
            setImagePreview("");
            setInitialAmount("");
            setLoading(false); // Reset loading state after successful submission
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Something went wrong. Please try again.");
            setLoading(false); // Reset loading state on error
        }
    };

    return (
        <div className="w-screen h-[90vh] flex justify-center items-center rounded-md">
            <div className="bg-slate-100 w-[30%] h-[70%] px-3 ">
                <h1 className="mb-6 mt-4 underline text-lg text-end">
                    Item Acceptance
                </h1>
                <form onSubmit={handleSubmit} className="px-2 ">
                    <div className="space-y-1">
                        <label htmlFor="name">Name:</label>
                        <Input
                            type="text"
                            id="name"
                            className="bg-gray-200"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="description">Description:</label>
                        <Input
                            type="text"
                            id="description"
                            className="bg-gray-200"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="imageUrl">Image:</label>
                        <Input
                            type="file"
                            id="imageUrl"
                            className="bg-gray-200"
                            onChange={(e) => {
                                handleImageChange(e);
                                handleInputChange();
                            }}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Selected Image"
                                className="mt-2"
                                style={{ maxHeight: "200px" }}
                            />
                        )}
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="initialAmount">Initial Amount:</label>
                        <Input
                            type="number"
                            id="initialAmount"
                            className="bg-gray-200"
                            value={initialAmount}
                            onChange={(e) => {
                                setInitialAmount(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="w-full flex justify-center items-center mt-5">
                        <Button
                            type="submit"
                            className="w-[70%] bg-green-500"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                    {errorMessage && (
                        <p className="text-red-400 mt-3 text-center">
                            {errorMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ItemAcceptanceForm;

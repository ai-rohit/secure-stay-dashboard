"use client";
import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import CommonDropdown from "@/components/commonDropdown";
import { Toaster, toast } from "react-hot-toast";
import { CameraIcon } from "@heroicons/react/20/solid";
import { envConfig } from "@/utility/environment";
import axios from "axios";

const CreateUpsell: React.FC = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState("");
  const [listingIds, setListingIds] = useState(["1", "2", "3"]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handlePostRequest = async (postData: any) => {
    try {
      const apiUrl = `${envConfig.backendUrl}/upsell/create`;

      const response = await axios.post(apiUrl, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response here
      if (response.status === 200) {
        toast.success(`${response.data.message}`);
        return;
      }
      toast.error(`${response.data.message}`);
      return;
    } catch (error: any) {
      toast.error(`${error.message}`);
      // Handle the error here
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", shortDescription);
    formData.append("price", price);
    formData.append("purchaseDate", "2080-04-10");
    formData.append("checkIn", "2080-04-10");
    formData.append("checkOut", "2080-04-10");
    formData.append("guestName", "2080-04-10");
    formData.append("timePeriod", "Always");

    listingIds.forEach((listingId, index) => {
      formData.append(`listingIds[${index}]`, listingId);
    });
    handlePostRequest(formData);
    console.log("Form Submitted");
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size <= 2048 * 1024) {
      setSelectedImage(file);
    } else {
      alert(
        "Please choose an image with a size equal to or less than 2048 KB."
      );
      // Clear the input to allow the user to choose another file
      e.target.value = null;
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 2048 * 1024) {
      setSelectedImage(file);
    } else {
      alert(
        "Please choose an image with a size equal to or less than 2048 KB."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center h-[100%] rounded-md ml-auto mr-auto mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl mb-4 ">
        <div className="md:col-span-1">
          <div className="text-xl font-extrabold mb-1">Create Upsells</div>
          <p className="text-sm  text-gray-500 ">Build your own upsell</p>
        </div>

        <div className="md:col-span-1 flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300"
          >
            Save Upsell
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl rounded-md bg-white shadow-md p-4 pl-10"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-8 mt-4">
          <div className="w-40 h-25 overflow-hidden">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
                <CameraIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Product Image
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Only image files are allowed to be uploaded here.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="bg-blue-700 border-2 border-blue-700 text-white px-4 py-1 rounded-lg hover:bg-transparent hover:text-blue-700 transition-all duration-300 mt-2 cursor-pointer"
            >
              Upload Image
            </label>
          </div>
        </div>
        <div className="mb-2 col-span-full">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Title<span className="text-red-700 px-1">*</span>
          </label>
          <input
            type="text"
            id="title"
            className="border-2 border-gray rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-2 col-span-full">
          <label
            htmlFor="shortDescription"
            className="block text-gray-700 mb-2"
          >
            Short Description
          </label>
          <textarea
            id="description"
            className="border-2 border-gray rounded-md p-2 w-full h-15 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            placeholder="Write Description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 col-span-full">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Price<span className="text-red-700 px-1">*</span>
          </label>
          <input
            type="number"
            id="price"
            className="border-2 border-gray rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* <div className="mb-2 col-span-full">
          <label
            htmlFor="shortDescription"
            className="block text-gray-700 mb-2"
          >
            Pricing Model
          </label>
          <div className="relative inline-block text-left w-full">
            <CommonDropdown
              menuItems={myMenuItems}
              onClick={handlePricingModel}
              className="w-full"
            />
          </div>
        </div> */}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 mb-4"
        >
          Save Upsell
        </button>
      </div>
    </div>
  );
};

export default CreateUpsell;

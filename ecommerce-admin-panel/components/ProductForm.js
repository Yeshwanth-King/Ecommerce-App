"use client";

import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import "@/app/globals.css";
import axios from "axios";
import "@/public/Stylesheets/style.css";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { HiOutlineUpload } from "react-icons/hi";
import LoaderSmall from "@/components/LoaderSmall";

const ProductForm = () => {
  const Router = useRouter();

  const [Name, setName] = useState("");
  const [selectProperty, setSeletectProperty] = useState({})
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const params = useParams();
  const [data, setData] = useState({
    _id: "",
    Name: "",
    description: "",
    Price: 0,
    images: [],
    category: "",
  });

  const fetchCategories = async () => {
    try {
      let response = await fetch("/api/categories", {
        method: "GET",
      });
      let data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [categories.length]);

  useEffect(() => {
    if (params.id) {
      const fetchDatabyId = async () => {
        try {
          let res = await fetch(
            `http://localhost:3000/api/findProducts/${params.id[0]}`
          );
          let product = await res.json();
          setData({
            _id: product._id,
            Name: product.Name,
            description: product.description,
            Price: product.Price,
            images: product.images,
          });
          setName(product.Name);
          setDescription(product.description);
          setPrice(product.Price);
          setImages(product.images);
          setCategory(product.category);
          setSeletectProperty(product.properties)
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchDatabyId();
    }
  }, [params, params.id]);

  async function uploadPhotos(e) {
    setLoading(true);

    e.preventDefault(); // Prevent default form submission behavior if this is used within a form
    let files = e.target.files;

    let data = new FormData();
    for (const file of files) {
      data.append("images", file);
    }
    const response = await axios.post("/api/upload", data);
    setImages((pre) => {
      return [...pre, ...response.data.link];
    });
    setLoading(false);
  }

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    if (draggedIndex !== index.toString()) {
      const updatedImages = [...images];
      const draggedImage = updatedImages[draggedIndex];
      updatedImages.splice(draggedIndex, 1); // Remove the dragged image
      updatedImages.splice(index, 0, draggedImage); // Insert the dragged image at the new position
      setImages(updatedImages); // Update the state with the new order
    }
  };

  const addProduct = (e) => {
    e.preventDefault();

    const data = {
      Name,
      description,
      Price: parseInt(Price),
      images,
      category,
      properties: selectProperty
    };

    const myPromise = async () => {
      let res = await fetch(
        params.id ? `/api/findProducts/${params.id[0]}` : "/api/productsAdd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        const result = await res.json();
        setDescription("");
        setName("");
        setPrice("");
        setImages([]);
        setCategory("");
      } else {
        console.error("Failed to add product", await res.text());
      }
      return data;
    };
    myPromise()
      .then((data) => {
        toast.success(
          params.id
            ? `${data.Name} Edited successfully`
            : `${data.Name} Added Succesfully`,
          {
            onAutoClose: () => Router.push("/products"),
            onDismiss: () => Router.push("/products"),
            duration: 1500,
          }
        );
      })
      .catch((error) => {
        toast.error("Error", error.message);
      });
  };

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }


  const handleSelect = (propertyName, value) => {
    setSeletectProperty((prev) => {
      const newProp = { ...prev };
      newProp[propertyName] = value;
      return newProp;
    })
  }
  return (
    <div className="flex justify-center pb-5 h-screen sm:h-[100%] overflow-y-scroll">
      <form
        onSubmit={addProduct}
        className="sm:w-1/2 w-11/12 mt-5 rounded-xl h-fit  border drop-shadow-xl bg-white p-3 flex flex-col gap-2 "
      >
        <label className="text-lg pl-2 font-semibold">Product Name</label>

        <input
          type="text"
          className="border-2 rounded-3xl p-3 outline-none"
          required
          value={Name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Product Name"
        />
        <label className="text-lg pl-2 font-semibold">Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 rounded-3xl p-3 outline-none"
        >
          <option value="">Uncategorized</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category?.name}
            </option>
          ))}
        </select>

        {propertiesToFill.length > 0 &&
          propertiesToFill.map((property, index) => (
            <div key={property.id || index} className="flex gap-2 items-center">
              <span className="py-1 px-3 rounded-lg ">
                {property.name}
              </span>
              :
              <select value={selectProperty[property.name]} onChange={(ev) => { handleSelect(property.name, ev.target.value) }} className="border-2 rounded-md text-black p-3 outline-none">
                <option value="">Not Selected</option>
                {property.values?.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}

        <label className="text-lg pl-2 font-semibold">Description</label>

        <textarea
          type="text"
          className="border-2 rounded-3xl p-3 outline-none h-[100px]"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Write Something"
        />

        <label className="text-lg pl-2 font-semibold">Photos</label>

        {images?.length > 0 ? (
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-3 pl-2 flex-wrap p-1">
              {images.map((key, index) =>
                key ? (
                  <div
                    className="flex justify-center items-center"
                    draggable
                    key={`${key}`}
                    onDragStart={(e) => handleDragStart(e, index)} // Set up drag start event
                    onDrop={(e) => handleDrop(e, index)} // Set up drop event
                    onDragOver={(e) => e.preventDefault()} // Allow drop by preventing default
                  >
                    <Image
                      draggable
                      className="border p-1 rounded shadow-md"
                      alt="Image"
                      src={key}
                      width={116}
                      height={114}
                      priority
                    />
                  </div>
                ) : null
              )}
              {loading && (
                <div className="flex justify-center items-center border p-3 rounded shadow-md">
                  <LoaderSmall />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex pl-2 items-center">
              {loading && (
                <>
                  <div className="flex justify-center items-center border p-3 rounded shadow-md">
                    <LoaderSmall />
                  </div>
                </>
              )}
            </div>
          </>
        )}
        <div className="flex pl-2 items-center">
          <label
            htmlFor="multiple_files"
            className="text-4xl cursor-pointer text-gray-600 shadow-md border-2 border-gray-200 rounded-xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-500  focus:outline-none hover:text-gray-500 transition-all duration-300 p-10"
          >
            <HiOutlineUpload />
          </label>
        </div>
        <input
          onChange={(e) => {
            uploadPhotos(e);
          }}
          className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          id="multiple_files"
          type="file"
          multiple
        />

        <label className="text-lg pl-2 font-semibold">Price</label>

        <input
          type="text"
          className="border-2 rounded-3xl p-3 outline-none"
          required
          value={Price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          placeholder="Price ₹"
        />

        <div className="">
          <button
            type="submit"
            className="text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center  ml-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

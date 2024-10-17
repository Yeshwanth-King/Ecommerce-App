"use client";
import LayoutMain from "@/components/MainLayout";
import axios from "axios";
import "@/public/Stylesheets/scrollBar.css";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

const page = () => {
  const [Name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  const toggleModal = (category) => {
    setSelectedCategory(category);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchCategories();
  }, [uploading]);

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

  const uploadCategory = async (e) => {
    setUploading(true);
    e.preventDefault();
    const data = {
      name: Name,
      parent: parentCategory ? parentCategory : null,
      properties: properties.map((pro) => ({
        name: pro.name,
        values: pro.value.split(","),
      })),
    };
    if (editedCategory) {
      data.id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    toast.success("Category uploaded", data.name);

    console.log("Category uploaded", Name);
    setName("");
    setUploading(false);
    setParentCategory("");
    setProperties([]);
  };

  const deleteCat = async () => {
    setUploading(true);
    const data = { name: selectedCategory.name, id: selectedCategory._id };
    await axios.delete("/api/categories", { data });
    toast.success(data.name + " Deleted Successfully");
    setUploading(false);
    setIsOpen(!isOpen);
  };

  const editcat = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setProperties(
      category.properties
        ? category.properties.map((p) => ({
          name: p.name,
          value: p.values.join(","),
        }))
        : []
    );
    setParentCategory(category.parent ? category.parent._id : "");
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  };

  const handlePropertyFunc = (index, property, newName) => {
    setProperties((prev) => {
      const newProperty = [...prev];
      newProperty[index].name = newName;
      return newProperty;
    });
  };
  const handlePropertyFuncValue = (index, property, NewValue) => {
    setProperties((prev) => {
      const newProperty = [...prev];
      newProperty[index].value = NewValue;
      return newProperty;
    });
  };
  const handleButtonclick = (index, property) => {
    setProperties((prev) => {
      const newProperty = [...prev];
      newProperty.splice(index, 1);
      return newProperty;
    });
  };
  return (
    <div>
      <LayoutMain>
        <Toaster duration={1000} richColors position="top-right" />
        <div className="flex items-center overflow-hidden flex-col gap-2 bg-red-50 h-full">
          <div>
            <span className="text-red-600 text-4xl text-center">
              Categories
            </span>
          </div>
          <div className="py-3 px-5 rounded-lg flex flex-col gap-5 max-md:text-xs w-11/12 md:w-3/4 h-[90%] border shadow-lg bg-white">
            <form onSubmit={uploadCategory}>
              <div className="flex flex-col gap-2">
                <label className="text-xl max-md:text-lg ml-1">
                  {editedCategory
                    ? `Edit ${editedCategory.name}`
                    : `Category Name`}
                </label>
                <div className="flex justify-between gap-2">
                  <input
                    type="text"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="py-1 px-4 w-full border-2 rounded-lg outline-none"
                    placeholder="Category"
                    required
                  />

                  <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className=" border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5"
                  >
                    <option value="">No Parent Category</option>

                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className=" flex gap-3">
                  <label className="text-xl max-md:text-lg ml-1">Properties</label>
                  <button
                    type="button"
                    onClick={addProperty}
                    className="bg-gray-400 py-1 px-3 rounded-3xl text-white hover:bg-gray-500"
                  >
                    Add New Property
                  </button>
                </div>
                <div className="w-full">
                  {properties.length > 0 &&
                    properties.map((property, index) => {
                      return (
                        <>
                          <div key={index} className="flex mb-2 gap-2">
                            <input
                              type="text"
                              value={property.name}
                              onChange={(e) => {
                                handlePropertyFunc(
                                  index,
                                  property,
                                  e.target.value
                                );
                              }}
                              className="border outline-none w-[40%] p-1 rounded-md"
                              placeholder="Property Name"
                            />
                            <input
                              type="text"
                              value={property.value}
                              onChange={(e) => {
                                handlePropertyFuncValue(
                                  index,
                                  property,
                                  e.target.value
                                );
                              }}
                              className="border outline-none w-[40%] p-1 rounded-md"
                              placeholder="Value"
                            />
                            <button
                              type="button"
                              onClick={(ev) => {
                                handleButtonclick(index, property);
                              }}
                              className="bg-slate-700 w-[20%] text-white hover:bg-slate-800 p-1 px-3 rounded-lg"
                            >
                              Remove
                            </button>
                          </div>
                        </>
                      );
                    })}
                </div>
                <div className=" flex gap-3">
                  <button
                    type="submit"
                    className="bg-red-500 text-xl max-md:text-sm text-white py-1 px-4 transition-all duration-200 rounded-lg hover:bg-red-700"
                  >
                    Save
                  </button>
                  {editedCategory && (
                    <button
                      type="button"
                      onClick={(ev) => {
                        setEditedCategory(null);
                        setName("");
                        setParentCategory("");
                        setProperties([]);
                      }}
                      className="border-2 border-gray-400 rounded-lg py-1 px-3 hover:bg-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>

            {!editedCategory && (
              <div className=" overflow-auto md:overflow-x-hidden px-1">
                <table className="w-full text-sm text-left border text-gray-500">
                  <thead className="text-xs bg-red-50 border text-gray-900 uppercase">
                    <tr>
                      <th scope="col" className="md:px-6 px-2 py-1 md:py-3 md:text-xl border-r">
                        Category name
                      </th>
                      <th scope="col" className="md:px-6 px-2 py-1 md:py-3 md:text-xl border-r">
                        Parent Category
                      </th>
                      <th
                        scope="col"
                        className="md:px-6 px-2 py-1 md:py-3 md:text-xl border-r"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <th
                          scope="row"
                          className="md:px-6 px-2 py-1 md:py-4 border md:font-medium text-gray-900 md:whitespace-nowrap md:text-lg"
                        >
                          {category.name}
                        </th>
                        <td className="md:px-6 px-2 py-1 md:py-4 border md:text-lg">
                          {category.parent ? category.parent.name : "No Parent"}
                        </td>

                        <td className="md:px-2 px-1 py-2 border md:py-4">
                          <div className="flex gap-2 justify-between">
                            <button
                              onClick={() => {
                                editcat(category);
                              }}
                              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-800 text-white md:text-lg px-2 md:py-1 md:px-3 rounded-xl"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                toggleModal(category);
                              }}
                              className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-700 text-white md:text-lg px-2 py-1 md:px-3 rounded-xl"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>

                              <span>Delete</span>
                            </button>
                            {isOpen && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center">
                                {/* Overlay */}
                                <div
                                  className="fixed inset-0 bg-black opacity-10"
                                  onClick={toggleModal}
                                ></div>

                                {/* Modal */}
                                <div
                                  id="small-modal"
                                  className="relative w-full max-w-md p-4 mx-auto bg-white rounded-lg border"
                                >
                                  {/* Modal header */}
                                  <div className="flex items-center justify-between p-4 border-b rounded-t">
                                    <h3 className="text-xl max-md:text-lg font-medium text-gray-900">
                                      Are you Sure??
                                    </h3>
                                    <button
                                      type="button"
                                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                      onClick={toggleModal}
                                    >
                                      <svg
                                        class="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </button>
                                  </div>
                                  {/* Modal body */}
                                  <div className="p-4 space-y-4">
                                    <p className="text-base leading-relaxed text-gray-700">
                                      {`Do you really want to delete ${selectedCategory.name}!`}
                                    </p>
                                  </div>
                                  {/* Modal footer */}
                                  <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
                                    <button
                                      onClick={() => {
                                        deleteCat(category);
                                      }}
                                      type="button"
                                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                      Yes, Delete
                                    </button>
                                    <button
                                      onClick={toggleModal}
                                      type="button"
                                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </LayoutMain>
    </div>
  );
};

export default page;

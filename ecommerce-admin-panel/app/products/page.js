"use client";
import LayoutMain from "@/components/MainLayout";
import "@/public/Stylesheets/scrollBar.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { toast, Toaster } from "sonner";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [seletedPro, setSeletedPro] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();



  const toggleModal = (Product) => {
    setSeletedPro(Product);
    setIsOpen(!isOpen);
  };
  const deletePro = () => {
    console.log(seletedPro._id);
    const myPromise = async () => {
      let res = await fetch(`/api/findProducts/${seletedPro._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(seletedPro._id),
      });
      if (res.ok) {
        const result = await res.json();
        console.log(result);
      } else {
        console.error("Failed to add product", await res.text());
      }


    };

    myPromise()
      .then(() => {
        toast.success(`Product deleted Successfully`, {
          onAutoClose: () => fecthData(),
          onDismiss: () => fecthData(),
          duration: 1500
        });
      })
      .catch((error) => {
        toast.error("Error Deleting the product");
        console.log(error)
      });


    setIsOpen(!isOpen);


  }



  const fecthData = async () => {
    let res = await fetch("http://localhost:3000/api/getProducts");
    let data = await res.json();
    setProducts(data);
  };



  useEffect(() => {
    fecthData();
  }, [products.length]);


  return (
    <div>
      <LayoutMain>
        <Toaster closeButton position="top-right" richColors />
        <div className="flex gap-5 flex-col h-full overflow-hidden bg-red-50">
          <div className="bg-white m-3 overflow-y-scroll h-full rounded-xl rounded-r-xl shadow-2xl">
            <div className="mx-auto max-w-2xl px-4 py-4 md:px-6 md:py-8 lg:max-w-7xl lg:px-8">
              <div className="flex w-full justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Products
                </h2>
                <Link
                  href="/products/new"
                  className="bg-red-500 text-white hover:bg-red-600 text-xl px-5 py-3 rounded-xl"
                >
                  Add Products
                </Link>
              </div>

              <div className="md:overflow-x-auto my-4 border shadow-md md:rounded-xl">
                <table className="w-full text-sm text-left rtl:text-right  text-gray-500 border">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-5 ">
                    <tr className="bg-red-200">
                      <th scope="col" className="px-6 py-3 font-bold text-sm">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3 font-bold text-sm">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-3 font-bold text-sm">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                        <th
                          scope="row"
                          className="px-3 border py-3 md:px-6 md:py-4 font-semibold text-gray-900 whitespace-nowrap "
                        >
                          <span className="text-pretty">{product.Name}</span>
                        </th>
                        {/* <td className="px-6 py-4"></td> */}
                        {/* <td className="px-6 py-4">{product.description}</td> */}
                        {/* <td className="px-6 py-4">₹{product.Price}</td> */}
                        <td className="px-2 py-3 md:px-6 md:py-4 text-right">

                          <div
                            className="font-medium bg-blue-500 text-white rounded-lg hover:underline hover:bg-blue-600 focus:bg-blue-300 focus:ring-4"
                          >
                            <Link
                              href={"/products/editProducts/" + product._id}
                              className="flex justify-around py-2 px-3 items-center"
                            >
                              <span className="flex gap-2">
                                Edit
                                <HiOutlinePencilAlt className="text-xl" />
                              </span>
                            </Link>
                          </div>
                        </td>
                        <td className="px-2 py-3 md:px-6 md:py-4 text-left">
                          <button
                            onClick={() => {
                              toggleModal(product);
                            }}
                            className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-700 text-white text-lg py-1 px-3 rounded-xl"
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
                                  <h3 className="text-xl font-medium text-gray-900">
                                    Are you Sure??
                                  </h3>
                                  <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    onClick={toggleModal}
                                  >
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 14 14"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                      />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                </div>
                                {/* Modal body */}
                                <div className="p-4 space-y-4">
                                  <p className="text-base leading-relaxed text-gray-700">
                                    {`Do you really want to delete ${seletedPro.Name}!`}
                                  </p>
                                </div>
                                {/* Modal footer */}
                                <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
                                  <button
                                    onClick={() => {

                                      deletePro(product);
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



                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </LayoutMain >
    </div >
  );
};

export default page;

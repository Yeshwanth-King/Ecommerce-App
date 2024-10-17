"use client";

import Link from "next/link";
import "@/public/Stylesheets/style.css";
import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const MenuAdmin = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  let activeLink = "bg-red-500";
  let inactiveLink = "";
  let activeLinkWord = "flex-1 ms-3 whitespace-nowrap text-gray-500 text-white";
  let inactiveLinkWord =
    "flex-1 ms-3 transition-all duration-600 whitespace-nowrap text-gray-500 group-hover:text-white";
  let activeLinkSvg = "w-5 h-5 text-gray-500 transition duration-75 text-white";
  let inactiveLinkSvg =
    "flex-shrink-0 w-5 h-5 transition-all duration-600 text-gray-500 transition duration-75 group-hover:text-white ";

  const logoout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      <button
        onClick={() => {
          setShow(true);
        }}
        className={
          (show ? "hidden" : "") +
          " fixed z-20 bg-red-500 md:hidden transition-all duration-300 hover:bg-red-700 top-6 text-white p-2 rounded-r-lg"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div
        className={
          (show ? "left-0" : "-left-full") +
          " flex z-30 border-r-4 fixed h-full max-md:w-full md:static transition-all duration-500 bg-white border-red-500"
        }
      >
        <aside
          id="default-sidebar"
          className="w-full h-screen transition-transform"
          aria-label="Sidebar"
        >
          <div className="h-full pr-0 overflow-y-auto">
            <ul className="space-y-2 font-medium ">
              <li
                onClick={() => setShow(!show)}
                className="flex items-center justify-between border-b-2 p-3"
              >
                <span></span>
                <span className="text-2xl font-bold text-gray-900">Admin</span>
                <span>
                  <button
                    onClick={() => {
                      setShow(!show);
                    }}
                    className="md:hidden bg-red-500 text-white p-2 rounded-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              </li>

              <li
                onClick={() => setShow(!show)}
                className={pathname === "/" ? activeLink : inactiveLink}
              >
                <Link
                  href="/"
                  className="flex items-center transition-all duration-700 ease-in-out text-gray-900 px-3 py-4 hover:bg-red-500  group"
                >
                  <svg
                    className={
                      pathname === "/"
                        ? activeLinkSvg
                        : inactiveLinkSvg
                    }
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="22" height="22"
                    viewBox="0 0 22 22"
                  >

                    <path d="M17.4167 4.58333V6.41667H13.75V4.58333H17.4167ZM8.25 4.58333V10.0833H4.58333V4.58333H8.25ZM17.4167 11.9167V17.4167H13.75V11.9167H17.4167ZM8.25 15.5833V17.4167H4.58333V15.5833H8.25ZM19.25 2.75H11.9167V8.25H19.25V2.75ZM10.0833 2.75H2.75V11.9167H10.0833V2.75ZM19.25 10.0833H11.9167V19.25H19.25V10.0833ZM10.0833 13.75H2.75V19.25H10.0833V13.75Z"></path>

                  </svg>
                  <span
                    className={
                      pathname === "/" ? activeLinkWord : inactiveLinkWord
                    }
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              <li
                onClick={() => setShow(!show)}
                className={
                  pathname.includes("/inbox") ? activeLink : inactiveLink
                }
              >
                <Link
                  href="/inbox"
                  className="flex items-center transition-all duration-700 ease-in-out text-gray-900 px-3 py-4 hover:bg-red-500  group"
                >
                  <svg
                    className={
                      pathname.includes("/inbox")
                        ? activeLinkSvg
                        : inactiveLinkSvg
                    }
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span
                    className={
                      pathname.includes("/inbox")
                        ? activeLinkWord
                        : inactiveLinkWord
                    }
                  >
                    Inbox
                  </span>
                </Link>
              </li>
              <li
                onClick={() => setShow(!show)}
                className={
                  pathname.includes("/users") ? activeLink : inactiveLink
                }
              >
                <Link
                  href="/users"
                  className="flex items-center transition-all duration-700 ease-in-out text-gray-900 px-3 py-4 hover:bg-red-500  group"
                >
                  <svg
                    className={
                      pathname.includes("/users")
                        ? activeLinkSvg
                        : inactiveLinkSvg
                    }
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span
                    className={
                      pathname.includes("/users")
                        ? activeLinkWord
                        : inactiveLinkWord
                    }
                  >
                    Users
                  </span>
                </Link>
              </li>
              <li
                onClick={() => setShow(!show)}
                className={
                  pathname.includes("/products") ? activeLink : inactiveLink
                }
              >
                <Link
                  href="/products"
                  className="flex items-center transition-all duration-700 ease-in-out text-gray-900 px-3 py-4 hover:bg-red-500  group"
                >
                  <svg
                    className={
                      pathname.includes("/products")
                        ? activeLinkSvg
                        : inactiveLinkSvg
                    }
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  <span
                    className={
                      pathname.includes("/products")
                        ? activeLinkWord
                        : inactiveLinkWord
                    }
                  >
                    Products
                  </span>
                </Link>
              </li>
              <li
                onClick={() => setShow(!show)}
                className={
                  pathname.includes("/orders") ? activeLink : inactiveLink
                }
              >
                <Link
                  href="/orders"
                  className="flex items-center transition-all duration-700 ease-in-out p-2 text-gray-900 px-3 py-4 hover:bg-red-500 group"
                >
                  <svg
                    className={
                      pathname.includes("/orders")
                        ? activeLinkSvg
                        : inactiveLinkSvg
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>

                  <span
                    className={
                      pathname.includes("/orders")
                        ? activeLinkWord
                        : inactiveLinkWord
                    }
                  >
                    Orders
                  </span>
                </Link>
              </li>
              <li
                onClick={() => setShow(!show)}
                className={
                  pathname.includes("/categories") ? activeLink : inactiveLink
                }
              >
                <Link
                  href="/categories"
                  className="flex items-center transition-all duration-700 ease-in-out p-2 text-gray-900 px-3 py-4 hover:bg-red-500 group"
                >
                  {/* <svg
                    className={
                      pathname.includes("/categories")
                        ? activeLinkSvg
                        : inactiveLinkSvg
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg> */}
                  <span
                    className={
                      pathname.includes("/categories")
                        ? activeLinkSvg
                        : inactiveLinkSvg
                    }
                  >
                    <HiAdjustmentsHorizontal className="text-2xl" />
                  </span>

                  <span
                    className={
                      pathname.includes("/categories")
                        ? activeLinkWord
                        : inactiveLinkWord
                    }
                  >
                    Categories
                  </span>
                </Link>
              </li>
              <li onClick={() => setShow(!show)} className={inactiveLink}>
                <Link
                  href="#"
                  onClick={() => logoout()}
                  className="flex items-center transition-all duration-700 ease-in-out text-gray-900 px-3 py-4 hover:bg-red-500  group"
                >
                  <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-white da">
                    <FaSignOutAlt className="size-5" />
                  </span>
                  <span className="flex-1 ms-3 whitespace-nowrap text-gray-500 group-hover:text-white">
                    Log Out
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default MenuAdmin;

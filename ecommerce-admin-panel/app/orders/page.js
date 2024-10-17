"use client";
import LayoutMain from "@/components/MainLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fecthOrders = async () => {
      let response = await axios.get("/api/orders");
      setOrders(response.data);
    };
    fecthOrders();
  }, []);

  return (
    <div>
      <LayoutMain>
        <div className="h-full bg-red-50 flex flex-col gap-10 overflow-x-hidden">
          <h1 className="font-semibold text-3xl text-center mt-5">Orders</h1>
          <div className="w-full px-4">
            {/* Container for the cards */}
            <div className="flex flex-col gap-4 md:hidden">
              {orders.length > 0 &&
                orders.map((order, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                  >
                    <div className="mb-2">
                      <strong>ID:</strong>{" "}
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                    <div
                      className={
                        "mb-2 " +
                        (order.paid ? "text-green-600" : "text-red-600")
                      }
                    >
                      <strong>PAID:</strong> {order.paid ? "YES" : "NO"}
                    </div>
                    <div className="mb-2">
                      <strong>Recipient:</strong> {order.name} <br />
                      {order.email} <br />
                      {order.city}-{order.pincode}
                    </div>
                    <div>
                      <strong>Products:</strong>
                      {order.line_items.map((l, i) => (
                        <div key={i}>
                          {l.price_data.product_data.name} X {l.quantity} =
                          {l.price_data.unit_amount / 100}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Table for larger screens */}
            <div className="hidden md:block">
              <table className="w-full text-sm mb-10  text-gray-500">
                <thead className="text-xs bg-white border-b-2 text-gray-900 uppercase">
                  <tr>
                    <th className="p-3 border-r-2 text-lg font-semibold">ID</th>
                    <th className="p-3 border-r-2 text-lg font-semibold">
                      PAID
                    </th>
                    <th className="p-3 border-r-2 text-lg font-semibold">
                      Recipient
                    </th>
                    <th className="p-3 text-lg font-semibold">Products</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 &&
                    orders.map((order, index) => (
                      <tr key={index} className="bg-white hover:bg-gray-50">
                        <td className="border-r-2 p-2 border-b-2">
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </td>
                        <td
                          className={
                            "border-r-2 p-2 border-b-2 " +
                            (order.paid ? "text-green-600" : "text-red-600")
                          }
                        >
                          {order.paid ? "YES" : "NO"}
                        </td>
                        <td className="border-r-2 p-2 border-b-2">
                          {order.name} <br />
                          {order.email} <br />
                          {order.city}-{order.pincode}
                        </td>
                        <td className="p-2 border-b-2">
                          {order.line_items.map((l, i) => (
                            <div key={i}>
                              {l.price_data.product_data.name} X {l.quantity} =
                              {l.price_data.unit_amount / 100}
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LayoutMain>
    </div>
  );
};

export default page;

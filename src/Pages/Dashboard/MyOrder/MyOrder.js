import React from "react";
import useAuth from "../../../hooks/useAuth";

const MyOrder = ({ order, orders, setOrders }) => {
  const { cus_name, cus_email, price, productName, status, _id } = order;
  console.log(_id);
  const { user, isLoaded, token } = useAuth();
  console.log(user.email);
  const handleCancel = () => {
    if (isLoaded) {
      return "Loading";
    }
    const confirmation = window.confirm(
      "Are you sure you want to cancel the order?"
    );
    const url = `https://hoogtech-server.up.railway.app/orders?id=${_id}&&status=cancelled`;
    if (confirmation) {
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            alert("Order Has Been Cancelled");
            fetch(
              `https://hoogtech-server.up.railway.app/orders?email=${user.email}`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data.status);
                setOrders(data);
              });
          }
        });
    }
  };
  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete the order?"
    );
    const url = `https://hoogtech-server.up.railway.app/orders?id=${_id}`;
    if (confirmation) {
      fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            alert("The order has been deleted");
            fetch(
              `https://hoogtech-server.up.railway.app/orders?email=${user.email}`,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => setOrders(data));
          }
        });
    }
  };
  return (
    <tr>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="text-sm font-medium text-gray-900">{cus_name}</div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{cus_email}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold text-sm rounded-full text-gray-500">
          {productName}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{price}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        {status === "pending" ? (
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            Pending
          </span>
        ) : status === "rejected" || status === "cancelled" ? (
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Cancelled
          </span>
        ) : (
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Shipped
          </span>
        )}
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div className="flex">
          <button
            onClick={handleCancel}
            className="mr-3 px-3 text-sm font-semibold py-1 bg-yellow-100 text-yellow-800"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-3 text-sm font-semibold py-1 bg-red-100 text-red-800"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyOrder;

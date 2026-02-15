import { useEffect, useState } from "react";
import api from "../api/axios";
import profile from "../assets/profile_icon.png";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
 const handleStatusChange = async (orderId, newStatus) => {
  try {
    await api.patch(`/orders/${orderId}`, {
      status: newStatus,
    });

  
    fetchOrders();

  } catch (err) {

    if (err.response?.status === 400) {
      alert("Invalid status flow ");
    } else {
      console.log(err);
      alert("Something went wrong ");
    }
  }
};


  return (
    <div className="p-3">

      <h2 className="text-3xl font-bold mb-8 text-center">
        Orders Dashboard
      </h2>

      <div className="space-y-2">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <img
                src={profile}
                className="w-10 h-10 rounded-full object-cover"
                alt="profile"
              />

              <div>
                <h3 className="font-semibold">
                  {order.customer_name}
                </h3>

                <p className="text-sm text-gray-500">
                  📞 {order.whatsapp_number}
                </p>
              </div>

            </div>

            {/* ITEMS */}
            <div className="font-medium text-gray-700">
              {order.item_name}
            </div>

            {/* TIME (not available in backend) */}
            <div className="text-gray-500">
              Order placed
            </div>

            {/* AMOUNT (not available in backend) */}
            <div className="text-orange-600 font-bold">
              $ :{order.total_price}
            </div>

            {/* STATUS */}
            <select
              value={order.status}
              onChange={(e) =>
                handleStatusChange(order.id, e.target.value)
              }
              className="border rounded-lg px-3 py-2"
            >
             
  <option value="pending">pending</option>
  <option value="preparing">preparing</option>
  <option value="out-for-delivery">out for Delivery</option>
  <option value="delivered">delivered</option>
            </select>

          </div>
        ))}

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No orders yet 📭
          </p>
        )}

      </div>
    </div>
  );
};

export default Orders;


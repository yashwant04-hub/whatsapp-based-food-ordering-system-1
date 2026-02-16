import { useEffect, useState } from "react";
import api from "../api/axios";
import stars from "../assets/rating_starts.png";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    available: true,
    image: null,
    preview: null,
  });

  
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/menu/");
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

 
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      setForm((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.desc);
    formData.append("price", Number(form.price));
    formData.append("available", form.available);
    formData.append("image", form.image);

    try {
      await api.post("/menu/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Item added ");

      setForm({
        name: "",
        desc: "",
        price: "",
        available: true,
        image: null,
        preview: null,
      });

      fetchMenu();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-center"> Our Menu</h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {menu.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow hover:shadow-2xl transition hover:-translate-y-2"
          >
            <img
              src={`http://127.0.0.1:8000/uploads/${item.image}`}
              alt={item.name}
              className="w-full h-44 object-cover rounded-t-2xl"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/300x200?text=Food")
              }
            />

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-sm text-gray-500">
                {item.description}
              </p>

              <img src={stars} className="w-24" />

              <div className="flex justify-between items-center">
                <span className="text-orange-600 font-bold">
                  ₹{item.price}
                </span>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.available ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="mt-16 bg-white p-8 rounded-2xl shadow max-w-2xl mx-auto">
       
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-orange-500 transition mb-6"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />

          <label htmlFor="imageUpload" className="cursor-pointer">
            {form.preview ? (
              <img
                src={form.preview}
                className="w-32 h-32 object-cover mx-auto rounded-lg"
              />
            ) : (
              <p className="text-gray-500">
                Drag & Drop Food Image Here <br />
                or Click to Upload
              </p>
            )}
          </label>
        </div>

        <h3 className="text-2xl font-bold mb-6 text-center">
           Add New Food Item
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Food Name"
            className="w-full border p-3 rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded"
            value={form.desc}
            onChange={(e) =>
              setForm({ ...form, desc: e.target.value })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-3 rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-3 rounded"
            value={form.available}
            onChange={(e) =>
              setForm({
                ...form,
                available: e.target.value === "true",
              })
            }
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

          <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Menu;

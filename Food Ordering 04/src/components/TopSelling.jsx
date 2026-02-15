import React from 'react'
import biryani from "../assets/image8.avif";
import kfc from "../assets/image20.avif";
import friedRice from "../assets/image23.avif";

const TopSelling = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-middle mb-8 mt-12">
  Top Selling Items
</h2>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
       
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          <img src={biryani} className="w-full h-48 object-cover" />
    
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">
              Hyderabadi Chicken Dum Biryani
            </h3>
    
            <p className="text-sm text-gray-500">
              Authentic aromatic biryani cooked with rich spices.
            </p>
    
            <div className="flex justify-between items-center">
              <span className="text-orange-600 font-bold">₹249</span>
              <span className="text-green-600 text-sm font-medium">
                Available
              </span>
            </div>
          </div>
        </div>
    
       
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          <img src={kfc} className="w-full h-48 object-cover" />
    
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">KFC Chicken</h3>
    
            <p className="text-sm text-gray-500">
              Crispy fried chicken with signature seasoning.
            </p>
    
            <div className="flex justify-between items-center">
              <span className="text-orange-600 font-bold">₹199</span>
              <span className="text-green-600 text-sm font-medium">
                Available
              </span>
            </div>
          </div>
        </div>
    
       
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          <img src={friedRice} className="w-full h-48 object-cover" />
    
          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">
              Special Chicken Fried Rice
            </h3>
    
            <p className="text-sm text-gray-500">
              Wok tossed rice with juicy chicken and sauces.
            </p>
    
            <div className="flex justify-between items-center">
              <span className="text-orange-600 font-bold">₹179</span>
              <span className="text-green-600 text-sm font-medium">
                Available
              </span>
            </div>
          </div>
        </div>
    
      </div>
    </div>
    
  )
}

export default TopSelling
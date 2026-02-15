import React from 'react'
import stars from "../assets/rating_starts.png";
import user1 from "../assets/member.jpg";
import user2 from "../assets/avatar2.jpg";
import user3 from "../assets/tabo.jpg";



   const Reviews = () => {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-10 text-center">
         Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">

          <img
            src={user1}
            className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-orange-100"
          />

          <img src={stars} className="w-28 mx-auto mt-3" />

          <p className="text-gray-600 mt-4">
            The food was absolutely delicious and the delivery was super fast.
            Highly recommended!
          </p>

          <h4 className="mt-4 font-semibold text-orange-600">
            Rahul Sharma
          </h4>
        </div>

       
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">

          <img
            src={user2}
            className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-orange-100"
          />

          <img src={stars} className="w-28 mx-auto mt-3" />

          <p className="text-gray-600 mt-4">
            Loved the ambiance and the Hyderabadi biryani was top notch.
            Will order again!
          </p>

          <h4 className="mt-4 font-semibold text-orange-600">
            Anjali Verma
          </h4>
        </div>

      
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">

          <img
            src={user3}
            className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-orange-100"
          />

          <img src={stars} className="w-28 mx-auto mt-3" />

          <p className="text-gray-600 mt-4">
            Best restaurant experience! Special chicken fried rice is a must try.
          </p>

          <h4 className="mt-4 font-semibold text-orange-600">
            Kiran Kumar
          </h4>
        </div>

      </div>
    </div>
  );
};



export default Reviews

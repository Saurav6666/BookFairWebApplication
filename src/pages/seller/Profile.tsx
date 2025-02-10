import React, { useState } from "react";
import Layout from "../../components/Layout";
import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/solid";

interface Seller {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage?: string;
}

const BookSellerProfile = () => {
  const [seller, setSeller] = useState<Seller>({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Book Street, Booktown, BK 45678",
    profileImage: "",
  });

  return (
    <Layout>
      <>
        {/* Profile Header */}
        <div className="flex items-center space-x-6">
          {seller.profileImage ? (
            <img
              src={seller.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="w-24 h-24 text-gray-400" />
          )}
          <div>
            <h2 className="text-2xl font-bold">{seller.name}</h2>
            <p className="text-gray-500">{seller.email}</p>
          </div>
          <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <PencilSquareIcon className="w-5 h-5" />
            <span>Edit</span>
          </button>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="text-gray-600">Full Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg"
              value={seller.name}
              disabled
            />
          </div>
          <div>
            <label className="text-gray-600">Phone</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg"
              value={seller.phone}
              disabled
            />
          </div>
          <div>
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-lg"
              value={seller.email}
              disabled
            />
          </div>
          <div>
            <label className="text-gray-600">Address</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg"
              value={seller.address}
              disabled
            />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default BookSellerProfile;

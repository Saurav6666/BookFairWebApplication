import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { userinfo } from "./Utils";

const Profile = () => {
  const [user, setUser] = useState<userinfo | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    shopname: "",
    password: "",
    logo: "",
    logoBase64: "",
    profilepictureBase64: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "");
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setEditing(false);
  };

  return (
    <Layout>
      <div className=" p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          {formData.profilepictureBase64 ? (
            <img
              src={formData.profilepictureBase64}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="w-24 h-24 text-gray-400" />
          )}
          <div>
            <h2 className="text-2xl font-bold">{formData.name}</h2>
            <p className="text-gray-500">{formData.email}</p>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <PencilSquareIcon className="w-5 h-5" />
            <span>{editing ? "Cancel" : "Edit"}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {Object.keys(formData).map(
            (key) =>
              key !== "role" &&
              key !== "logo" &&
              key !== "shopname" &&
              key !== "logoBase64" &&
              key !== "profilepictureBase64" &&
              key !== "profilepicture" &&
              key !== "confirmpasword" && (
                <div key={key}>
                  <label className="text-gray-600 capitalize">{key}</label>
                  <input
                    type="text"
                    name={key}
                    className="w-full p-2 mt-1 border rounded-lg"
                    value={formData[key] || ""}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              )
          )}
        </div>
        {editing && (
          <button
            onClick={handleSave}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Profile;

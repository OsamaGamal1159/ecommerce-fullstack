import React, { useState } from "react";

const UserMangement = () => {
  const users = [
    {
      name: "Osama",
      email: "Osama123@gmail.com",
      role: "admin",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Mangement </h2>
    </div>
  );
};

export default UserMangement;

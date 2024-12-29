import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ contacts, setAddContact }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: "",
  });

  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg";
  const [profileImage, setProfileImage] = useState(null); // To store the selected file
  const [preview, setPreview] = useState(defaultImage); // For image preview

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setProfileImage(file);

      // Generate a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!formData.name || !formData.username || !formData.email || !formData.password){
      setError("Please fill in all fields");
      console.log({ error });
      return;
    }

    // If validation passes, clear error and process form
    setError(""); // Clear error message

    setPreview(defaultImage); // Clear image preview
    setProfileImage(null); // Clear selected file
    contacts.push({
      image: preview,
      name: formData.name,
      phone: formData.phone,
      altnumber: formData.altNumber,
      email: formData.email,
      address: formData.address,
    });
    setFormData({
      name: "",
      phone: "",
      altNumber: "",
      email: "",
      address: "",
    });
  };

  return (
    <div className="flex justify-center w-full h-full min-h-screen items-center bg-gradient-to-b from-black to-gray-800">
      <div className="p-2 flex flex-col items-center shadow-2xl h-full justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center  gap-4 p-2 rounded-2xl border w-4/5 md:w-3/5"
        >
          <div>
            {error && (
              <div className="bg-red-500 text-white p-4 rounded-lg text-center mt-4">
                {error}
              </div>
            )}
          </div>
          <p className="text-center text-[#64ffda] text-3xl">Register</p>

          {/* Image Preview */}
          {preview && (
            <div className="flex items-end">
              <img
                src={preview}
                alt="Profile Preview"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
              <div className="relative flex items-center justify-center gap-2 p-3 bg-[#1d2526] rounded-xl shadow-xl w-10">
                <input
                  className="fas fa-image bg-transparent border-none outline-none w-full text-[#2fb1bc]"
                  type="file"
                  capture="user"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          )}
          <div className="flex items-center border justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-xl w-full max-w-md">
            <i className="fas fa-user text-[#64ffda]"></i>
            <input
              required
              placeholder="Full Name"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-message text-[#64ffda]"></i>
            <input
              required
              placeholder="Email"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-user text-[#64ffda]"></i>
            <input
              required
              placeholder="Username"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-lock text-[#64ffda]"></i>
            <input
              required
              placeholder="Password"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-lock text-[#64ffda]"></i>
            <input
              required
              placeholder="Confirm Password"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="password"
              name="password"
              value={formData.password}
            />
          </div>
          <div className="flex justify-evenly items-center gap-4">
            <button
              onClick={handleSubmit}
              type="submit"
              className="cursor-pointer py-3 px-6 rounded-xl border border-[#64ffda] text-[#64ffda] font-bold transition-all duration-300 hover:bg-[#64ffda] hover:text-black hover:shadow-inner"
            >
              SignUp
            </button>
            <div className="text-white flex flex-col text-sm">
              Already have an account?
              <Link className="cursor-pointer text-[#64ffda] font-bold transition-all duration-300  hover:text-white"  to="/login" >Login</Link>
            </div>
          </div>
        </form>
        <Link to="/" className="custom-btn mt-4">Home</Link>
      </div>
    </div>
  );
};

export default Form;

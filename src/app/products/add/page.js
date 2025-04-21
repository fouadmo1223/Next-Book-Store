"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePercent: "",
    isNew: false,
    images: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    salePercent: "",
    images: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Book name is required";
        else if (value.length > 100)
          error = "Name must be less than 100 characters";
        break;
      case "description":
        if (!value.trim()) error = "Description is required";
        else if (value.length > 500)
          error = "Description must be less than 500 characters";
        break;
      case "price":
        if (!value) error = "Price is required";
        else if (isNaN(value) || parseFloat(value) <= 0)
          error = "Price must be a positive number";
        break;
      case "salePercent":
        if (
          value &&
          (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)
        ) {
          error = "Sale must be between 0 and 100";
        }
        break;
      case "images":
        if (value.length === 0) error = "At least one image is required";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Validate field on change
    if (name !== "isNew") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, fieldValue),
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));

    // Add new previews and files to existing ones
    setPreviewImages((prev) => [...prev, ...previews]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    // Validate images
    setErrors((prev) => ({
      ...prev,
      images: validateField("images", [...formData.images, ...files]),
    }));

    // Reset file input
    e.target.value = null;
  };

  const removeImage = (index) => {
    const newPreviews = [...previewImages];
    const newImages = [...formData.images];

    // Revoke the object URL
    URL.revokeObjectURL(newPreviews[index]);

    newPreviews.splice(index, 1);
    newImages.splice(index, 1);

    setPreviewImages(newPreviews);
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));

    // Validate images after removal
    setErrors((prev) => ({
      ...prev,
      images: validateField("images", newImages),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      description: validateField("description", formData.description),
      price: validateField("price", formData.price),
      salePercent: validateField("salePercent", formData.salePercent),
      images: validateField("images", formData.images),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const formPayload = new FormData();

    // Append all non-image fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") {
        formPayload.append(key, value);
      }
    });

    // Append each image file
    formData.images.forEach((image) => {
      formPayload.append("images", image);
    });

    console.log("Form Data:", {
      ...Object.fromEntries(formPayload),
      images: formData.images.map((img) => img.name),
    });

    try {
      // Example API call (uncomment to use)
      /*
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formPayload
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      */

      // Show success toast
      toast.success(
        `Book added successfully with ${formData.images.length} images!`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        salePercent: "",
        isNew: false,
        images: [],
      });
      setPreviewImages([]);
      setErrors({
        name: "",
        description: "",
        price: "",
        salePercent: "",
        images: "",
      });
    } catch (error) {
      console.error("Error:", error);
      // Show error toast
      toast.error("There was an error submitting the Book.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Modern Animated Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400 sm:text-5xl mb-3">
            Add New Book
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 font-medium"
          >
            Expand your collection with{" "}
            <span className="text-blue-500">premium items</span>
          </motion.p>
        </motion.div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Illustration Side */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-10">
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3344/3344376.png"
                    alt="Product Illustration"
                    className="w-64 h-64 mx-auto mb-6 drop-shadow-lg"
                  />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Upload Book Images
                </h3>
                <p className="text-gray-600 mt-3 max-w-md">
                  Upload high-quality images (JPG, PNG, WEBP)
                </p>
                {previewImages.length > 0 && (
                  <p className="text-blue-600 font-medium mt-2">
                    {previewImages.length} image(s) selected
                  </p>
                )}
              </div>
            </div>

            {/* Form Side */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-full md:w-1/2 p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Book Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      } rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="salePercent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Sale (%)
                    </label>
                    <input
                      type="number"
                      id="salePercent"
                      name="salePercent"
                      min="0"
                      max="100"
                      value={formData.salePercent}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${
                        errors.salePercent
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.salePercent && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.salePercent}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Book Images
                  </label>
                  <div
                    className={`mt-1 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed ${
                      errors.images ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-6 pt-5 pb-6`}
                    onClick={(e) => {
                      if (e.target.innerHTML !== "Upload images")
                        document.getElementById("file-upload").click();
                    }}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm cursor-pointer text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload images</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            multiple
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                  </div>
                  {errors.images && (
                    <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                  )}
                </div>

                {/* Image Previews */}
                {previewImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Selected Images ({previewImages.length})
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className="h-24 w-full object-cover rounded-md border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            title="Remove image"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isNew"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isNew"
                    className="ml-3 block text-sm text-gray-700"
                  >
                    Mark as New Arrival
                  </label>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-1/4 flex justify-center py-4 px-6 cursor-pointer rounded-xl shadow-sm text-sm
                     font-semibold transition-all duration-300 ${
                       isSubmitting
                         ? "bg-gray-300 cursor-not-allowed"
                         : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                     }`}
                  >
                    {isSubmitting ? "Adding..." : "Add Book"}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

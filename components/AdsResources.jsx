import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const AdsResources = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const resources = [
    {
      name: "Yoga",
      color: "text-blue-500 hover:text-white hover:bg-blue-500",
      border: "border-blue-500",
    },
    {
      name: "Ayurveda",
      color: "text-green-500 hover:text-white hover:bg-green-500",
      border: "border-green-500",
    },
    {
      name: "Healing",
      color: "text-yellow-500 hover:text-white hover:bg-yellow-500",
      border: "border-yellow-500",
    },
  ];

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setIsPopupOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const checkRes = await fetch("/api/sampleReport", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
        type: selectedResource.name,
      }),
    });
    setloading(false);
    toast.success("Resource Send to Email", {
      position: "top-right",
      autoClose: 3000,
    });

    const res = await fetch("/api/getResources", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
        type: selectedResource.name,
      }),
    });
    setFormData({ name: "", email: "" });
    setIsPopupOpen(false);
    setSelectedResource(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='px-8 md:px-20 py-5' id='realresources'>
      <div className='w-full border-4 p-5 rounded-xl border-blue-500 relative'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[80%] text-3xl -translate-y-1/2 bg-gray-50 px-3 py-1 rounded-xl font-semibold text-center md:text-4xl'>
          Resources Library
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-3'>
          {resources.map((re, index) => (
            <div
              key={index}
              className='w-full flex flex-col items-center gap-5'
            >
              <div className='w-[60%] md:w-[80%] aspect-square relative'>
                <Image
                  src={`/images/resources${index + 1}.png`}
                  fill
                  alt='resource'
                  className='object-cover pointer-events-none'
                />
              </div>
              <h1
                className={`text-2xl md:text-3xl text-center font-extrabold ${re.color}`}
              >
                {re.name}
              </h1>
              <button
                className={`px-6 py-3 ${re.color} border ${re.border} rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg`}
                onClick={() => handleDownloadClick(re)}
              >
                Download Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 px-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 hover:scale-102 relative'>
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-2xl'>
              <h2 className='text-2xl md:text-3xl font-bold text-white text-center'>
                Download Now
              </h2>
              <p className='text-blue-100 text-center mt-1 text-sm'>
                Enter your details to get the resource
              </p>
            </div>

            <form onSubmit={handleSubmit} className='p-6 space-y-5'>
              <div className='relative'>
                <label
                  htmlFor='name'
                  className='text-gray-700 font-semibold block mb-2'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50'
                  placeholder='Enter your name'
                  required
                />
              </div>

              <div className='relative'>
                <label
                  htmlFor='email'
                  className='text-gray-700 font-semibold block mb-2'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200 bg-gray-50'
                  placeholder='Enter your email'
                  required
                />
              </div>

              <div className='flex justify-end gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => setIsPopupOpen(false)}
                  className='px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all duration-200 transform hover:-translate-y-0.5'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg'
                >
                  Get Resource
                </button>
              </div>
            </form>

            {loading && (
              <div className='absolute inset-0 bg-gray-900 bg-opacity-70 rounded-2xl flex items-center justify-center'>
                <div className='text-center'>
                  <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
                  <p className='text-white text-lg font-semibold'>
                    Loading Resource...
                  </p>
                  <p className='text-blue-200 text-sm mt-2'>
                    Please wait a moment
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsResources;

import React from "react";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center dark:text-white">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <h2 className="font-semibold text-lg mb-4">Menu</h2>

        <div className="grid gap-2 ">
          <button onClick={onClose} className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800  rounded-md">Home</button>
          <button onClick={onClose} className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Wishlists</button>
          <button onClick={onClose} className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Trips</button>
          <button onClick={onClose} className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Messages</button>
          <hr className="my-2 border-gray-300 dark:border-gray-700" />
          <button onClick={onClose} className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Airbnb your home</button>
          <button onClick={onClose} className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Help Center</button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

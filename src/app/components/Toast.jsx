"use client";
import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(), 400);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div className={`fixed top-6 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-[100] animate-fade-in`}>
      {message}
    </div>
  );
}

"use client";

import { useLoading } from "@/context/LoadingContext";

const Loader = () => {
  const { loading } = useLoading();

  if (!loading) return null; // ✅ Hide when not loading

  return (
    <div className=" flex items-center justify-center  z-50">
      <div className="spinner center">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    </div>
  );
};

export default Loader;

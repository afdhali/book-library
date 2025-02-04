"use client";
import React from "react";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  type?: string;
  accept?: string;
  placeholder?: string;
  folder?: string;
  variant?: "dark" | "light";
  onFileChange: (value: string) => void;
}

const FileUpload = ({
  type = "file",
  accept,
  placeholder = "Choose a file",
  variant = "light",
  onFileChange,
}: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Untuk testing, kita buat URL dummy
      const dummyUrl = `https://storage.example.com/uploads/${file.name}`;
      onFileChange(dummyUrl);
    }
  };

  return (
    <div className="w-full">
      <Input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className={`cursor-pointer ${
          variant === "dark"
            ? "bg-dark-600 text-light-100"
            : "bg-light-100 text-dark-100"
        }`}
        placeholder={placeholder}
      />
      <p className="mt-1 text-xs text-light-500">
        Allowed formats: {accept || "*"}
      </p>
    </div>
  );
};

export default FileUpload;

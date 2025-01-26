import React from "react";

interface FileUploadProps {
  selectedFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  onFileChange,
  onFileRemove,
}) => (
  <div className="mb-4">
    <label htmlFor="image" className="block text-sm font-medium mb-2">
      Choose File
    </label>
    <label
      htmlFor="image"
      className="w-full dark:text-white bg-white text-[#450920] border rounded-3xl font-bold py-2 px-4 border-[#450920] dark:border-slate-400 focus:dark:bg-slate-800 dark:bg-[#C4D7F2] cursor-pointer text-center"
    >
      Choose file
    </label>
    <input
      type="file"
      id="image"
      name="image"
      accept="image/*"
      onChange={onFileChange}
      className="hidden"
    />
    {selectedFile && (
      <div className="mt-4 relative">
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Selected Preview"
          className="m-auto w-[250px] h-[250px] object-cover rounded-xl border-[2px] border-[#450920]"
        />
        <button
          type="button"
          onClick={onFileRemove}
          className="absolute top-0 w-8 h-8 hover:opacity-35 right-6 bg-slate-700 text-red-500 dark:bg-white rounded-[50%] p-1"
        >
          &times;
        </button>
      </div>
    )}
  </div>
);

export default FileUpload;

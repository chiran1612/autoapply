import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ResumeUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUploadSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`glass-morphism p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive ? 'border-primary-500 scale-105 shadow-2xl' : 'border-slate-700 hover:border-primary-400 hover:bg-white/5'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-primary-500/10 text-primary-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
            </h3>
            <p className="text-slate-400">
              Drag & drop your PDF or DOCX file here, or click to browse
            </p>
          </div>
          {uploading && (
            <div className="mt-4 w-full flex flex-col items-center">
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 animate-loading-bar" style={{width: '60%'}}></div>
              </div>
              <p className="text-sm mt-2 text-primary-400">Analyzing your profile with AI...</p>
            </div>
          )}
          {error && (
            <p className="mt-4 text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">{error}</p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          AI Powered Analysis
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Secure & Private
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          Instant Profile Generation
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;

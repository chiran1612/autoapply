import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
      const response = await axios.post('http://localhost:8080/api/resume/upload', formData, {
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
        className={`glass-panel p-12 text-center cursor-pointer transition-all duration-300 group ${
          isDragActive ? 'border-primary-500 scale-[1.02] bg-primary-500/5' : 'hover:border-primary-500/50 hover:bg-white/2'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-6">
          <div className={`p-5 rounded-2xl bg-primary-600/10 text-primary-400 group-hover:scale-110 transition-transform ${uploading ? 'animate-pulse' : ''}`}>
            {uploading ? <Loader2 size={40} className="animate-spin" /> : <UploadCloud size={40} />}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {isDragActive ? 'Release to upload' : 'Drop your resume here'}
            </h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              Drag & drop your PDF or DOCX file, or click to browse. We'll analyze it with AI instantly.
            </p>
          </div>

          {uploading && (
            <div className="w-full max-w-xs space-y-3">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 w-[60%] rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs font-bold text-primary-400 uppercase tracking-widest">Analyzing with AI...</p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-400/10 text-red-400 rounded-lg text-sm font-medium">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-primary-500" />
          AI Analysis
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-primary-500" />
          ATS Optimized
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-primary-500" />
          Secure Encryption
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;

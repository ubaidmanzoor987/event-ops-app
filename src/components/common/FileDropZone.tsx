'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@/lib/cn'; 

interface FileDropzoneProps {
  onFileUpload: (file: File) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': [],
      'image/png': [],
      'image/jpeg': [],
      'image/gif': [],
    },
    maxFiles: 1,
    maxSize: 800 * 400, // this is in bytes (you may need to adjust this)
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer w-full',
        isDragActive ? 'border-brand' : 'border-brand'
      )}
    >
      <input {...getInputProps()} />
      {/* <div className="mb-4">
        <DragDropIcon className="fill-none h-12 w-12" />
      </div> */}
      <p className="text-center text-sm text-muted-foreground">
        <span className="text-brand font-semibold cursor-pointer">
          Click to upload
        </span>{' '}
        or drag and drop
      </p>
      <p className="text-center text-xs text-muted-foreground mt-1">
        SVG, PNG, JPG or GIF (max. 800×400px)
      </p>
    </div>
  );
};

export default FileDropzone;

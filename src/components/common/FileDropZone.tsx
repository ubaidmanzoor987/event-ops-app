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
    maxSize: 1024 * 1024, // this is in bytes (you may need to adjust this)
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'bg-accent rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer w-full'
      )}
    >
      <input {...getInputProps()} data-cy="event-image" />
      <p className="text-center text-sm text-subheadingColor">
        <span className="font-extrabold cursor-pointer underline">
          Click to upload
        </span>{' '}
        or drag and drop
      </p>
      <p className="text-center text-xs text-subheadingColor mt-1">
        SVG, PNG, JPG or GIF (recommended size 1024 x 1024px)
      </p>
    </div>
  );
};

export default FileDropzone;

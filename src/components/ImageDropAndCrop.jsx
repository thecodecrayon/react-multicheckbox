import React, { useCallback, useEffect, useState } from 'react';
import "./ImageDropAndCrop.css";
import { useDropzone } from 'react-dropzone';

function ImageDropAndCrop({ onSave }) {
  
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prevState => [...prevState, reader.result]);
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg'],
    },
  });

  const handleImageDelete = (image) => {
    let temp = [...images];
    temp.splice(temp.indexOf(image), 1);
    setImages(temp);
  }

  useEffect(() => {
    onSave(images);
  }, [images]);

  return (
    <div>
      <div 
        className="dropzone"
        {...getRootProps()}>
        <input {...getInputProps()} />
        { isDragActive ? "Drag Active": "Drop files here." }
      </div>
      {images.length > 0 && 
      <div>
        { images.map((image, index) => 
            <span
              key={index}  
              onClick={() => handleImageDelete(image)}>
              <img 
                src={image} 
                alt=""
                className="selected-images" />
            </span>
         )}
      </div>}
    </div>
  );
}

export default ImageDropAndCrop;
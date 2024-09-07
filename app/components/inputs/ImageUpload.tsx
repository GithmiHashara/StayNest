'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      console.log(result);  // Check the result object here
      onChange(result.info.secure_url)  // Ensure this is the correct path
    },
    [onChange]
  )

  return (
    <CldUploadWidget
      onSuccess={handleUpload} // This is the callback function that will be called when the upload is successful
      uploadPreset="cs63xgsz"
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload

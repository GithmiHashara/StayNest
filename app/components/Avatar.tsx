'use client ';

import Image from 'next/image';

// interface AvatarProps {
//   src: string | null | undefined
// }

//const Avatar: React.FC<AvatarProps> = ({ src }) => {
    const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src= '/images/placeholder.jpg'
    />
  )
}

export default Avatar;

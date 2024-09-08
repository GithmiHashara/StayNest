'use client' // To run this component in the client-side only

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { MdOutlineVilla } from 'react-icons/md'
import { FaCity, FaHome, FaMountain, FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { GiCactus, GiBarn, GiForestCamp, GiCaveEntrance, GiCastle, GiBoatFishing, GiIsland, GiWindmill, GiAncientSword, GiFarmTractor, GiGrapes, GiTreehouse, GiWaveSurfer } from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { GiPianoKeys } from 'react-icons/gi';
import { FaTree } from 'react-icons/fa';
import { MdBeachAccess } from 'react-icons/md';
import Container from '../Container'
import CategoryBox from '../CategoryBox'
import { AiOutlineEye } from 'react-icons/ai'
import { useSearchParams, usePathname } from 'next/navigation'

export const categories = [
  { label: 'Beach', icon: TbBeach, description: 'This property is close to the beach!' },
  { label: 'Windmills', icon: GiWindmill, description: 'This property has windmills!' },
  { label: 'Modern', icon: MdOutlineVilla, description: 'This property is modern!' },
  { label: 'Countryside', icon: TbMountain, description: 'This property is in the countryside!' },
  { label: 'Pools', icon: TbPool, description: 'This is property has a beautiful pool!' },
  { label: 'Islands', icon: GiIsland, description: 'This property is on an island!' },
  { label: 'Lake', icon: GiBoatFishing, description: 'This property is near a lake!' },
  { label: 'Skiing', icon: FaSkiing, description: 'This property has skiing activities!' },
  { label: 'Castles', icon: GiCastle, description: 'This property is an ancient castle!' },
  { label: 'Caves', icon: GiCaveEntrance, description: 'This property is in a spooky cave!' },
  { label: 'Camping', icon: GiForestCamp, description: 'This property offers camping activities!' },
  { label: 'Arctic', icon: BsSnow, description: 'This property is in an arctic environment!' },
  { label: 'Desert', icon: GiCactus, description: 'This property is in the desert!' },
  { label: 'Barns', icon: GiBarn, description: 'This property is in a barn!' },
  { label: 'Lux', icon: IoDiamond, description: 'This property is brand new and luxurious!' },
  { label: 'Piano', icon: GiPianoKeys, description: 'Discover properties with elegant pianos for music enthusiasts and gatherings.' },
  { label: 'National Parks', icon: FaTree, description: 'Explore properties near breathtaking national parks and natural wonders.' },
  { label: 'Tropical', icon: MdBeachAccess, description: 'Find properties in lush, tropical settings perfect for relaxation and adventure.' },
  
  
  {
    label: 'Treehouse',
    icon: GiTreehouse, // You can replace with a relevant icon
    description: 'This property is a unique treehouse!'
  },
  {
    label: 'Surfing',
    icon: GiWaveSurfer, // You can replace with a relevant icon
    description: 'This property is on a beautiful lakefront!'
  },
    {
    label: 'Amazing View',
    icon: AiOutlineEye, // You can replace with a relevant icon
    description: 'This property offers an amazing view!'
  },
  {
    label: 'Historical',
    icon: GiAncientSword, // You can replace with a relevant icon
    description: 'This property has a rich history!'
  },
  {
    label: 'City view',
    icon: FaCity, // You can replace with a relevant icon
    description: 'This property is in the heart of the city!'
  },
  {
    label: 'Mountain View',
    icon: FaMountain, // You can replace with a relevant icon
    description: 'This property offers a scenic mountain view!'
  },
  {
    label: 'Tiny House',
    icon: FaHome, // You can replace with a relevant icon
    description: 'This property is a cozy tiny house!'
  },
  {
    label: 'Farm Stay',
    icon: GiFarmTractor, // You can replace with a relevant icon
    description: 'This property offers a farm stay experience!'
  },
  {
    label: 'Vineyards',
    icon: GiGrapes, // You can replace with a relevant icon
    description: 'This property is surrounded by vineyards!'
  }
  
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname(); // Get the current pathname

  const isMainPage = pathname === '/'; // Check if the current page is the main page
   if (!isMainPage) {
    return null; // If not, return null
  } 

  return (
    <Container>
      {/* Flex container with scrolling enabled */}
      
      <div className="pt-4 flex flex-row items-center justify-start space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-transparent ">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
           selected={category === item.label} // Pass the selected prop
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;



// 'use client'

// //import { useSearchParams, usePathname } from 'next/navigation'

// import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
// import { MdOutlineVilla } from 'react-icons/md'
// import { FaSkiing } from 'react-icons/fa'
// import { BsSnow } from 'react-icons/bs'
// import { GiCactus, GiBarn, GiForestCamp, GiCaveEntrance, GiCastle, GiBoatFishing, GiIsland, GiWindmill} from 'react-icons/gi'
// import { IoDiamond } from 'react-icons/io5'

// import Container from '../Container'
// import CategoryBox from '../CategoryBox'

// export const categories = [
//     {
//         label :'Beach',
//         icon : TbBeach,
//         description: 'This property is close to the beach! '
//     },
//     {
//         label: 'Windmills',
//         icon: GiWindmill,
//         description: 'This property is has windmills!'
//       },
//       {
//         label: 'Modern',
//         icon: MdOutlineVilla,
//         description: 'This property is modern!'
//       },
//       {
//         label: 'Countryside',
//         icon: TbMountain,
//         description: 'This property is in the countryside!'
//       },
//       {
//         label: 'Pools',
//         icon: TbPool,
//         description: 'This is property has a beautiful pool!'
//       },
//       {
//         label: 'Islands',
//         icon: GiIsland,
//         description: 'This property is on an island!'
//       },
//       {
//         label: 'Lake',
//         icon: GiBoatFishing,
//         description: 'This property is near a lake!'
//       },
//       {
//         label: 'Skiing',
//         icon: FaSkiing,
//         description: 'This property has skiing activies!'
//       },
//       {
//         label: 'Castles',
//         icon: GiCastle,
//         description: 'This property is an ancient castle!'
//       },
//       {
//         label: 'Caves',
//         icon: GiCaveEntrance,
//         description: 'This property is in a spooky cave!'
//       },
//       {
//         label: 'Camping',
//         icon: GiForestCamp,
//         description: 'This property offers camping activities!'
//       },
//       {
//         label: 'Arctic',
//         icon: BsSnow,
//         description: 'This property is in arctic environment!'
//       },
//       {
//         label: 'Desert',
//         icon: GiCactus,
//         description: 'This property is in the desert!'
//       },
//       {
//         label: 'Barns',
//         icon: GiBarn,
//         description: 'This property is in a barn!'
//       },
//       {
//         label: 'Lux',
//         icon: IoDiamond,
//         description: 'This property is brand new and luxurious!'
//       },


      
// ]

// const Categories = () => {

//     //to show a selected option of it self when click an icon
//     return (
//       <Container>
//     <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
//     <div className="pt-4 flex flex-row items-center justify-start space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-transparent">
//         {categories.map((item) => (
//             //pass the items we created
//           <CategoryBox
//             key={item.label}
//             label={item.label}
//             // selected={category === item.label}
//             description={item.description}
//             icon={item.icon}
//           />
//         ))}
//       </div>

//       </Container>

//     );
// };

// export default Categories;
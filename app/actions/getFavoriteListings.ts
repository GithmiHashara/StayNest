// import prisma from '@/app/libs/prismadb'

// import getCurrentUser from './getCurrentUser'

// export default async function getFavoriteListings() {
//   try {
//     const currentUser = await getCurrentUser()

//     if (!currentUser) {
//       return []
//     }

//     const favorites = await prisma.listing.findMany({
//       where: {
//         id: {
//           in: [...(currentUser.favoriteIds || [])]
//         }
//       }
//     })

//     const safeFavorites = favorites.map((favorite) => ({
//       ...favorite,
//       createdAt: favorite.createdAt.toISOString()
//     }))

//     return safeFavorites
//   } catch (error: any) {
//     throw new Error(error)
//   }
// }


//2nd one

// import prisma from '@/app/libs/prismadb'
// import getCurrentUser from './getCurrentUser'
// import { Listing } from '@prisma/client' // Assuming your Prisma model is named Listing

// export default async function getFavoriteListings() {
//   try {
//     const currentUser = await getCurrentUser()

//     if (!currentUser) {
//       return []
//     }

//     const favorites: Listing[] = await prisma.listing.findMany({
//       where: {
//         id: {
//           in: [...(currentUser.favoriteIds || [])]
//         }
//       }
//     })

//     const safeFavorites = favorites.map((favorite: Listing) => ({
//       ...favorite,
//       createdAt: favorite.createdAt.toISOString()
//     }))

//     return safeFavorites
//   } catch (error: any) {
//     throw new Error(error)
//   }
// }

// app/actions/getFavoriteListings.ts
import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'
import { Prisma } from '@prisma/client'

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const favorites: Prisma.ListingGetPayload<{}>[] = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    })

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString()
    }))

    return safeFavorites
  } catch (error: any) {
    throw new Error(error)
  }
}


import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'
import { Listing } from '@prisma/client' // Assuming your Prisma model is named Listing

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return []
    }

    const favorites: Listing[] = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    })

    const safeFavorites = favorites.map((favorite: Listing) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString()
    }))

    return safeFavorites
  } catch (error: any) {
    throw new Error(error)
  }
}

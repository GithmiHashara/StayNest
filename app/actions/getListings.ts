import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
  userId? : string;
  guestCount? : number;
  roomCount? : number;
  bathroomCount? : number;
  locationValue? : string;
  startDate? : string;
  endDate? : string;
  category? : string;
}
export default async function getListings(params: IListingsParams) {
  try {
    const { userId, roomCount, guestCount, bathroomCount, locationValue, startDate, endDate, category } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (category) {
      query.category = category
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount // gte = greater than or equal
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (startDate && endDate) {
      query.NOT = { // NOT = not in the following list (reverse filtering)
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString()
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}


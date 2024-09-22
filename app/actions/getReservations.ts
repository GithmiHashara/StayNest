
import prisma from '@/app/libs/prismadb'

// src/types.ts or app/types.ts

export interface Reservation {
  listing: any;
  id: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  // Add other fields you
}

interface IParams {
  listingId?: string 
  userId?: string
  authorId?: string 
}

export default async function getReservations(
    params: IParams
 ) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = {
        userId: authorId 
      }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const safeReservations = reservations.map((reservation: Reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString()
      }
    }))

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}

import { PrismaClient } from '@prisma/client'

// Ensure the prisma instance is only created once
declare global {
  var prisma: PrismaClient | undefined
}


// Create a new PrismaClient instance if there isn't one already
const client = globalThis.prisma || new PrismaClient()

// Assign the prisma client to the global object if it doesn't exist
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client;
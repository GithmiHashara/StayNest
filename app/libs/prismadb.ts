import { PrismaClient } from '@prisma/client'

// Ensure the prisma instance is only created once
declare global {
  var prisma: PrismaClient | undefined
}

// Create a new PrismaClient instance with logging enabled
const client = globalThis.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error']  // Enables Prisma logs for better debugging
})

// Assign the prisma client to the global object if it doesn't exist
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client

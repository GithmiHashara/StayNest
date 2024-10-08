'use client'

import Image from 'next/image'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

import { SafeListing, SafeReservation, SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries'
import HeartButton from '../HeartButton'
import Button from '../Button'

interface ListingCardProps {
  data: SafeListing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, onAction, disabled, actionLabel, actionId = '', currentUser }) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) return

      onAction?.(actionId)
    },
    [disabled, onAction, actionId]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    //<div className="grid grid-cols-4 gap-4">
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      //className="col-span-1 cursor-pointer group  hover:bg-red-100"
      className="col-span-2 cursor-pointer group shadow-md rounded-xl p-4 hover:shadow-lg transition  hover:bg-amber-100"
      //className="col-span-10 cursor-pointer group shadow-md rounded-xl p-4 hover:shadow-lg transition  hover:bg-amber-100" (if want 6 for a row. uncomment 1st div and this one)
    >
      <div className="flex flex-col gap-2 w-full ">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>

      {/* Price section */}
      <div className="flex flex-row items-center gap-1 mt-auto">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>

        {/* Action button at the bottom */}
        {onAction && actionLabel && (
          <div className="mt-2">
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
      </div>   
    
  )
}

export default ListingCard

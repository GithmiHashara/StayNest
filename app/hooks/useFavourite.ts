import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { SafeUser } from '../types'

import useLoginModal from './useLoginModal'

interface IUseFavorite {
    listingId: string
    currentUser?: SafeUser | null
  }
  
  const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()
  
    const hasFavorited = useMemo(() => {
      const list = currentUser?.favoriteIds || []
  
      return list.includes(listingId)
    }, [currentUser, listingId])
  
    const toggleFavorite = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
  
        if (!currentUser) {
          return loginModal.onOpen() //open the login modal
        }
  
        try { //make the axios request
          let request
  
          if (hasFavorited) {
            request = () => axios.delete(`/api/favorites/${listingId}`) //delete request
          } else {
            request = () => axios.post(`/api/favorites/${listingId}`) //post request
          }
  
          await request()
          router.refresh()
          toast.success('Success')
        } catch (error) {
          toast.error('Something went wrong.')
        }
      },
      [currentUser, hasFavorited, listingId, loginModal, router] //pass the dependencies array
    )
  
    return {
      hasFavorited,
      toggleFavorite
    }
  }
  
  export default useFavorite

'use client';

import useSearchModal from '@/app/hooks/useSearchModal'

import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { CountrySelectValue } from '../inputs/CountrySelect';
import { Range } from 'react-date-range'
import { formatISO } from 'date-fns'
import dynamic from 'next/dynamic';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,   
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      })

      const Map = useMemo(
        () =>
          dynamic(() => import('../Map'), {
            ssr: false
          }),
        [location] // eslint-disable-line react-hooks/exhaustive-deps
      )

            

    return (
        <Modal 
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel="Search"
      onSubmit={searchModal.onOpen}
      //secondaryActionLabel={secondaryActionLabel}
      //secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      //body={bodyContent}
        
        />
    );
}

export default SearchModal;
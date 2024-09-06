'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";

const RentModal = () => {
    // Your component logic here
    const rentModal = useRentModal();

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel="Submit"
        title="StayNest your home!"
        
        
        />
          
       );
    }

export default RentModal;
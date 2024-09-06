'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import { it } from "node:test";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS { // Enumerated type mean that we can only choose from a fixed set of values to assign to a variable 
    
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
    // Your component logic here
    const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY)
 // const [isLoading, setIsLoading] = useState(false)

 const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const category = watch('category')
 
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }



 const onBack = () => {
    setStep((value) => value - 1);
 }

 const onNext = () => {
    setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {
     if (step === STEPS.PRICE) {
        return ' Create';
     }

     return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
          return undefined
        }
    
        return 'Back'
      }, [step]) 

      let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describe your place?"
            subtitle="Pick a category"
          />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">

        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
             <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel={actionLabel} // This is the next button
        secondaryActionLabel={secondaryActionLabel} // This is the back button
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}  //make sure if we are in first step we don't have back button     
        title="StayNest your home!" 
        body= {bodyContent}     
         />
          
       );
    }

export default RentModal;
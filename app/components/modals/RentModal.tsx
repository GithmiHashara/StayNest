'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { use, useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import { it } from "node:test";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


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
    const router = useRouter();
    const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY)
 const [isLoading, setIsLoading] = useState(false)

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

  const category = watch('category');
  const location = watch('location'); // watch is a hook that allows us to watch the value of a field in the form
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
 
  // we are using useMemo to make sure that the map component is only loaded when the location changes
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    [location] // eslint-disable-line react-hooks/exhaustive-deps
  )
 
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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if (step !== STEPS.PRICE) { // If we are not in the last step
       return onNext(); // Go to the next step
      } setIsLoading(true); // Show a loading spinner
     // Make a request to the server to create a new listing
    axios 
    .post('/api/listings', data) // Send the data to the server
    .then(() => {
      toast.success('Listing created!'); // Show a success message
      router.refresh(); // Refresh the page to see the new listing
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    })
    .catch(() => {
      toast.error('Something went wrong.')
    })
    .finally(() => {
      setIsLoading(false)
    })
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
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
       
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        {/* <Map center={location?.latlng} /> */}
        <Map 
        center={location?.latlng}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Tell us more about your place"
          subtitle="Help guests know what to expect" //What amenities do you have?
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)} //pass the value to the setCustomValue function
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
  }

  if (step === STEPS.DESRIPTION) {  
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your place"
          subtitle="Short and sweet works best!"
        />
       <Input
       id="title"
       label="title"
       disabled={isLoading}
       register={register}
       errors={errors}
       required
       />
       <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }   
  
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>    
    )
  }

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel} // This is the next button
        secondaryActionLabel={secondaryActionLabel} // This is the back button
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}  //make sure if we are in first step we don't have back button     
        title="StayNest your home!" 
        body= {bodyContent}     
         />
          );
    }

export default RentModal;
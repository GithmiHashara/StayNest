'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
 
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {} //initialize the current query as empty

    if (params) { //if there are params
      currentQuery = qs.parse(params.toString()) //parse the query
    }

    const updatedQuery: any = { //initialize the updated query
      ...currentQuery, //pass the current query
      category: label  //pass the category
    }

    if (params?.get('category') === label) { //if the category is already selected
      delete updatedQuery.category //remove the category
    }

    const url = qs.stringifyUrl( //update the url
      {
        url: '/', //pass the current
        query: updatedQuery //pass the updated
      },
      { skipNull: true } //skip null values
    )

    router.push(url) //push the updated url
  }, [params, label, router]) //pass the params, label, and router the dependencies array

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <div className="icon-container hover:scale-150 transition-transform duration-300 ease-out"> {/* Add animation here */}
      <Icon size={28} color=' #5d3a1a'/> </div>
           <div className="font-medium text-medium whitespace-nowrap">{label}</div>
    </div>
  )
}

export default CategoryBox;

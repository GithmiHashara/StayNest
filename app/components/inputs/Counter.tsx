'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

//we create an Interface to define the props that the Counter component will receive
interface CounterProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1) //we call the onChange function with the new value
  }, [onChange, value]) //these are the dependencies of the function

  const onReduce = useCallback(() => {
    if (value === 1) return

    onChange(value - 1)
  }, [onChange, value])

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="felx flex-col"> 
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce} //we call the onReduce function when the user clicks on the div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition" //minues button style
        >
          <AiOutlineMinus /> 
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  )
}

export default Counter

'use client'

import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

interface SimpleAccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export const SimpleAccordion: React.FC<SimpleAccordionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className='border-b border-gray-100 last:border-b-0'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 transition-colors duration-200'
      >
        <h4 className='font-semibold text-gray-900'>{title}</h4>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='pb-3'>{children}</div>
      </div>
    </div>
  )
}

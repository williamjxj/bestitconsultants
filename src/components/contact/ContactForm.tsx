'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/contexts/LanguageContext'
import { serviceCategoriesData } from '@/data/serviceCategories'
import { contactFormSchema, type ContactFormInput } from '@/lib/validations'

/**
 * ContactForm component with shadcn/ui Form, React Hook Form, and Zod validation
 * Supports URL parameter pre-filling, multilingual support, and simplified field structure
 */
export function ContactForm() {
  const { translations } = useLanguage()
  const searchParams = useSearchParams()
  const [showOptionalFields, setShowOptionalFields] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Get URL parameters for pre-filling
  const urlService = searchParams.get('service') || ''
  const urlMessage = searchParams.get('message') || ''
  const urlTitle = searchParams.get('title') || ''

  // Map service category IDs to match form options
  const serviceOptions = serviceCategoriesData
    .filter(cat => cat.isActive)
    .map(cat => ({
      value: cat.id,
      label: cat.name,
    }))

  // Get form translations
  const formTranslations = translations.contact.form

  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: urlMessage || '',
      company: '',
      phone: '',
      service: urlService || '',
      title: urlTitle || '',
    },
    mode: 'onChange', // Real-time validation
  })

  // Handle form submission
  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Prepare submission data
      const submissionData = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        company: data.company?.trim() || undefined,
        phone: data.phone?.trim() || undefined,
        service: data.service || undefined,
        title: data.title?.trim() || undefined,
      }

      // Remove undefined values
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key as keyof typeof submissionData] === undefined) {
          delete submissionData[key as keyof typeof submissionData]
        }
      })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: formTranslations.success,
        })
        // Reset form
        form.reset({
          name: '',
          email: '',
          message: '',
          company: '',
          phone: '',
          service: '',
          title: '',
        })
        setShowOptionalFields(false)
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || formTranslations.error,
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: formTranslations.networkError,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Required Fields */}
        <div className='space-y-4'>
          {/* Name Field */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formTranslations.fields.name.label}
                  <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={formTranslations.fields.name.placeholder}
                    disabled={isSubmitting}
                    aria-required='true'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formTranslations.fields.email.label}
                  <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder={formTranslations.fields.email.placeholder}
                    disabled={isSubmitting}
                    aria-required='true'
                    inputMode='email'
                    autoComplete='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Field */}
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formTranslations.fields.title.label}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={formTranslations.fields.title.placeholder}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {formTranslations.fields.message.label}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={formTranslations.fields.message.placeholder}
                    disabled={isSubmitting}
                    rows={5}
                    aria-required='true'
                    className='resize-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Optional Fields - Collapsible Section */}
        <div className='border-t pt-4'>
          <button
            type='button'
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            className='flex w-full items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
            aria-expanded={showOptionalFields}
            aria-controls='optional-fields'
          >
            <span>{formTranslations.tellUsMore}</span>
            {showOptionalFields ? (
              <ChevronUpIcon className='h-4 w-4' />
            ) : (
              <ChevronDownIcon className='h-4 w-4' />
            )}
          </button>

          {showOptionalFields && (
            <div
              id='optional-fields'
              className='mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200'
            >
              {/* Company Field */}
              <FormField
                control={form.control}
                name='company'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {formTranslations.fields.company.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={formTranslations.fields.company.placeholder}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {formTranslations.fields.phone.label}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='tel'
                        placeholder={formTranslations.fields.phone.placeholder}
                        disabled={isSubmitting}
                        inputMode='tel'
                        autoComplete='tel'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Service Field */}
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {formTranslations.fields.service.label}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={formTranslations.fields.service.placeholder}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='z-[100]'>
                        {serviceOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Submit Status Messages */}
        {submitStatus.type && (
          <div
            className={`rounded-lg border p-4 text-sm ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border-green-200'
                : 'bg-red-50 text-red-800 border-red-200'
            }`}
            role='alert'
            aria-live='polite'
          >
            {submitStatus.message}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type='submit'
          size='lg'
          className='w-full'
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? formTranslations.sending : formTranslations.submit}
        </Button>
      </form>
    </Form>
  )
}


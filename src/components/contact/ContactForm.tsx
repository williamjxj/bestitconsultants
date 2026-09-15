'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  AlertCircle,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2,
  Mail,
  Phone,
  Send,
  Tag,
  User,
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { type ReactNode, useState } from 'react'
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

const MESSAGE_MAX = 2000

/**
 * Shared control styling.
 *
 * `text-base md:text-sm` keeps the mobile font at 16px so iOS Safari does not
 * zoom the page when a field receives focus - the single most common mobile
 * form complaint.
 */
const controlClasses =
  // `select-text` keeps the value selectable/copyable even if a parent wrapper
  // ever sets user-select: none.
  'h-12 w-full select-text rounded-2xl border-border/70 bg-white px-4 text-base shadow-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 md:text-sm'

const controlWithIconClasses = `${controlClasses} pl-11`

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground'>
      {children}
    </span>
  )
}

function SectionHeading({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className='md:col-span-2 border-t border-border/60 pt-6 first:border-t-0 first:pt-0'>
      <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
        {title}
      </h3>
      {description && (
        <p className='mt-1 text-sm text-muted-foreground'>{description}</p>
      )}
    </div>
  )
}

interface SubmitState {
  status: 'idle' | 'success' | 'error'
  message: string
  reference?: string
  confirmationSent?: boolean
}

/**
 * Contact form with shadcn/ui Form, React Hook Form and Zod validation.
 * Supports URL pre-filling, multilingual labels, a honeypot, and an
 * accessible success panel that confirms what happens next.
 */
export function ContactForm() {
  const { translations } = useLanguage()
  const searchParams = useSearchParams()

  const urlService = searchParams.get('service') || ''
  const urlMessage = searchParams.get('message') || ''
  const urlTitle = searchParams.get('title') || ''

  // If a CTA pre-filled the optional details, open that section automatically.
  const [showOptionalFields, setShowOptionalFields] = useState(
    Boolean(urlService || urlTitle)
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Honeypot value - kept outside the RHF schema so it never reaches validation.
  const [honeypot, setHoneypot] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message: '',
  })

  const serviceOptions = serviceCategoriesData
    .filter(category => category.isActive)
    .map(category => ({ value: category.id, label: category.name }))

  const formTranslations = translations.contact.form
  const fieldTranslations = formTranslations.fields

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
    mode: 'onChange',
  })

  const messageValue = form.watch('message') ?? ''

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true)
    setSubmitState({ status: 'idle', message: '' })

    try {
      const submissionData: Record<string, string> = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        source: 'contact-us-page',
      }

      for (const key of ['company', 'phone', 'service', 'title'] as const) {
        const value = data[key]?.trim()
        if (value) submissionData[key] = value
      }

      if (honeypot) submissionData.website = honeypot

      if (typeof window !== 'undefined') {
        submissionData.pageUrl = window.location.href
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })

      const result = (await response.json().catch(() => null)) as
        | {
            ok?: boolean
            error?: string
            reference?: string
            confirmationSent?: boolean
            message?: string
            field?: string
          }
        | null

      if (!response.ok || !result?.ok) {
        // Surface the server's field-level error on the matching input.
        if (result?.field && result.field in form.getValues()) {
          form.setError(result.field as keyof ContactFormInput, {
            type: 'server',
            message: result.error ?? formTranslations.error,
          })
        }

        setSubmitState({
          status: 'error',
          message: result?.error || formTranslations.error,
        })
        return
      }

      setSubmitState({
        status: 'success',
        message: result.message || formTranslations.success,
        reference: result.reference,
        confirmationSent: result.confirmationSent,
      })
      form.reset({
        name: '',
        email: '',
        message: '',
        company: '',
        phone: '',
        service: '',
        title: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitState({
        status: 'error',
        message: formTranslations.networkError,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendAnother = () => {
    setSubmitState({ status: 'idle', message: '' })
    form.clearErrors()
  }

  if (submitState.status === 'success') {
    return (
      <div
        className='rounded-[24px] border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 text-center sm:p-8'
        role='status'
        aria-live='polite'
      >
        <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100'>
          <CheckCircle2 className='h-7 w-7 text-emerald-600' />
        </div>
        <h3 className='text-xl font-semibold text-slate-900 sm:text-2xl'>
          {formTranslations.successTitle}
        </h3>
        <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 sm:text-base'>
          {submitState.message || formTranslations.success}
        </p>

        {submitState.reference && (
          <p className='mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700'>
            {formTranslations.referenceLabel} {submitState.reference}
          </p>
        )}

        {submitState.confirmationSent && (
          <p className='mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 sm:text-sm'>
            <Mail className='h-4 w-4 shrink-0 text-emerald-600' />
            {formTranslations.confirmationNote}
          </p>
        )}

        <ol className='mx-auto mt-6 max-w-md space-y-3 text-left'>
          {[
            formTranslations.successSteps.step1,
            formTranslations.successSteps.step2,
            formTranslations.successSteps.step3,
          ].map((step, index) => (
            <li key={step} className='flex items-start gap-3'>
              <span className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground'>
                {index + 1}
              </span>
              <span className='text-sm leading-6 text-slate-600'>{step}</span>
            </li>
          ))}
        </ol>

        <Button
          type='button'
          variant='outline'
          onClick={handleSendAnother}
          className='mt-7 h-12 rounded-2xl border-slate-300 px-5 text-sm font-semibold'
        >
          {formTranslations.sendAnother}
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        /*
         * Card + CardContent already add horizontal padding, so keep this one
         * tight on small screens - otherwise the fields end up ~60% of the
         * viewport width on a phone.
         */
        className='space-y-7 rounded-[24px] border border-border/60 bg-gradient-to-b from-background via-background to-muted/20 p-3.5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[28px] sm:p-6 lg:p-8'
      >
        {/* Honeypot - invisible to people, catches naive bots */}
        <div className='hidden' aria-hidden='true'>
          <label htmlFor='website'>Website</label>
          <input
            id='website'
            name='website'
            type='text'
            tabIndex={-1}
            autoComplete='off'
            value={honeypot}
            onChange={event => setHoneypot(event.target.value)}
          />
        </div>

        {submitState.status === 'error' && submitState.message && (
          <div
            className='flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-4'
            role='alert'
            aria-live='assertive'
          >
            <AlertCircle className='mt-0.5 h-5 w-5 shrink-0 text-rose-600' />
            <div>
              <p className='text-sm font-semibold text-rose-900'>
                {formTranslations.errorTitle}
              </p>
              <p className='mt-0.5 text-sm text-rose-800'>
                {submitState.message}
              </p>
            </div>
          </div>
        )}

        <div className='grid gap-5 md:grid-cols-2'>
          <SectionHeading title={formTranslations.sections.details} />

          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>
                  {fieldTranslations.name.label}
                  <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <div className='relative'>
                  <IconWrap>
                    <User className='h-4 w-4' />
                  </IconWrap>
                  {/* FormControl must wrap the input itself so label/aria wiring stays intact */}
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete='name'
                      placeholder={fieldTranslations.name.placeholder}
                      disabled={isSubmitting}
                      aria-required='true'
                      className={controlWithIconClasses}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>
                  {fieldTranslations.email.label}
                  <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <div className='relative'>
                  <IconWrap>
                    <Mail className='h-4 w-4' />
                  </IconWrap>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      inputMode='email'
                      autoComplete='email'
                      placeholder={fieldTranslations.email.placeholder}
                      disabled={isSubmitting}
                      aria-required='true'
                      className={controlWithIconClasses}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <SectionHeading
            title={formTranslations.sections.project}
            description={formTranslations.sections.projectHint}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='space-y-2 md:col-span-2'>
                <FormLabel>
                  {fieldTranslations.message.label}
                  <span className='text-destructive ml-1'>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    placeholder={fieldTranslations.message.placeholder}
                    disabled={isSubmitting}
                    aria-required='true'
                    className='min-h-40 resize-y select-text rounded-2xl border-border/70 bg-white px-4 py-3 text-base leading-6 shadow-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/15 md:text-sm'
                  />
                </FormControl>
                <div className='flex items-center justify-between gap-3 text-xs text-muted-foreground'>
                  <span>{formTranslations.messageHint}</span>
                  <span className='tabular-nums'>
                    {messageValue.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Optional details */}
        <div className='rounded-[24px] border border-border/60 bg-muted/15 px-4 py-3 sm:px-5 sm:py-4'>
          <button
            type='button'
            onClick={() => setShowOptionalFields(open => !open)}
            className='flex w-full items-center justify-between gap-3 rounded-2xl px-1 py-1 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
            aria-expanded={showOptionalFields}
            aria-controls='optional-fields'
          >
            <span className='text-[11px] font-semibold uppercase tracking-[0.2em]'>
              {formTranslations.tellUsMore}
            </span>
            {showOptionalFields ? (
              <ChevronUpIcon className='h-4 w-4 shrink-0' />
            ) : (
              <ChevronDownIcon className='h-4 w-4 shrink-0' />
            )}
          </button>

          {showOptionalFields && (
            <div
              id='optional-fields'
              className='mt-5 grid gap-5 md:grid-cols-2 animate-in slide-in-from-top-2 duration-200'
            >
              {/* Company */}
              <FormField
                control={form.control}
                name='company'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel>{fieldTranslations.company.label}</FormLabel>
                    <div className='relative'>
                      <IconWrap>
                        <Building2 className='h-4 w-4' />
                      </IconWrap>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete='organization'
                          placeholder={fieldTranslations.company.placeholder}
                          disabled={isSubmitting}
                          className={controlWithIconClasses}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='space-y-2'>
                    <FormLabel>{fieldTranslations.phone.label}</FormLabel>
                    <div className='relative'>
                      <IconWrap>
                        <Phone className='h-4 w-4' />
                      </IconWrap>
                      <FormControl>
                        <Input
                          {...field}
                          type='tel'
                          inputMode='tel'
                          autoComplete='tel'
                          placeholder={fieldTranslations.phone.placeholder}
                          disabled={isSubmitting}
                          className={controlWithIconClasses}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='space-y-2 md:col-span-2'>
                    <FormLabel>{fieldTranslations.title.label}</FormLabel>
                    <div className='relative'>
                      <IconWrap>
                        <Tag className='h-4 w-4' />
                      </IconWrap>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={fieldTranslations.title.placeholder}
                          disabled={isSubmitting}
                          className={controlWithIconClasses}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Service */}
              <FormField
                control={form.control}
                name='service'
                render={({ field }) => (
                  <FormItem className='space-y-2 md:col-span-2'>
                    <FormLabel>{fieldTranslations.service.label}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className='relative h-12 w-full rounded-2xl border-border/70 bg-white pl-11 text-base shadow-sm transition-colors focus:ring-4 focus:ring-primary/15 md:text-sm'>
                          <IconWrap>
                            <Briefcase className='h-4 w-4' />
                          </IconWrap>
                          <SelectValue
                            placeholder={fieldTranslations.service.placeholder}
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

        <div className='space-y-3 border-t border-border/60 pt-6'>
          <Button
            type='submit'
            size='lg'
            className='h-[3.25rem] w-full rounded-2xl bg-gradient-to-r from-primary to-primary/85 px-6 text-base font-semibold shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25'
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                {formTranslations.sending}
              </>
            ) : (
              <>
                <Send className='mr-2 h-5 w-5' />
                {formTranslations.submit}
              </>
            )}
          </Button>
          <p className='text-center text-xs leading-5 text-muted-foreground'>
            {formTranslations.privacy}
          </p>
        </div>
      </form>
    </Form>
  )
}

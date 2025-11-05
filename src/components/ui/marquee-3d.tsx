import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  img: string
  name: string
  position: string
  company?: string
  body: string
}

/**
 * Generate avatar abbreviation from name
 * Takes first letter of first name and first letter of last name
 * Example: "Dan Micael Chen" -> "DC"
 */
const getAvatarAbbr = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '??'
  if (words.length === 1) return words[0][0].toUpperCase()
  // First letter of first word + first letter of last word
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

const TestimonialCard = ({
  img,
  name,
  position,
  company,
  body,
}: TestimonialCardProps) => {
  return (
    <figure
      className={cn(
        'relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-80',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={img} alt={name} />
          <AvatarFallback className="bg-blue-600 text-white text-xs">
            {getAvatarAbbr(name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">
            {position}
            {company && ` at ${company}`}
          </p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm line-clamp-4">{body}</blockquote>
    </figure>
  )
}

interface Marquee3DProps {
  testimonials: Array<{
    name: string
    position: string
    company?: string
    content: string
    avatar: string
  }>
}

export function Marquee3D({ testimonials }: Marquee3DProps) {
  if (testimonials.length === 0) return null

  // Ensure we have enough testimonials for smooth continuous scrolling by duplicating
  // Duplicate enough times to ensure seamless infinite scroll
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ]

  // Split testimonials into rows for the marquee effect (matching Magic UI demo pattern)
  const firstRow = extendedTestimonials.slice(0, Math.ceil(extendedTestimonials.length / 2))
  const secondRow = extendedTestimonials.slice(Math.ceil(extendedTestimonials.length / 2))
  const thirdRow = extendedTestimonials.slice(0, Math.ceil(extendedTestimonials.length / 2))
  const fourthRow = extendedTestimonials.slice(Math.ceil(extendedTestimonials.length / 2))

  return (
    <div className="relative flex h-[600px] w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:65s]" repeat={6}>
          {firstRow.map((testimonial, index) => (
            <TestimonialCard
              key={`first-${testimonial.name}-${index}`}
              img={testimonial.avatar}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
              body={testimonial.content}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:65s]" vertical repeat={6}>
          {secondRow.map((testimonial, index) => (
            <TestimonialCard
              key={`second-${testimonial.name}-${index}`}
              img={testimonial.avatar}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
              body={testimonial.content}
            />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:65s]" vertical repeat={6}>
          {thirdRow.map((testimonial, index) => (
            <TestimonialCard
              key={`third-${testimonial.name}-${index}`}
              img={testimonial.avatar}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
              body={testimonial.content}
            />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:65s]" vertical repeat={6}>
          {fourthRow.map((testimonial, index) => (
            <TestimonialCard
              key={`fourth-${testimonial.name}-${index}`}
              img={testimonial.avatar}
              name={testimonial.name}
              position={testimonial.position}
              company={testimonial.company}
              body={testimonial.content}
            />
          ))}
        </Marquee>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}


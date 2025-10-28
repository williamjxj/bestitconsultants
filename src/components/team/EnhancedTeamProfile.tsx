import React from 'react'

import { SimpleAccordion } from '@/components/ui/simple-accordion'
import { TeamMember } from '@/types/team'

interface EnhancedTeamProfileProps {
  member: TeamMember
}

export const EnhancedTeamProfile: React.FC<EnhancedTeamProfileProps> = ({
  member,
}) => {
  const renderBoldText = (text: string, keyPrefix: string) => {
    // Split on **bold** markers and render highlighted spans for matched groups
    // This preserves plain text while replacing **text** with a styled <span>
    const parts = [] as React.ReactNode[]
    const regex = /\*\*(.*?)\*\*/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      const index = match.index
      // push text before the match
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index))
      }
      // push highlighted span for the captured group
      parts.push(
        <span
          key={`${member.id}-${keyPrefix}-${index}`}
          className='bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 font-semibold px-2 py-1 rounded-md border border-blue-200 shadow-sm'
        >
          {match[1]}
        </span>
      )
      lastIndex = index + match[0].length
    }

    // push remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow'>
      {/* Header Section - Fixed Height */}
      <div className='flex items-center space-x-4 mb-4'>
        {member.avatar && member.avatar.trim() !== '' ? (
          <img
            src={member.avatar}
            alt={member.name}
            className='w-16 h-16 rounded-full object-cover'
          />
        ) : (
          <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center'>
            <span className='text-gray-600 text-lg font-semibold'>
              {member.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h3 className='text-xl font-bold text-gray-900'>{member.name}</h3>
          <p className='text-gray-600'>{member.title}</p>
          <p className='text-sm text-gray-500'>{member.location}</p>
        </div>
      </div>

      <p className='text-gray-700 mb-4'>{renderBoldText(member.bio, 'bio')}</p>

      <div className='space-y-3'>
        <div>
          <h4 className='font-semibold text-gray-900 mb-2'>Expertise</h4>
          <div className='flex flex-wrap gap-2'>
            {member.expertise.map(skill => (
              <span
                key={skill}
                className='bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className='font-semibold text-gray-900 mb-2'>Key Achievements</h4>
          <ul className='list-disc list-inside text-sm text-gray-700'>
            {member.achievements.map((achievement, index) => (
              <li key={achievement}>
                {renderBoldText(achievement, `achievement-${index}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Prestige Projects - Accordionable */}
        {member.prestigeProjects.length > 0 && (
          <SimpleAccordion title='Prestige Projects'>
            <div className='space-y-2'>
              {member.prestigeProjects.map(project => (
                <div key={project.id} className='bg-gray-50 p-3 rounded'>
                  <div className='flex items-center space-x-2 mb-1'>
                    {project.logo && (
                      <img
                        src={project.logo}
                        alt={project.name}
                        className='w-6 h-6'
                      />
                    )}
                    <span className='font-medium text-gray-900'>
                      {project.name}
                    </span>
                    <span className='text-sm text-gray-500'>
                      ({project.year})
                    </span>
                  </div>
                  <p className='text-sm text-gray-700'>
                    {renderBoldText(
                      project.description,
                      `project-${project.id}-desc`
                    )}
                  </p>
                  <p className='text-sm text-green-600 font-medium'>
                    {renderBoldText(
                      project.outcome,
                      `project-${project.id}-outcome`
                    )}
                  </p>
                </div>
              ))}
            </div>
          </SimpleAccordion>
        )}
      </div>
    </div>
  )
}

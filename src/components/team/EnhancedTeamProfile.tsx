import React from 'react'
import { TeamMember } from '@/types/team'

interface EnhancedTeamProfileProps {
  member: TeamMember
}

export const EnhancedTeamProfile: React.FC<EnhancedTeamProfileProps> = ({
  member,
}) => {
  return (
    <div className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow'>
      <div className='flex items-center space-x-4 mb-4'>
        <img
          src={member.avatar}
          alt={member.name}
          className='w-16 h-16 rounded-full object-cover'
        />
        <div>
          <h3 className='text-xl font-bold text-gray-900'>{member.name}</h3>
          <p className='text-gray-600'>{member.title}</p>
          <p className='text-sm text-gray-500'>{member.location}</p>
        </div>
      </div>

      <p className='text-gray-700 mb-4'>{member.bio}</p>

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
            {member.achievements.map(achievement => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </div>

        {member.prestigeProjects.length > 0 && (
          <div>
            <h4 className='font-semibold text-gray-900 mb-2'>
              Prestige Projects
            </h4>
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
                  <p className='text-sm text-gray-700'>{project.description}</p>
                  <p className='text-sm text-green-600 font-medium'>
                    {project.outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

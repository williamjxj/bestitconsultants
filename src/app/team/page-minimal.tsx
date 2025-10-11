import React from 'react'

const TeamPage = () => {
  const teamMembers = [
    {
      id: 'william',
      name: 'William Jiang',
      role: 'Founder & Senior Full-Stack Engineer',
      location: 'Vancouver, Canada',
      bio: 'Technology professional with 20+ years of global experience in full-stack development, software architecture, and AI-driven solutions.',
      experience: '20+ Years',
      specialties: [
        'AI/ML Solutions',
        'Full-Stack Development',
        'Enterprise Architecture',
      ],
    },
    {
      id: 'shamin',
      name: 'Shamin Yang',
      role: 'Senior Software Engineer & Solution Architect',
      location: 'Guangzhou, China',
      bio: '20+ years Microsoft technology expert with extensive Fortune 500 experience. Led major projects at HSBC, IBM, HP, and EPAM.',
      experience: '20+ Years',
      specialties: [
        '.NET Architecture',
        'RPA Solutions',
        'Enterprise Integration',
      ],
    },
    {
      id: 'lewis',
      name: 'Lewis Liu',
      role: 'Software Architect & Programmer',
      location: 'Beijing, China',
      bio: '26+ years in BIM/CAD/CAE with mastery in data modeling, SDKs, mathematical algorithms, and parallel design.',
      experience: '26+ Years',
      specialties: ['CAD/BIM/CAE', 'AI+CAD Integration', 'Parallel Computing'],
    },
    {
      id: 'ming',
      name: 'Ming Chun Hu',
      role: 'Lead Software Developer & Consultant',
      location: 'Chengdu, China',
      bio: 'Executive with 10+ years in internet/software development, leading hi-tech enterprise focused on custom solutions.',
      experience: '10+ Years',
      specialties: [
        'Custom Software Development',
        'Team Leadership',
        'Enterprise Solutions',
      ],
    },
    {
      id: 'wayne',
      name: 'Wayne Li',
      role: 'AI Solutions Architect',
      location: 'Shenzhen, China',
      bio: 'Founded Aochuang Intelligent Technology in 2008, evolved to full AI focus in 2023. 50+ core AI patents with team from Tsinghua/Meituan/Baidu.',
      experience: '16+ Years',
      specialties: ['AI Solutions', 'Government Projects', 'Enterprise AI'],
    },
    {
      id: 'james',
      name: 'James Chueng',
      role: 'Full-Stack Software Engineer',
      location: 'Hong Kong',
      bio: '7+ years freelancing experience on platforms like Freelancer and Upwork. Contributed to diverse web/AI projects and enterprise applications.',
      experience: '7+ Years',
      specialties: [
        'Full-Stack Development',
        'AI/LLM Integration',
        'Freelance Expertise',
      ],
    },
  ]

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8'>Our Expert Team</h1>
        <p className='text-center text-lg text-gray-600 mb-12'>
          Meet our global network of senior engineers and AI innovators.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {teamMembers.map(member => (
            <div
              key={member.id}
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'
            >
              <div className='text-center mb-4'>
                <div className='w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold'>
                  {member.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <h3 className='text-xl font-bold mb-2'>{member.name}</h3>
                <p className='text-gray-600 mb-1'>{member.role}</p>
                <p className='text-sm text-gray-500 mb-2'>{member.location}</p>
                <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>
                  {member.experience}
                </span>
              </div>

              <p className='text-gray-700 text-sm mb-4 text-center'>
                {member.bio}
              </p>

              <div className='text-center'>
                <h4 className='font-semibold mb-2 text-gray-900'>
                  Specialties
                </h4>
                <div className='flex flex-wrap justify-center gap-1'>
                  {member.specialties.map(specialty => (
                    <span
                      key={specialty}
                      className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamPage





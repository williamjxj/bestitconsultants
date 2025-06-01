// Translation data for multi-language support
export const translations = {
  en: {
    navbar: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Portfolio',
      testimonials: 'Testimonials',
      contact: 'Contact Us',
    },
    hero: {
      title: 'Expert Software Outsourcing Solutions',
      subtitle: 'Delivering high-quality, scalable, and innovative software with our global team of full-stack engineers.',
      cta: 'Get a Free Quote',
    },
    aboutSummary: {
      title: 'Who We Are',
      content: "BestITConsulting Ltd is a premier software outsourcing company with a team of dedicated full-stack engineers. We specialize in JavaScript, TypeScript, Python, Java, .NET, and more. Headquartered in Vancouver, Canada, with a strategic branch in East Asia, we bridge global talent with your project needs.",
      learnMore: 'Learn More About Us',
    },
    servicesSummary: {
      title: 'Our Services',
      content: 'We offer a wide array of software development services tailored to meet your unique business requirements. From web and mobile applications to complex enterprise solutions, our expertise ensures top-notch results.',
      services: [
        { name: 'Custom Web Development', description: 'Building responsive and dynamic websites.' },
        { name: 'Mobile App Development', description: 'iOS and Android applications for diverse needs.' },
        { name: 'Cloud Solutions & DevOps', description: 'Scalable cloud infrastructure and CI/CD pipelines.' },
        { name: 'AI & Machine Learning', description: 'Intelligent solutions to drive innovation.' },
        { name: 'QA & Testing', description: 'Ensuring software quality and reliability.' },
      ],
      seeAllServices: 'Explore All Services'
    },
    portfolioPreview: {
      title: 'Our Proven Accomplishments',
      viewProject: 'View Project Details',
      projects: [
        { id: 1, name: 'E-commerce Platform Revamp', tech: 'Next.js, Node.js, PostgreSQL', description: 'Overhauled a major online retailer\'s platform, improving performance by 60% and user engagement by 40%.' },
        { id: 2, name: 'Healthcare Management System', tech: 'Java Spring Boot, Angular, AWS', description: 'Developed a secure and HIPAA-compliant system for managing patient records and appointments for a network of clinics.' },
        { id: 3, name: 'AI-Powered Logistics Optimizer', tech: 'Python, TensorFlow, Docker, Kubernetes', description: 'Created an AI solution that optimized delivery routes, reducing fuel costs by 15% for a large logistics company.' },
      ],
      allProjects: 'View All Projects'
    },
    testimonialsPreview: {
      title: 'What Our Clients Say',
      testimonials: [
        { id: 1, name: 'Sarah L., CEO of TechSolutions Inc.', quote: '"BestITConsulting delivered beyond our expectations. Their team is skilled, professional, and truly understood our vision."' },
        { id: 2, name: 'John B., Project Manager at Innovate Corp.', quote: '"The quality of work and the communication throughout the project were outstanding. Highly recommend them!"' },
        { id: 3, name: 'Emily K., Founder of StartupX', quote: '"Working with BestITConsulting was a game-changer for us. They helped us scale our product efficiently and effectively."' },
      ],
      moreTestimonials: 'Read More Testimonials'
    },
    contactSnippet: {
      title: "Let's Build Excellence Together",
      description: "Ready to start your next project or have questions? We're here to help.",
      cta: "Contact Us Today"
    },
    about: {
      title: 'About BestIT Consulting',
      subtitle: 'Your trusted partner in software development and digital transformation',
      mission: {
        title: 'Our Mission',
        content: 'To deliver exceptional software solutions that drive business growth and innovation through cutting-edge technology and expert engineering.',
      },
      vision: {
        title: 'Our Vision',
        content: 'To be the global leader in software outsourcing, known for quality, reliability, and transformative digital solutions.',
      },
      values: {
        title: 'Our Values',
        list: [
          { name: 'Excellence', description: 'We strive for perfection in every line of code and every client interaction.' },
          { name: 'Innovation', description: 'We embrace cutting-edge technologies to deliver forward-thinking solutions.' },
          { name: 'Collaboration', description: 'We work closely with our clients as true partners in their success.' },
          { name: 'Integrity', description: 'We maintain the highest standards of honesty and transparency.' },
        ],
      },
      team: {
        title: 'Meet Our Team',
        subtitle: 'World-class engineers and consultants ready to tackle your challenges',
        members: [
          {
            name: 'Alex Chen',
            role: 'Chief Technology Officer',
            bio: '15+ years in software architecture and team leadership',
            image: '/team/alex.jpg',
            specialties: ['System Architecture', 'Cloud Solutions', 'Team Leadership'],
          },
          {
            name: 'Sarah Rodriguez',
            role: 'Lead Full-Stack Developer',
            bio: 'Expert in modern web technologies and scalable applications',
            image: '/team/sarah.jpg',
            specialties: ['React/Next.js', 'Node.js', 'Database Design'],
          },
          {
            name: 'Michael Johnson',
            role: 'AI/ML Specialist',
            bio: 'PhD in Computer Science, specialized in machine learning',
            image: '/team/michael.jpg',
            specialties: ['Machine Learning', 'Data Science', 'Python'],
          },
        ],
      },
      stats: {
        title: 'Our Impact',
        items: [
          { number: '150+', label: 'Projects Completed', description: 'Successfully delivered across industries' },
          { number: '50+', label: 'Happy Clients', description: 'From startups to Fortune 500 companies' },
          { number: '98%', label: 'Client Satisfaction', description: 'Based on post-project surveys' },
          { number: '5+', label: 'Years Experience', description: 'In software development and consulting' },
        ],
      },
      certifications: {
        title: 'Certifications & Partnerships',
        list: [
          { name: 'AWS Certified Solutions Architect', organization: 'Amazon Web Services' },
          { name: 'Google Cloud Professional', organization: 'Google Cloud Platform' },
          { name: 'Microsoft Azure Expert', organization: 'Microsoft' },
          { name: 'Agile & Scrum Certified', organization: 'Scrum Alliance' },
        ],
      },
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive software development solutions tailored to your business needs',
      deliverables: 'Key Deliverables',
      list: [
        {
          icon: 'web-development',
          title: 'Custom Web Development',
          description: 'Modern, responsive websites and web applications built with cutting-edge technologies',
          technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript'],
          deliverables: ['Responsive design', 'SEO optimization', 'Performance optimization', 'Cross-browser compatibility']
        },
        {
          icon: 'mobile-apps',
          title: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications for iOS and Android',
          technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Xamarin'],
          deliverables: ['Native performance', 'App store deployment', 'Push notifications', 'Offline functionality']
        },
        {
          icon: 'cloud-solutions',
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure and DevOps solutions for modern applications',
          technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
          deliverables: ['Auto-scaling', 'CI/CD pipelines', 'Monitoring & logging', 'Security compliance']
        },
        {
          icon: 'ai-ml',
          title: 'AI & Machine Learning',
          description: 'Intelligent solutions leveraging artificial intelligence and machine learning',
          technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI'],
          deliverables: ['Custom AI models', 'Data analysis', 'Predictive analytics', 'Natural language processing']
        },
        {
          icon: 'devops',
          title: 'DevOps & Automation',
          description: 'Streamlined development processes and automated deployment pipelines',
          technologies: ['Jenkins', 'GitLab CI', 'Terraform', 'Ansible', 'Prometheus'],
          deliverables: ['Automated testing', 'Continuous deployment', 'Infrastructure as code', 'Performance monitoring']
        },
        {
          icon: 'consulting',
          title: 'Technical Consulting',
          description: 'Strategic technology guidance and architecture consulting for your projects',
          technologies: ['Microservices', 'API Design', 'Database Design', 'Security Audit'],
          deliverables: ['Technical roadmap', 'Architecture review', 'Performance audit', 'Security assessment']
        }
      ],
      process: {
        title: 'Our Development Process',
        steps: [
          { title: 'Discovery', description: 'Understanding your requirements and goals' },
          { title: 'Planning', description: 'Creating detailed project roadmap and timeline' },
          { title: 'Development', description: 'Building your solution with agile methodology' },
          { title: 'Delivery', description: 'Testing, deployment, and ongoing support' }
        ]
      },
      pricing: {
        title: 'Pricing Plans',
        popular: 'Most Popular',
        getStarted: 'Get Started',
        plans: [
          {
            name: 'Starter',
            price: '$2,500/month',
            description: 'Perfect for small projects and startups',
            features: ['1-2 developers', 'Weekly progress reports', 'Basic support', 'Up to 160 hours/month'],
            popular: false
          },
          {
            name: 'Professional',
            price: '$8,000/month',
            description: 'Ideal for growing businesses',
            features: ['3-5 developers', 'Daily standups', 'Priority support', 'Up to 640 hours/month', 'Technical lead included'],
            popular: true
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            description: 'For large-scale projects',
            features: ['Dedicated team', '24/7 support', 'Custom SLA', 'Unlimited hours', 'On-site visits available'],
            popular: false
          }
        ]
      },
      cta: {
        title: 'Ready to Start Your Project?',
        subtitle: 'Let\'s discuss how we can help bring your vision to life',
        consultation: 'Schedule Free Consultation',
        portfolio: 'View Our Work'
      }
    },
    portfolio: {
      title: 'Our Portfolio',
      subtitle: 'Showcasing our expertise through successful client projects',
      viewDemo: 'View Demo',
      viewCode: 'View Code',
      keyFeatures: 'Key Features',
      results: 'Results',
      categories: {
        all: 'All Projects',
        web: 'Web Development',
        mobile: 'Mobile Apps',
        ai: 'AI/ML',
        cloud: 'Cloud Solutions'
      },
      projects: [
        {
          title: 'E-commerce Platform',
          description: 'Modern e-commerce solution with advanced analytics',
          category: 'web',
          icon: '🛍️',
          technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
          features: ['Real-time inventory', 'Advanced search', 'Payment processing', 'Admin dashboard'],
          metrics: { users: '50K+', conversion: '+25%', performance: '98%', uptime: '99.9%' }
        },
        {
          title: 'Healthcare Mobile App',
          description: 'HIPAA-compliant mobile app for patient management',
          category: 'mobile',
          icon: '🏥',
          technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
          features: ['Appointment booking', 'Video consultations', 'Medical records', 'Push notifications'],
          metrics: { downloads: '25K+', rating: '4.8/5', retention: '85%', satisfaction: '95%' }
        },
        {
          title: 'AI Analytics Dashboard',
          description: 'Machine learning powered business intelligence platform',
          category: 'ai',
          icon: '🤖',
          technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
          features: ['Predictive analytics', 'Real-time insights', 'Custom reports', 'Data visualization'],
          metrics: { accuracy: '94%', 'data points': '1M+', 'processing': '< 100ms', 'insights': '500+' }
        }
      ],
      successStories: {
        title: 'Success Stories',
        stats: [
          { value: '150+', label: 'Projects Completed', description: 'Successfully delivered across various industries' },
          { value: '98%', label: 'Client Satisfaction', description: 'Based on post-project surveys' },
          { value: '24/7', label: 'Support Available', description: 'Round-the-clock technical assistance' }
        ]
      },
      technologies: {
        title: 'Technologies We Work With',
        list: [
          { name: 'React', icon: '⚛️' },
          { name: 'Node.js', icon: '🟢' },
          { name: 'Python', icon: '🐍' },
          { name: 'TypeScript', icon: '🔷' },
          { name: 'AWS', icon: '☁️' },
          { name: 'Docker', icon: '🐳' }
        ]
      },
      cta: {
        title: 'Want to See Your Project Here?',
        subtitle: 'Let\'s create something amazing together',
        startProject: 'Start Your Project',
        viewMore: 'View More Projects'
      }
    },
    testimonials: {
      title: 'Client Testimonials',
      subtitle: 'What our clients say about working with us',
      list: [
        {
          name: 'Sarah Johnson',
          position: 'CEO',
          company: 'TechStart Inc.',
          content: 'BestIT delivered exceptional results. Their team understood our vision perfectly and exceeded all expectations.',
          rating: 5,
          avatar: '/avatars/sarah.jpg',
          project: { type: 'Web Development', technologies: ['React', 'Node.js', 'AWS'] }
        },
        {
          name: 'Michael Chen',
          position: 'CTO',
          company: 'InnovateCorp',
          content: 'Outstanding technical expertise and project management. They delivered on time and within budget.',
          rating: 5,
          avatar: '/avatars/michael.jpg',
          project: { type: 'Mobile App', technologies: ['React Native', 'Firebase'] }
        },
        {
          name: 'Emily Rodriguez',
          position: 'Product Manager',
          company: 'DataFlow Solutions',
          content: 'The AI solution they built transformed our business operations. Highly professional team.',
          rating: 5,
          avatar: '/avatars/emily.jpg',
          project: { type: 'AI/ML', technologies: ['Python', 'TensorFlow', 'Docker'] }
        }
      ],
      stats: {
        title: 'Our Impact',
        metrics: [
          { value: '150+', label: 'Happy Clients', description: 'Across various industries' },
          { value: '98%', label: 'Success Rate', description: 'Projects delivered successfully' },
          { value: '4.9/5', label: 'Average Rating', description: 'Client satisfaction score' },
          { value: '24/7', label: 'Support', description: 'Available when you need us' }
        ]
      },
      awards: {
        title: 'Awards & Recognition',
        list: [
          { title: 'Best Development Team', organization: 'Tech Excellence Awards', year: '2023', icon: '🏆' },
          { title: 'Innovation in AI', organization: 'AI Solutions Summit', year: '2023', icon: '🤖' },
          { title: 'Client Choice Award', organization: 'Business Review Platform', year: '2022', icon: '⭐' },
          { title: 'Top Outsourcing Partner', organization: 'Global Tech Review', year: '2022', icon: '🌟' }
        ]
      },
      clients: {
        title: 'Trusted by Leading Companies',
        logos: [
          { name: 'TechCorp', logo: '/logos/techcorp.png' },
          { name: 'InnovateLab', logo: '/logos/innovatelab.png' },
          { name: 'DataSys', logo: '/logos/datasys.png' },
          { name: 'CloudTech', logo: '/logos/cloudtech.png' },
          { name: 'AIVentures', logo: '/logos/aiventures.png' },
          { name: 'FinanceFlow', logo: '/logos/financeflow.png' }
        ]
      },
      industries: {
        title: 'Industries We Serve',
        list: [
          { name: 'Healthcare', icon: '🏥', projects: 25 },
          { name: 'E-commerce', icon: '🛍️', projects: 35 },
          { name: 'Finance', icon: '💰', projects: 20 },
          { name: 'Education', icon: '🎓', projects: 15 },
          { name: 'Manufacturing', icon: '🏭', projects: 18 },
          { name: 'Real Estate', icon: '🏠', projects: 12 },
          { name: 'Transportation', icon: '🚗', projects: 10 },
          { name: 'Entertainment', icon: '🎬', projects: 8 }
        ]
      },
      cta: {
        title: 'Ready to Join Our Success Stories?',
        subtitle: 'Let\'s discuss how we can help achieve your goals',
        getQuote: 'Get Free Quote',
        caseStudies: 'View Case Studies'
      }
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to start your next project? Get in touch with our team',
      form: {
        title: 'Send us a Message',
        subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours',
        submit: 'Send Message',
        fields: {
          name: { label: 'Full Name', placeholder: 'Enter your full name' },
          email: { label: 'Email Address', placeholder: 'Enter your email address' },
          company: { label: 'Company', placeholder: 'Enter your company name' },
          phone: { label: 'Phone Number', placeholder: 'Enter your phone number' },
          service: {
            label: 'Service Needed',
            placeholder: 'Select a service',
            options: [
              { value: 'web-dev', label: 'Web Development' },
              { value: 'mobile-dev', label: 'Mobile Development' },
              { value: 'cloud', label: 'Cloud Solutions' },
              { value: 'ai-ml', label: 'AI/ML Services' },
              { value: 'consulting', label: 'Technical Consulting' },
              { value: 'other', label: 'Other' }
            ]
          },
          budget: {
            label: 'Project Budget',
            placeholder: 'Select budget range',
            options: [
              { value: '5k-10k', label: '$5K - $10K' },
              { value: '10k-25k', label: '$10K - $25K' },
              { value: '25k-50k', label: '$25K - $50K' },
              { value: '50k-100k', label: '$50K - $100K' },
              { value: '100k+', label: '$100K+' }
            ]
          },
          timeline: {
            label: 'Project Timeline',
            placeholder: 'Select timeline',
            options: [
              { value: 'asap', label: 'ASAP' },
              { value: '1-3months', label: '1-3 months' },
              { value: '3-6months', label: '3-6 months' },
              { value: '6-12months', label: '6-12 months' },
              { value: '12months+', label: '12+ months' }
            ]
          },
          message: { label: 'Project Details', placeholder: 'Tell us about your project requirements...' },
          newsletter: { label: 'Subscribe to our newsletter for tech insights and updates' }
        }
      },
      info: {
        title: 'Get in Touch',
        details: [
          { icon: '📍', label: 'Address', value: '123 Tech Street, Vancouver, BC, Canada' },
          { icon: '📞', label: 'Phone', value: '+1 (604) 555-1234' },
          { icon: '📧', label: 'Email', value: 'info@bestitconsulting.com' },
          { icon: '🌐', label: 'Website', value: 'www.bestitconsulting.com' }
        ]
      },
      hours: {
        title: 'Business Hours',
        schedule: [
          { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
          { days: 'Saturday', hours: '10:00 AM - 4:00 PM PST' },
          { days: 'Sunday', hours: 'Closed' },
          { days: 'Emergency Support', hours: '24/7 Available' }
        ]
      },
      social: {
        title: 'Follow Us',
        links: [
          { platform: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/company/bestitconsulting' },
          { platform: 'Twitter', icon: '🐦', url: 'https://twitter.com/bestitconsulting' },
          { platform: 'GitHub', icon: '👨‍💻', url: 'https://github.com/bestitconsulting' },
          { platform: 'Facebook', icon: '📘', url: 'https://facebook.com/bestitconsulting' }
        ]
      },
      quick: {
        title: 'Quick Contact',
        subtitle: 'Need immediate assistance?',
        options: [
          { label: 'Schedule Call', icon: '📞', link: 'tel:+16045551234' },
          { label: 'Send Email', icon: '📧', link: 'mailto:info@bestitconsulting.com' },
          { label: 'Live Chat', icon: '💬', link: '#chat' }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'What is your typical project timeline?',
            answer: 'Project timelines vary based on complexity, but most projects take 2-6 months from start to finish.'
          },
          {
            question: 'Do you provide ongoing support?',
            answer: 'Yes, we offer comprehensive support and maintenance packages for all our projects.'
          },
          {
            question: 'What technologies do you specialize in?',
            answer: 'We specialize in modern web and mobile technologies including React, Node.js, Python, and cloud platforms.'
          },
          {
            question: 'How do you ensure project quality?',
            answer: 'We follow rigorous testing protocols, code reviews, and agile development methodologies to ensure high quality.'
          }
        ]
      },
      location: {
        title: 'Our Location',
        address: '123 Tech Street, Vancouver, BC, Canada',
        description: 'Located in the heart of Vancouver\'s tech district'
      }
    },
    footer: {
      copy: '© {year} BestITConsulting Ltd. All rights reserved.',
      followUs: 'Follow us:',
      contactInfo: 'Contact Information',
      vancouver: 'Vancouver HQ: 123 Tech Street, Vancouver, BC, Canada',
      eastAsia: 'East Asia Branch: 456 Innovation Avenue, Tech City',
      email: 'info@bestitconsulting.com',
      phone: '+1 (604) 555-1234'
    },
  },
  // For now, we'll use the English translations for other languages
  // In a real implementation, you would translate all content
  fr: {} as any,
  es: {} as any,
  cn: {} as any,
};

// Set other languages to English for now
translations.fr = { ...translations.en };
translations.es = { ...translations.en };
translations.cn = { ...translations.en };

export type Language = 'en' | 'fr' | 'es' | 'cn';
export type TranslationKeys = typeof translations.en;

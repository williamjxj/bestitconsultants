// Translation data for multi-language support
export const translations = {
  en: {
    navbar: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      portfolio: 'Portfolio',
      team: 'Our Team',
      ourWork: 'Our Work',
      contact: 'Contact Us',
    },
    hero: {
      title: 'Expert Software Outsourcing Solutions',
      subtitle:
        'Delivering high-quality, scalable, and innovative software with our global team of full-stack engineers.',
      cta: 'Get a Free Quote',
    },
    aboutSummary: {
      title: 'Who We Are',
      content:
        'BestITConsultants Ltd is a premier software outsourcing company founded by experienced professionals with 20+ years in the industry. We specialize in full-stack development, AI/ML solutions, and enterprise systems. Headquartered in Vancouver, Canada, with strategic partnerships in Asia, we bridge global talent with your project needs.',
      learnMore: 'Learn More About Us',
    },
    servicesSummary: {
      title: 'Our Services',
      content:
        'We offer a wide array of software development services tailored to meet your unique business requirements. From web and mobile applications to complex enterprise solutions, our expertise ensures top-notch results.',
      services: [
        {
          name: 'Custom Web Development',
          description: 'Building responsive and dynamic websites.',
        },
        {
          name: 'Mobile App Development',
          description: 'iOS and Android applications for diverse needs.',
        },
        {
          name: 'Cloud Solutions & DevOps',
          description: 'Scalable cloud infrastructure and CI/CD pipelines.',
        },
        {
          name: 'AI & Machine Learning',
          description: 'Intelligent solutions to drive innovation.',
        },
        {
          name: 'QA & Testing',
          description: 'Ensuring software quality and reliability.',
        },
      ],
      seeAllServices: 'Explore All Services',
    },
    portfolioPreview: {
      title: 'Our Proven Accomplishments',
      viewProject: 'View Project Details',
      projects: [
        {
          id: 1,
          name: 'E-commerce Platform Revamp',
          tech: 'Next.js, Node.js, PostgreSQL',
          description:
            "Overhauled a major online retailer's platform, improving performance by 60% and user engagement by 40%.",
        },
        {
          id: 2,
          name: 'Healthcare Management System',
          tech: 'Java Spring Boot, Angular, AWS',
          description:
            'Developed a secure and HIPAA-compliant system for managing patient records and appointments for a network of clinics.',
        },
        {
          id: 3,
          name: 'AI-Powered Logistics Optimizer',
          tech: 'Python, TensorFlow, Docker, Kubernetes',
          description:
            'Created an AI solution that optimized delivery routes, reducing fuel costs by 15% for a large logistics company.',
        },
      ],
      allProjects: 'View All Projects',
    },
    contactSnippet: {
      title: "Let's Build Excellence Together",
      description:
        "Ready to start your next project or have questions? We're here to help.",
      cta: 'Contact Us Today',
    },
    about: {
      title: 'About BestIT Consulting',
      subtitle:
        'Your trusted partner in software development and digital transformation',
      mission: {
        title: 'Our Mission',
        content:
          'To deliver exceptional software solutions that drive business growth and innovation through cutting-edge technology and expert engineering.',
      },
      vision: {
        title: 'Our Vision',
        content:
          'To be the global leader in software outsourcing, known for quality, reliability, and transformative digital solutions.',
      },
      values: {
        title: 'Our Values',
        list: [
          {
            name: 'Excellence',
            description:
              'We strive for perfection in every line of code and every client interaction.',
          },
          {
            name: 'Innovation',
            description:
              'We embrace cutting-edge technologies to deliver forward-thinking solutions.',
          },
          {
            name: 'Collaboration',
            description:
              'We work closely with our clients as true partners in their success.',
          },
          {
            name: 'Integrity',
            description:
              'We maintain the highest standards of honesty and transparency.',
          },
        ],
      },
      team: {
        title: 'Meet Our Team',
        subtitle:
          'World-class engineers and consultants ready to tackle your challenges',
        members: [
          {
            name: 'William Jiang',
            role: 'Founder & CEO',
            bio: 'Senior Full-Stack Engineer with 20+ years in software architecture and AI-driven solutions. APEC 2002 award winner for FedEx project. Led major initiatives at Xperi (ML Data Pipelines), Credit Suisse (real-time stock integration), HSBC (banking services), WebMD (Big Data pipelines), and BestBuy Canada (e-commerce).',
            image: '/images/william-jiang.jpg',
            specialties: [
              'AI & Machine Learning (MLOps, CUDA, Kubeflow)',
              'React.js, Node.js, Python, Java',
              'Kubernetes, Docker, AWS, MLOps',
              'Microservices, GraphQL, MongoDB',
              'LangChain, LlamaIndex, Hugging Face',
              'Kafka, ElasticSearch, Prometheus',
            ],
          },
          {
            name: 'Chengdu Zhanying Technology Co., Ltd.',
            role: 'Strategic Development Partner',
            bio: 'Professional software development company with teams in Chengdu and Hangzhou. Specializes in OA systems, engineering cost management, mobile development, and government solutions. Serves Fortune 500 clients, government agencies, and major engineering companies.',
            image: '/images/james-cheung.jpeg',
            specialties: [
              'OA Systems (Task, Project, Asset Management)',
              'Engineering Cost Management Systems',
              'Mobile Development (Android/iOS, React Native)',
              'Embedded Systems & Hardware Solutions',
              'Enterprise ERP, MES, EKP Systems',
              'Supply Chain Finance Platforms',
            ],
          },
          {
            name: 'Shamin Yang',
            role: '.NET Architecture Specialist',
            bio: '20+ years Microsoft technology expert with extensive Fortune 500 experience. Led major projects at HSBC (Transformers ETL Platform), IBM (Tiffany e-Commerce), HP (GM applications), and EPAM (Credit Suisse Alpha). Multiple certifications including Google Cloud Architect and DevOps Master.',
            image: '/images/shaming-yang.jpeg',
            specialties: [
              'ASP.NET, .NET Core, Blazor, WPF, UWP',
              'Azure, Google Cloud, AWS Integration',
              'RPA: UiPath, BluePrism, WorkFusion',
              'Database: SQL Server, Oracle, MongoDB',
              'DevOps: Git, TeamCity, Octopus, PowerShell',
              'System Integration: BizTalk, MSMQ, ETL',
            ],
          },
          {
            name: 'Lewis Liu',
            role: 'Senior Full-Stack Developer',
            bio: 'Experienced full-stack developer with expertise in modern web technologies and cloud solutions. Specializes in building scalable applications and leading development teams.',
            image: '/images/lewis-liu.jpg',
            specialties: [
              'React.js, Vue.js, Angular',
              'Node.js, Express, FastAPI',
              'AWS, Azure, Google Cloud',
              'Docker, Kubernetes',
              'PostgreSQL, MongoDB, Redis',
              'GraphQL, REST APIs',
            ],
          },
          {
            name: 'Mingchun Hu',
            role: 'Mobile Development Specialist',
            bio: 'Mobile development expert with extensive experience in iOS and Android app development. Specializes in cross-platform solutions and native mobile applications.',
            image: '/images/mingchun-hu.jpg',
            specialties: [
              'React Native, Flutter',
              'iOS (Swift, Objective-C)',
              'Android (Kotlin, Java)',
              'Mobile UI/UX Design',
              'App Store Optimization',
              'Push Notifications, Analytics',
            ],
          },
          {
            name: 'Wayne Li',
            role: 'DevOps & Cloud Engineer',
            bio: 'DevOps and cloud infrastructure specialist with expertise in automation, monitoring, and scalable system architecture. Focuses on improving development workflows and system reliability.',
            image: '/images/wayne-li.jpg',
            specialties: [
              'AWS, Azure, Google Cloud',
              'Docker, Kubernetes, Terraform',
              'CI/CD Pipelines (Jenkins, GitLab)',
              'Monitoring (Prometheus, Grafana)',
              'Infrastructure as Code',
              'Security & Compliance',
            ],
          },
        ],
      },
      stats: {
        title: 'Our Impact',
        items: [
          {
            number: '200+',
            label: 'Projects Completed',
            description: 'Successfully delivered across industries',
          },
          {
            number: '60+',
            label: 'Happy Clients',
            description: 'From startups to Fortune 500 companies',
          },
          {
            number: '98%',
            label: 'Client Satisfaction',
            description: 'Based on post-project surveys',
          },
          {
            number: '20+',
            label: 'Years Experience',
            description: 'Combined team experience in software development',
          },
        ],
      },
      certifications: {
        title: 'Certifications & Partnerships',
        list: [
          {
            name: 'AWS Certified Solutions Architect',
            organization: 'Amazon Web Services',
          },
          {
            name: 'Google Cloud Professional',
            organization: 'Google Cloud Platform',
          },
          { name: 'Microsoft Azure Expert', organization: 'Microsoft' },
          { name: 'Agile & Scrum Certified', organization: 'Scrum Alliance' },
        ],
      },
    },
    services: {
      title: 'Our Services',
      subtitle:
        'Comprehensive software development solutions tailored to your business needs',
      deliverables: 'Key Deliverables',
      list: [
        {
          icon: 'web-development',
          title: 'Custom Web Development',
          description:
            'Modern, responsive websites and web applications built with cutting-edge technologies',
          technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'TypeScript'],
          deliverables: [
            'Responsive design',
            'SEO optimization',
            'Performance optimization',
            'Cross-browser compatibility',
          ],
        },
        {
          icon: 'mobile-apps',
          title: 'Mobile App Development',
          description:
            'Native and cross-platform mobile applications for iOS and Android',
          technologies: [
            'React Native',
            'Flutter',
            'iOS',
            'Android',
            'Xamarin',
          ],
          deliverables: [
            'Native performance',
            'App store deployment',
            'Push notifications',
            'Offline functionality',
          ],
        },
        {
          icon: 'cloud-solutions',
          title: 'Cloud Solutions',
          description:
            'Scalable cloud infrastructure and DevOps solutions for modern applications',
          technologies: [
            'AWS',
            'Azure',
            'Google Cloud',
            'Docker',
            'Kubernetes',
          ],
          deliverables: [
            'Auto-scaling',
            'CI/CD pipelines',
            'Monitoring & logging',
            'Security compliance',
          ],
        },
        {
          icon: 'ai-ml',
          title: 'AI & Machine Learning',
          description:
            'Intelligent solutions leveraging artificial intelligence and machine learning',
          technologies: [
            'Python',
            'TensorFlow',
            'PyTorch',
            'Scikit-learn',
            'OpenAI',
          ],
          deliverables: [
            'Custom AI models',
            'Data analysis',
            'Predictive analytics',
            'Natural language processing',
          ],
        },
        {
          icon: 'devops',
          title: 'DevOps & Automation',
          description:
            'Streamlined development processes and automated deployment pipelines',
          technologies: [
            'Jenkins',
            'GitLab CI',
            'Terraform',
            'Ansible',
            'Prometheus',
          ],
          deliverables: [
            'Automated testing',
            'Continuous deployment',
            'Infrastructure as code',
            'Performance monitoring',
          ],
        },
        {
          icon: 'consulting',
          title: 'Technical Consulting',
          description:
            'Strategic technology guidance and architecture consulting for your projects',
          technologies: [
            'Microservices',
            'API Design',
            'Database Design',
            'Security Audit',
          ],
          deliverables: [
            'Technical roadmap',
            'Architecture review',
            'Performance audit',
            'Security assessment',
          ],
        },
      ],
      process: {
        title: 'Our Development Process',
        steps: [
          {
            title: 'Discovery',
            description: 'Understanding your requirements and goals',
          },
          {
            title: 'Planning',
            description: 'Creating detailed project roadmap and timeline',
          },
          {
            title: 'Development',
            description: 'Building your solution with agile methodology',
          },
          {
            title: 'Delivery',
            description: 'Testing, deployment, and ongoing support',
          },
        ],
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
            features: [
              '1-2 developers',
              'Weekly progress reports',
              'Basic support',
              'Up to 160 hours/month',
            ],
            popular: false,
          },
          {
            name: 'Professional',
            price: '$8,000/month',
            description: 'Ideal for growing businesses',
            features: [
              '3-5 developers',
              'Daily standups',
              'Priority support',
              'Up to 640 hours/month',
              'Technical lead included',
            ],
            popular: true,
          },
          {
            name: 'Enterprise',
            price: 'Custom',
            description: 'For large-scale projects',
            features: [
              'Dedicated team',
              '24/7 support',
              'Custom SLA',
              'Unlimited hours',
              'On-site visits available',
            ],
            popular: false,
          },
        ],
      },
      cta: {
        title: 'Ready to Start Your Project?',
        subtitle: "Let's discuss how we can help bring your vision to life",
        consultation: 'Schedule Free Consultation',
        portfolio: 'View Our Work',
      },
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
        cloud: 'Cloud Solutions',
      },
      projects: [
        {
          title: 'E-commerce Platform',
          description: 'Modern e-commerce solution with advanced analytics',
          category: 'web',
          icon: '🛍️',
          technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
          features: [
            'Real-time inventory',
            'Advanced search',
            'Payment processing',
            'Admin dashboard',
          ],
          metrics: {
            users: '50K+',
            conversion: '+25%',
            performance: '98%',
            uptime: '99.9%',
          },
        },
        {
          title: 'Healthcare Mobile App',
          description: 'HIPAA-compliant mobile app for patient management',
          category: 'mobile',
          icon: '🏥',
          technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
          features: [
            'Appointment booking',
            'Video consultations',
            'Medical records',
            'Push notifications',
          ],
          metrics: {
            downloads: '25K+',
            rating: '4.8/5',
            retention: '85%',
            satisfaction: '95%',
          },
        },
        {
          title: 'AI Analytics Dashboard',
          description:
            'Machine learning powered business intelligence platform',
          category: 'ai',
          icon: '🤖',
          technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
          features: [
            'Predictive analytics',
            'Real-time insights',
            'Custom reports',
            'Data visualization',
          ],
          metrics: {
            accuracy: '94%',
            'data points': '1M+',
            processing: '< 100ms',
            insights: '500+',
          },
        },
      ],
      successStories: {
        title: 'Success Stories',
        stats: [
          {
            value: '150+',
            label: 'Projects Completed',
            description: 'Successfully delivered across various industries',
          },
          {
            value: '98%',
            label: 'Client Satisfaction',
            description: 'Based on post-project surveys',
          },
          {
            value: '24/7',
            label: 'Support Available',
            description: 'Round-the-clock technical assistance',
          },
        ],
      },
      technologies: {
        title: 'Technologies We Work With',
        list: [
          { name: 'React', icon: '⚛️' },
          { name: 'Node.js', icon: '🟢' },
          { name: 'Python', icon: '🐍' },
          { name: 'TypeScript', icon: '🔷' },
          { name: 'AWS', icon: '☁️' },
          { name: 'Docker', icon: '🐳' },
        ],
      },
      cta: {
        title: 'Want to See Your Project Here?',
        subtitle: "Let's create something amazing together",
        startProject: 'Start Your Project',
        viewMore: 'View More Projects',
      },
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to start your next project? Get in touch with our team',
      form: {
        title: 'Send us a Message',
        subtitle:
          "Fill out the form below and we'll get back to you within 24 hours",
        submit: 'Send Message',
        fields: {
          name: { label: 'Full Name', placeholder: 'Enter your full name' },
          email: {
            label: 'Email Address',
            placeholder: 'Enter your email address',
          },
          company: { label: 'Company', placeholder: 'Enter your company name' },
          phone: {
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
          },
          service: {
            label: 'Service Needed',
            placeholder: 'Select a service',
            options: [
              { value: 'web-dev', label: 'Web Development' },
              { value: 'mobile-dev', label: 'Mobile Development' },
              { value: 'cloud', label: 'Cloud Solutions' },
              { value: 'ai-ml', label: 'AI/ML Services' },
              { value: 'consulting', label: 'Technical Consulting' },
              { value: 'other', label: 'Other' },
            ],
          },
          budget: {
            label: 'Project Budget',
            placeholder: 'Select budget range',
            options: [
              { value: '5k-10k', label: '$5K - $10K' },
              { value: '10k-25k', label: '$10K - $25K' },
              { value: '25k-50k', label: '$25K - $50K' },
              { value: '50k-100k', label: '$50K - $100K' },
              { value: '100k+', label: '$100K+' },
            ],
          },
          timeline: {
            label: 'Project Timeline',
            placeholder: 'Select timeline',
            options: [
              { value: 'asap', label: 'ASAP' },
              { value: '1-3months', label: '1-3 months' },
              { value: '3-6months', label: '3-6 months' },
              { value: '6-12months', label: '6-12 months' },
              { value: '12months+', label: '12+ months' },
            ],
          },
          message: {
            label: 'Project Details',
            placeholder: 'Tell us about your project requirements...',
          },
          newsletter: {
            label: 'Subscribe to our newsletter for tech insights and updates',
          },
        },
      },
      info: {
        title: 'Get in Touch',
        details: [
          {
            icon: '📍',
            label: 'Address',
            value: '9727 152B Street, Surrey, BC V3R 0G5, Canada',
          },
          { icon: '📞', label: 'Phone', value: '+1 (236) 992-3846' },
          { icon: '📧', label: 'Email', value: 'jxjwilliam@gmail.com' },
          { icon: '🌐', label: 'Website', value: 'www.bestitconsultants.ca' },
        ],
      },
      hours: {
        title: 'Business Hours',
        schedule: [
          { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
          { days: 'Saturday', hours: '10:00 AM - 4:00 PM PST' },
          { days: 'Sunday', hours: 'Closed' },
          { days: 'Emergency Support', hours: '24/7 Available' },
        ],
      },
      social: {
        title: 'Follow Us',
        links: [
          {
            platform: 'LinkedIn',
            icon: '💼',
            url: 'https://linkedin.com/company/bestitconsultants',
          },
          {
            platform: 'Twitter',
            icon: '🐦',
            url: 'https://twitter.com/bestitconsultants',
          },
          {
            platform: 'GitHub',
            icon: '👨‍💻',
            url: 'https://github.com/bestitconsultants',
          },
          {
            platform: 'Facebook',
            icon: '📘',
            url: 'https://facebook.com/bestitconsultants',
          },
        ],
      },
      quick: {
        title: 'Quick Contact',
        subtitle: 'Need immediate assistance?',
        options: [
          { label: 'Schedule Call', icon: '📞', link: 'tel:+12369923846' },
          {
            label: 'Send Email',
            icon: '📧',
            link: 'mailto:jxjwilliam@gmail.com',
          },
          { label: 'Live Chat', icon: '💬', link: '#chat' },
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'What is your typical project timeline?',
            answer:
              'Project timelines vary based on complexity, but most projects take 2-6 months from start to finish.',
          },
          {
            question: 'Do you provide ongoing support?',
            answer:
              'Yes, we offer comprehensive support and maintenance packages for all our projects.',
          },
          {
            question: 'What technologies do you specialize in?',
            answer:
              'We specialize in modern web and mobile technologies including React, Node.js, Python, and cloud platforms.',
          },
          {
            question: 'How do you ensure project quality?',
            answer:
              'We follow rigorous testing protocols, code reviews, and agile development methodologies to ensure high quality.',
          },
        ],
      },
      location: {
        title: 'Our Location',
        address: '10355 152 Street, Surrey, BC V3R 7C3, Canada',
        description: 'Located in Surrey, BC - Greater Vancouver Area',
      },
    },
    ourWork: {
      title: 'Our Work',
      subtitle:
        'Explore our portfolio of external projects and collaborations. These represent our diverse expertise and successful partnerships across various industries and technologies.',
      introTitle: 'Featured Projects & Partnerships',
      introDescription:
        "Below you'll find a curated collection of external projects and tools that showcase our technical expertise and industry connections. These projects span multiple categories including business solutions, AI development, e-commerce platforms, and educational tools.",
      projectsTitle: 'Project Showcase',
      projectsDescription:
        'Discover our external collaborations and featured projects. Among our proven, demonstrated apps, here are some demo showcases you can explore directly.',
      ctaTitle: 'Ready to Start Your Project?',
      ctaDescription:
        "Let's discuss how we can bring your vision to life with the same expertise and dedication shown in these projects.",
      ctaButton: 'Get Started Today',
    },
    footer: {
      copy: '© {year} BestITConsultants Ltd. All rights reserved.',
      followUs: 'Follow us:',
      contactInfo: 'Contact Information',
      vancouver: 'Vancouver HQ: 9727 152B Street, Surrey, BC V3R 0G5, Canada',
      eastAsia: 'East Asia Branch: 456 Innovation Avenue, Tech City',
      email: 'jxjwilliam@gmail.com',
      phone: '+1 (236) 992-3846',
    },
    testimonials: {
      title: 'Client Testimonials',
      subtitle: 'What our clients say about our services',
      testimonialsPreview: {
        title: 'Client Success Stories',
        subtitle: 'Hear from our satisfied clients',
        viewAll: 'View All Testimonials',
        moreTestimonials: 'View All Testimonials',
        testimonials: [
          {
            id: '1',
            quote:
              'BestITConsultants delivered exceptional results for our e-commerce platform.',
            name: 'Sarah Johnson',
          },
          {
            id: '2',
            quote:
              'The AI/ML solutions transformed our data analytics capabilities.',
            name: 'Michael Chen',
          },
          {
            id: '3',
            quote:
              'Working with BestITConsultants was a game-changer for our mobile app.',
            name: 'Emily Rodriguez',
          },
        ],
      },
      testimonials: {
        title: 'Client Testimonials',
        subtitle: 'What our clients say about our services',
        viewAll: 'View All Testimonials',
      },
      stats: {
        title: 'Performance Metrics',
        subtitle: 'Key performance indicators',
        metrics: [
          {
            value: '150+',
            label: 'Projects Completed',
            description: 'Successfully delivered',
          },
          {
            value: '98%',
            label: 'Client Satisfaction',
            description: 'Average rating',
          },
          {
            value: '50+',
            label: 'Team Members',
            description: 'Expert developers',
          },
          {
            value: '15+',
            label: 'Years Experience',
            description: 'Industry expertise',
          },
        ],
      },
      awards: {
        title: 'Awards & Recognition',
        subtitle: 'Industry recognition and achievements',
        list: [
          {
            icon: '🏆',
            title: 'Best IT Consulting',
            organization: 'Tech Excellence Awards',
            year: '2023',
          },
          {
            icon: '⭐',
            title: 'Top Rated Agency',
            organization: 'Industry Leaders',
            year: '2023',
          },
          {
            icon: '🎯',
            title: 'Innovation Award',
            organization: 'Innovation Summit',
            year: '2022',
          },
          {
            icon: '💎',
            title: 'Excellence in Service',
            organization: 'Service Quality Institute',
            year: '2022',
          },
        ],
      },
      clients: {
        title: 'Client Portfolio',
        subtitle: 'Our valued clients and partners',
        logos: [
          { name: 'TechCorp' },
          { name: 'DataFlow' },
          { name: 'MobileFirst' },
          { name: 'CloudSys' },
          { name: 'AI Ventures' },
          { name: 'FinTech Pro' },
        ],
      },
      industries: {
        title: 'Industries Served',
        subtitle: 'Diverse industry expertise',
        list: [
          { icon: '🏦', name: 'Finance & Banking', projects: 25 },
          { icon: '🏥', name: 'Healthcare', projects: 18 },
          { icon: '🛒', name: 'E-Commerce', projects: 32 },
          { icon: '🎓', name: 'Education', projects: 15 },
          { icon: '🏭', name: 'Manufacturing', projects: 12 },
          { icon: '🚗', name: 'Automotive', projects: 8 },
          { icon: '🏨', name: 'Hospitality', projects: 10 },
          { icon: '📱', name: 'Technology', projects: 40 },
        ],
      },
      cta: {
        title: 'Ready to Work With Us?',
        subtitle: 'Join our satisfied clients',
        button: 'Get Started',
        getQuote: 'Get a Quote',
        caseStudies: 'View Case Studies',
      },
      tech: {
        title: 'Technologies We Use',
        subtitle: 'Modern tech stack for optimal results',
      },
      metrics: {
        title: 'Performance Metrics',
        subtitle: 'Key performance indicators',
      },
      logos: {
        title: 'Client Logos',
        subtitle: 'Our valued clients and partners',
      },
      list: [
        {
          content:
            "BestITConsultants delivered exceptional results for our e-commerce platform. Their team's expertise in React and Node.js helped us achieve 40% faster load times and a 25% increase in conversion rates.",
          name: 'Sarah Johnson',
          position: 'CTO',
          company: 'TechCorp Solutions',
          avatar: '/images/testimonial-1.jpg',
          rating: 5,
          project: {
            type: 'E-Commerce Platform',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
            metrics: [
              { label: 'Load Time Improvement', value: '40%' },
              { label: 'Conversion Rate', value: '25%' },
              { label: 'User Satisfaction', value: '95%' },
            ],
          },
        },
        {
          content:
            'The AI/ML solutions provided by BestITConsultants transformed our data analytics capabilities. Their machine learning models improved our prediction accuracy by 60% and reduced processing time by 50%.',
          name: 'Michael Chen',
          position: 'Data Science Director',
          company: 'DataFlow Inc',
          avatar: '/images/testimonial-2.jpg',
          rating: 5,
          project: {
            type: 'AI/ML Solution',
            technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
            metrics: [
              { label: 'Prediction Accuracy', value: '60%' },
              { label: 'Processing Time', value: '50%' },
              { label: 'Model Performance', value: '98%' },
            ],
          },
        },
        {
          content:
            'Working with BestITConsultants was a game-changer for our mobile app development. They delivered a cross-platform solution that reduced our development time by 35% while maintaining excellent performance.',
          name: 'Emily Rodriguez',
          position: 'Product Manager',
          company: 'MobileFirst',
          avatar: '/images/testimonial-3.jpg',
          rating: 5,
          project: {
            type: 'Mobile App Development',
            technologies: ['React Native', 'TypeScript', 'Firebase', 'Stripe'],
            metrics: [
              { label: 'Development Time', value: '35%' },
              { label: 'App Performance', value: '99%' },
              { label: 'User Retention', value: '85%' },
            ],
          },
        },
      ],
    },
  },
  // For now, we'll use the English translations for other languages
  // In a real implementation, you would translate all content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fr: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  es: {} as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cn: {} as any,
}

// Set other languages to English for now
translations.fr = { ...translations.en }
translations.es = { ...translations.en }
translations.cn = { ...translations.en }

export type Language = 'en' | 'fr' | 'es' | 'cn'
export type TranslationKeys = typeof translations.en

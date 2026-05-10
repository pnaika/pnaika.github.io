var portfolioData = {

  about: {
    name: { first: 'Prashanth', last: 'Naika' },
    location: 'Seattle, Washington',
    email: 'prashanthpnaika@gmail.com',
    phone: '+1-312-647-8554',
    careerStartYear: 2011,
    resumeUrl: 'resume.html',
    resumeSummary: 'Software Development Manager at Amazon.com Services with 15+ years of experience spanning software engineering and technical leadership. Specialized in web and mobile application development using React, Angular, TypeScript, and AWS. Proven track record of delivering high-impact, customer-facing products at scale while growing and mentoring engineering teams.',
    profileImage: 'https://s3-us-west-2.amazonaws.com/prashanth-resume/resources/images/PrashanthPNaika.jpg',
    bio: [
      'Software Development Manager at <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer">Amazon.com Services</a>, leading a team of engineers building Tier 0 ticketing, paging, and on-call infrastructure relied on by every engineering team across the company.',
      'With over <strong class="years-exp"></strong> years in software engineering, I\'ve delivered high-impact solutions for clients including SunTrust Bank, WellPoint, CVS Health, and Uptake, working with teams at <a href="https://www.infosys.com/" target="_blank" rel="noopener noreferrer">Infosys</a>, <a href="https://egen.solutions/" target="_blank" rel="noopener noreferrer">Egen Solutions</a>, and DriveTime before joining Amazon in 2020.',
      'I\'m passionate about mentoring engineers, fostering a culture of ownership and innovation, and building high-performing teams. I hold a Master\'s in Information Technology and Management from the <a href="https://web.iit.edu/" target="_blank" rel="noopener noreferrer"><i>Illinois Institute of Technology</i></a> (GPA 3.9/4.0).'
    ],
    social: [
      { icon: 'fab fa-linkedin-in',  url: 'https://www.linkedin.com/in/prashanthnaika',       label: 'LinkedIn',  external: true  },
      { icon: 'fab fa-github',        url: '#github',                                            label: 'GitHub',    external: false },
      { icon: 'fab fa-facebook-f',    url: 'https://www.facebook.com/prashanthpnaik17',         label: 'Facebook',  external: true  },
      { icon: 'fab fa-x-twitter',      url: 'https://twitter.com/prashanth17naik',               label: 'X',         external: true  },
      { icon: 'fab fa-medium',        url: '#blogs',                                             label: 'Medium',    external: false },
      { icon: 'fab fa-500px',         url: 'https://500px.com/prashanth17naik',                 label: '500px',     external: true  },
      { icon: 'fab fa-instagram',     url: 'https://www.instagram.com/iamprashanthnaik/',       label: 'Instagram', external: true  },
      { icon: 'fab fa-behance',       url: 'https://www.behance.net/prashanthpnaik17',          label: 'Behance',   external: true  }
    ]
  },

  experience: [
    {
      title: 'Software Development Manager',
      company: 'Amazon.com Services',
      companyUrl: 'https://www.amazon.com/',
      logo: 'img/aws.png',
      logoAlt: 'Amazon',
      period: 'Aug 2025 – Present',
      bullets: [
        'Lead a team of 10–12 engineers owning Amazon\'s Tier 0 internal ticketing, paging, and on-call platform — mission-critical infrastructure relied on by every engineering team across the company',
        'Drive technical roadmap, headcount planning, and delivery for a zero-downtime system that underpins Amazon\'s global operational response',
        'Partner with senior leadership and cross-org stakeholders to align on reliability, scalability, and feature investments for the platform',
        'Champion engineering culture and operational excellence — bar raising, on-call health, and incident response standards — to maintain the highest service bar',
        'Mentor and develop engineers across multiple levels, fostering career growth and building a high-performing, ownership-driven team'
      ]
    },
    {
      title: 'Senior Front End Engineer',
      company: 'Amazon.com Services',
      companyUrl: 'https://www.amazon.com/',
      logo: 'img/aws.png',
      logoAlt: 'Amazon',
      period: 'Mar 2020 – Aug 2025',
      bullets: [
        'Served as front-end tech lead for the Tier 0 ticketing, paging, and on-call platform, guiding architecture decisions and setting code quality standards across the team',
        'Designed and built customer-facing UI workflows used by Amazon engineers globally for incident management, paging, and operational response',
        'Mentored junior and mid-level engineers through code reviews, pair programming, and front-end best practice guidance',
        'Drove modernization of the front-end stack with React and TypeScript, improving developer velocity and long-term maintainability',
        'Collaborated cross-functionally with PMs, designers, and back-end engineers to ship high-quality, high-reliability releases'
      ]
    },
    {
      title: 'Application Developer III',
      company: 'DriveTime',
      companyUrl: 'https://www.drivetime.com/',
      logo: 'img/drivetime.jpg',
      logoAlt: 'DriveTime',
      period: 'Sep 2018 – Mar 2020',
      bullets: [
        'Developed and maintained customer-facing web and mobile applications using Ionic 3+, Angular 5, TypeScript, and SCSS',
        'Implemented feature flag–based continuous delivery using LaunchDarkly, enabling business teams to independently control feature rollouts and reduce deployment risk',
        'Extended mobile application capabilities with Cordova plugins, enhancing native device functionality within the hybrid platform',
        'Maintained code quality through unit testing with Jasmine and Protractor and active participation in code reviews',
        'Partnered with product and business stakeholders to gather sprint feedback and translate customer insights into UX improvements'
      ]
    },
    {
      title: 'Senior Web Developer',
      company: 'Egen Solutions',
      companyUrl: 'https://egen.solutions/',
      logo: 'img/egen.jpeg',
      logoAlt: 'Egen Solutions',
      period: 'May 2015 – Aug 2018',
      clients: [
        {
          name: 'Uptake',
          url: 'https://www.uptake.com/',
          logo: 'img/uptake.png',
          logoAlt: 'Uptake',
          roles: [
            {
              title: 'Senior Web Application Developer',
              bullets: [
                'Key front-end developer on Uptake\'s predictive analytics platform, transforming industrial IoT data into actionable business intelligence for fleet and asset management customers',
                'Built geo-tab data dashboards using VueJS and HapiJS to visualize trip records, hours of service, DVIR, and IFTA reporting; integrated Leaflet for interactive map and route views',
                'Developed a Single Page Application in React-Redux, covering the full front-end lifecycle from architecture design to Jest unit testing',
                'Led UX collaboration and front-end decision-making on a cross-disciplinary team, driving a cleaner and more meaningful data visualization experience',
                'Applied CSS/Sass expertise to translate design specs into pixel-perfect, responsive interfaces across the platform',
                'Collaborated closely with data scientists to validate schemas and prove data concepts through interactive visualization prototypes'
              ]
            },
            {
              title: 'Mobile Application Developer',
              bullets: [
                'Developed a cross-platform IoT mobile application using Ionic and Angular, compatible with both Android and iOS',
                'Integrated Crashlytics for real-time crash reporting and Piwik for user interaction analytics, improving product observability',
                'Conducted code reviews and established front-end best practices to maintain consistent quality across the team',
                'Leveraged Elastic Search for NoSQL data operations and Jenkins for CI/CD build and deployment pipelines'
              ]
            }
          ]
        },
        {
          name: 'CVS Health',
          url: 'https://cvshealth.com/',
          logo: 'img/cvs.png',
          logoAlt: 'CVS Health',
          roles: [
            {
              title: 'Web Application Developer',
              bullets: [
                'Developed a physician portal using AngularJS, HTML5, CSS3, and JavaScript to streamline healthcare provider workflows',
                'Established the project test framework from the ground up using Jasmine, ensuring quality standards were built in from day one',
                'Participated in UI/UX discussions and technical decision-making, contributing to design and architecture choices',
                'Collaborated with the automation testing team to align manual and automated test coverage'
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Web Developer',
      company: 'Infosys',
      companyUrl: 'https://www.infosys.com/',
      logo: 'img/infosys.png',
      logoAlt: 'Infosys',
      logoStyle: 'long',
      period: 'Jun 2012 – Jul 2014',
      bullets: [
        'Developed the front end for SunTrust Bank\'s online banking platform using AngularJS, HTML5, CSS3, and JavaScript, supporting millions of customers with account management, fund transfers, and check ordering',
        'Translated graphic designer mockups into responsive, accessible CSS/HTML themes following Web Accessibility Guidelines',
        'Implemented client-side validations and interactive features using JavaScript, jQuery, AJAX, and DOM scripting',
        'Ensured cross-browser and cross-platform compatibility through systematic debugging and testing across major browsers',
        'Delivered responsive layouts optimized for tablet and mobile as part of the Expressionery site redesign'
      ]
    },
    {
      title: 'Mainframe Developer',
      company: 'Infosys',
      companyUrl: 'https://www.infosys.com/',
      logo: 'img/infosys.png',
      logoAlt: 'Infosys',
      logoStyle: 'long',
      period: 'Jun 2011 – Jun 2012',
      bullets: [
        'Developed online screens for WellPoint\'s provider portal on mainframe systems using IMSDC, CICS, JCL, and DB2',
        'Performed requirement analysis, abend analysis, and production job monitoring to ensure system stability',
        'Independently managed and delivered Small Change Requests (SCRs) end-to-end into production',
        'Participated in all phases of the SDLC following the Infosys Global Delivery Model'
      ]
    }
  ],

  education: [
    {
      school: 'Illinois Institute of Technology',
      logo: 'img/IIT.gif',
      logoAlt: 'Illinois Institute of Technology',
      logoStyle: 'university',
      degree: 'Information Technology and Management',
      track: 'Information Technology — Web Development Track',
      gpa: '3.9 / 4.0',
      period: 'Aug 2014 – May 2016'
    },
    {
      school: 'RNS Institute of Technology',
      logo: 'img/rnsit.jpeg',
      logoAlt: 'RNS Institute of Technology',
      logoStyle: 'avatar',
      degree: 'Electronics and Communication Engineering',
      track: null,
      gpa: '3.8 / 4.0 (75%)',
      period: 'Jun 2007 – Jun 2011'
    }
  ],

  skills: {
    icons: [
      [
        { label: 'Angular',     icon: 'devicon-angularjs-plain colored',              url: 'https://angular.io/'                                          },
        { label: 'Ionic',       icon: 'devicon-ionic-original colored',               url: 'https://ionicframework.com/'                                  },
        { label: 'ReactJS',     icon: 'devicon-react-original colored',               url: 'https://reactjs.org/'                                         },
        { label: 'TypeScript',  icon: 'devicon-typescript-plain colored',             url: 'https://www.typescriptlang.org/'                              },
        { label: 'JavaScript',  icon: 'devicon-javascript-plain colored',             url: 'https://www.javascript.com/'                                  },
        { label: 'HTML5',       icon: 'devicon-html5-plain colored',                  url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'            },
        { label: 'CSS3',        icon: 'devicon-css3-plain colored',                   url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'             },
        { label: 'Sass',        icon: 'devicon-sass-original colored',                url: 'https://sass-lang.com/'                                       },
        { label: 'Node.js',     icon: 'devicon-nodejs-plain colored',                 url: 'https://nodejs.org/en/'                                       },
        { label: 'Android',     icon: 'devicon-android-plain colored',                url: 'https://www.android.com/'                                     }
      ],
      [
        { label: 'AWS',         icon: 'devicon-amazonwebservices-plain-wordmark colored', url: 'https://aws.amazon.com/'                                  },
        { label: 'Bootstrap',   icon: 'devicon-bootstrap-plain colored',              url: 'https://getbootstrap.com/'                                    },
        { label: 'Webpack',     icon: 'devicon-webpack-plain colored',                url: 'https://webpack.js.org/'                                      },
        { label: 'Gulp',        icon: 'devicon-gulp-plain colored',                   url: 'https://gulpjs.com/'                                          },
        { label: 'npm',         icon: 'devicon-npm-original-wordmark colored',        url: 'https://www.npmjs.com/'                                       },
        { label: 'Firebase',    icon: 'devicon-firebase-plain colored',               url: 'https://firebase.google.com/'                                 },
        { label: 'MySQL',       icon: 'devicon-mysql-plain colored',                  url: 'https://www.mysql.com/'                                       }
      ],
      [
        { label: 'Jira',            icon: 'devicon-jira-plain colored',           url: 'https://www.atlassian.com/software/jira'                          },
        { label: 'GitHub',          icon: 'devicon-github-original',              url: 'https://github.com/pnaika'                                        },
        { label: 'Bitbucket',       icon: 'devicon-bitbucket-original colored',   url: 'https://bitbucket.org/'                                           },
        { label: 'Google Analytics',icon: 'fas fa-chart-bar',                     url: 'https://analytics.google.com/analytics/web/'                      }
      ]
    ],
    other: ['VueJS', 'HapiJS', 'Elastic Search', 'Selenium', 'C#', '.NET MVC'],
    workflow: [
      'Mobile-First, Responsive Design',
      'Cross Browser Testing & Debugging',
      'Cross Functional Teams',
      'Agile Development & Scrum'
    ]
  },

  sideProjects: [
    {
      name: 'The Scrummish!',
      url: 'https://www.thescrummish.com',
      description: 'An application which helps make sprint planning a better experience. Also available as a desktop app.',
      stack: 'Angular 9, Firebase, TypeScript'
    },
    {
      name: 'Medium Articles',
      url: 'https://medium.com/@prashanth17.naik',
      description: 'Writing articles for better learning and sharing experience with the tech community.',
      stack: null
    }
  ],

  github: {
    npmContributions: [
      {
        name: 'react-super-treeview',
        url: 'https://github.com/azizali/react-super-treeview/blob/master/readme.md'
      }
    ]
  },

  recommendations: [
    {
      name: 'Chris Paskvan',
      linkedIn: 'https://www.linkedin.com/in/chrispaskvan',
      text: [
        'I had the opportunity to manage Prashanth on a couple of different teams. He is the kind of developer I always seek out. He enjoys learning new technology, delivers consistently, and demonstrates the level of commitment above what is expected. In addition, his ability to collaborate with others makes him someone I trust to get the job done.'
      ]
    },
    {
      name: 'Sri Konduru',
      linkedIn: 'https://www.linkedin.com/in/sri-konduru-63134b76',
      text: [
        'Prashanth is an experienced and reliable front-end software engineer who keeps himself up to date on the latest technologies and good practices in front-end software practices. He has an outstanding work ethic and is open, a quick learner, and very professional. While always being positive and helpful, he never hesitates to provide support when apparent.',
        "It's a pleasure and an honor to recommend Prashanth to anyone who wants to hire him as a Software Engineer."
      ]
    },
    {
      name: 'Ken Perera',
      linkedIn: 'https://www.linkedin.com/in/kenperera',
      text: [
        'Prashanth is a capable, friendly and professional individual who was an asset as a member of the Fleet team, and a pleasure to work with. As a Senior Developer on a key customer-facing product, he helped our team bring to market a number of essential features that directly supported our customers and their operations.'
      ]
    },
    {
      name: 'Aziz Ali',
      linkedIn: 'https://www.linkedin.com/in/azizali/',
      text: [
        'There are two things I look for in people I am working with: (1) Constructive & progressive attitude (2) Relevant technical skills. And I must say that Prashanth excels in both categories.',
        'Prashanth joined my team at Uptake and early on I noticed that he was friendly, approachable and genuine. That is great but with that he had a keen interest in making the project good — technically and from a user experience standpoint as well.',
        'Prashanth would proactively make suggestions for improvement in our project and would even volunteer to take up the implementation of those tasks.',
        "When Prashanth started on our project, he didn't have experience on our technology stack. I'll be honest, I was surprised how fast he got up to speed with our tech-stack without much input from me. This shows that he is a self-starter and quick learner.",
        'Besides being a great co-worker, and a great employee to have, Prashanth has a rare knack for entrepreneurship. I believe this enterprising attitude makes him a great employee as well — since he is not just taking instructions, he is solving problems.',
        'I wish you well my man @prashanth'
      ]
    },
    {
      name: 'Sunil Kavali',
      linkedIn: 'https://www.linkedin.com/in/sunilkavalisreenivasamurthy',
      text: [
        'I had worked with Prashanth Naika for close to 3 years. In this time he was an integral part of all the teams that he had worked for. He was fun to be around with and has an equally exceptional passion for coding. He will be an indispensable resource for any company.'
      ]
    },
    {
      name: 'Yashraj Jayaraj',
      linkedIn: 'https://www.linkedin.com/in/yjdigge',
      text: [
        "I got to learn a lot from Prashanth when I had the pleasure of working with him at Egen Inc. In my honest opinion he is one of those developers who's in love with the project and technologies used therein. I look forward to working with him in the future."
      ]
    },
    {
      name: 'Tintu Pathrose',
      linkedIn: 'https://www.linkedin.com/in/tintu-pathrose-29658a2',
      text: [
        'Prashanth and I worked together on a recent project. Prashanth is a detail oriented, innovative and careful perfectionist. He has extensive knowledge and strong experience in UI, which immensely helped our deadline. He always tried to see the big picture which helped us plan better. I would definitely opt to work with him again.'
      ]
    },
    {
      name: 'Vincent Porcelli',
      linkedIn: 'https://www.linkedin.com/in/vincent-porcelli-38376914',
      text: [
        "I worked with Prashanth as a Technical lead on an Angular project. I enjoyed working with him. He dug in and got the job done. He would not hesitate to ask questions or offer ideas. I always knew that I did not have to worry about any assignment that he had — it would be done correctly. In the midst of the craziness of delivering a large project in a new technology, he never wavered and always had a great can-do attitude. I would without hesitation love to work with him again. That is the best recommendation that anyone can give."
      ]
    }
  ],

  awards: [
    'Published a paper at Infosys — "DL/I Status codes" — which received a huge response and very positive comments at the Infosys KSHOP (Knowledge Portal). This document helped many Infosys employees facing similar problems while coding in IMSDC.',
    'Awarded Best Performer Award (INSTA Award) for three consecutive quarters for outstanding performance in designing, scripting and executing test cases on time and with high quality. This award is given to only outstanding performers among the 150,000+ employees of Infosys.',
    'Completed a course in HTG on basics of Hardware and Networking in 2005 and secured an "A" grade in the institutional test. This motivated me to start an Information Technology Services startup "P S Computers" where we were able to win many clients.'
  ],

  interests: {
    headline: 'Big fan of Cameras',
    description: 'Photography remains my biggest interest and hobby.',
    gear: [
      'Canon T5i',
      'Canon 80D',
      'Canon 5D Mark VI',
      '10–24mm wide angle lens',
      'Zoom Lenses: 18–135mm, 70–300mm, 70–200mm, 18–55mm',
      'Studio Environment Photography'
    ],
    links: [
      { icon: 'fas fa-camera',    url: 'https://pnaika.myportfolio.com/',                  label: 'My Photography Website', external: true },
      { icon: 'fab fa-500px',     url: 'https://500px.com/prashanth17naik',                label: '500px',                  external: true },
      { icon: 'fab fa-facebook',  url: 'https://www.facebook.com/iamphotophile17/',        label: 'Facebook Page',          external: true },
      { icon: 'fab fa-instagram', url: 'https://www.instagram.com/iamprashanthnaik/',      label: 'Instagram',              external: true },
      { icon: 'fab fa-behance',   url: 'https://www.behance.net/prashanthpnaik17',         label: 'Behance',                external: true }
    ]
  }

};

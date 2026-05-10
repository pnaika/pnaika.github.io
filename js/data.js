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
      'I am a results-driven IT professional with over <strong class="years-exp"></strong> years of experience in software engineering, specializing in web and mobile application development. My career has been shaped by a passion for emerging technologies, and I am always eager to explore innovative solutions that drive business success.',
      'Currently serving as a Software Development Manager at <a href="https://www.amazon.com/" target="_blank" rel="noopener noreferrer">Amazon.com Services</a>, leading cross-functional engineering teams to deliver scalable, customer-facing products. Prior to this, I delivered high-impact solutions for major clients including SunTrust Bank, WellPoint, CVS Health, and Uptake, working with teams at <a href="https://www.infosys.com/" target="_blank" rel="noopener noreferrer">Infosys</a>, <a href="https://egen.solutions/" target="_blank" rel="noopener noreferrer">Egen Solutions</a>, and DriveTime.',
      'As a leader, I am passionate about mentoring and supporting the growth of new engineers, empowering them to advance in their careers and contribute to team success. My goal is to continue taking on leadership roles, foster innovation, and drive the development of cutting-edge technologies while advancing both professionally and personally.',
      'I hold a Master\'s degree in Information Technology and Management from the <a href="https://web.iit.edu/" target="_blank" rel="noopener noreferrer"><i>Illinois Institute of Technology</i></a>, with a GPA of 3.9 out of 4.0, which further reinforces my commitment to excellence in both technical and managerial domains.'
    ],
    social: [
      { icon: 'fab fa-linkedin-in',  url: 'https://www.linkedin.com/in/prashanthnaika',       label: 'LinkedIn',  external: true  },
      { icon: 'fab fa-github',        url: '#github',                                            label: 'GitHub',    external: false },
      { icon: 'fab fa-facebook-f',    url: 'https://www.facebook.com/prashanthpnaik17',         label: 'Facebook',  external: true  },
      { icon: 'fab fa-twitter',       url: 'https://twitter.com/prashanth17naik',               label: 'Twitter',   external: true  },
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
        'Web and Mobile application development using Ionic 3+, Angular 5, TypeScript and SCSS',
        'Feature flag based development to continuously deploy code, empowering business teams with control over features for better customer experience',
        'Cordova plugins for advanced features in mobile development',
        'Deployed code using VSTS',
        'Project implementations using Agile SCRUM methodology',
        'Used Target Process for creating stories and implementation descriptions',
        'Unit testing using Jasmine and Protractor',
        'Active interaction with business team and product for coming up with better solutions to improve user experience',
        'Gathered key customer feedback in sprint demos and actively participated with team in solving problems'
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
                'Web application development for geo-tab data using <i>VueJS</i> and <i>HapiJS</i>',
                'Key front-end developer who delivered a highly reliable predictive analytic software',
                'Front-end leadership and management contribution on a cross-disciplinary team',
                '<i>CSS/SASS/LESS</i> expertise to bring design to life',
                'Active involvement in development of Uptake\'s predictive analytics platform in <i>AngularJS</i> with the main motto of <strong>Transform data into business value</strong>',
                'Developed a Single Page Application in React-Redux and tested in JEST',
                'Strong interaction with UX to create a cleaner and more meaningful data analytic platform',
                'Project implementations using <i>Agile SCRUM</i> methodology',
                'Active participation in bi-weekly sprint demos with all stakeholders',
                'Design and development of UI using VueJS, ReactJS, HTML5, CSS, pre-processors, AngularJS, lodash, Gulp, Webpack, HighCharts, etc.',
                'Backend support with Spring MVC',
                'Used JIRA for logging defects and issue tickets',
                'Used <i>geo-tab</i> APIs for creating a dashboard to analyze trip, hours of service, DVIR and IFTA data',
                'Experience working with <i>Leaflet</i> for map view and route details on geo-tab APIs',
                'Worked closely with data scientists to prove schema and data concepts through visualization',
                'Implemented many POCs and participated in many hackathons'
              ]
            },
            {
              title: 'Mobile Application Developer',
              bullets: [
                'Developed a mobile application for IoT domain using Ionic and Angular',
                'Implemented project using Agile SCRUM — daily stand-ups, sprint showcases and retrospectives',
                'Design and development of UI using HTML5, CSS, AngularJS and Ionic',
                'Design and development of UI using HTML5, CSS, Webpack and ReactJS',
                'Backend support with Spring MVC',
                'Implemented Crashlytics for Crash Reporting',
                'Implemented Piwik for analytics',
                'Conducted code reviews to maintain best practices in the development process',
                'Used JIRA for tracking errors and debugging the code',
                'Implemented LESS styles and used Gulp for task completion',
                'Used Elastic Search for NoSQL operations'
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
                'Developed a physician portal using AngularJS, HTML5, CSS3, and JavaScript',
                'Used SVN for version control',
                'Unit tests in Jasmine',
                'Active involvement in technical decisions',
                'Quick implementation of project setup maintaining quality with test frameworks and test rules',
                'Involvement in UI/UX discussions',
                'Supporting automation testing team'
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
        'Developed front end for the entire website using AngularJS, HTML5, CSS3, and JavaScript',
        'Converted raw images and layouts from a graphic designer into CSS/HTML themes',
        'Followed Web Accessibility Guidelines while coding the website',
        'Implemented client-side validations in registration, login and logout forms using JavaScript',
        'Extensively used jQuery, JSON, AJAX and DOM scripting to create interactive web applications',
        'Worked with the design of templates and skins in CSS',
        'Used Firebug and IE developer toolbar for debugging and browser compatibility',
        'Adopted a cross-browser and cross-platform approach to make the website more versatile and supportive',
        'Active team player — helped in fixing bugs and carried out troubleshooting',
        'Adhered to corporate standards with respect to problem, change and configuration management',
        'Worked on Responsive Design for tablets and mobiles for the Expressionery site'
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
        'Performed Requirement Analysis',
        'Developed online screens in Mainframes using IMSDC, CICS, JCL and DB2',
        'Performed Abend analysis during production issues and monitored jobs',
        'Involved in SDLC cycle and participated in all steps of the Global Delivery Model',
        'Managed SSCR (Small Change Request) single-handed and implemented the module successfully into production'
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

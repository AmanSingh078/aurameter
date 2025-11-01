export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const getRoleBio = (role: string): string => {
  const roleBios: { [key: string]: string } = {
    'Co-Founder Aurameter': 'Visionary leader driving innovation and strategic growth at Aurameter.',
    'Creative team lead and Editor': 'Leading creative initiatives and editorial content with artistic vision.',
    'Developer': 'Full-stack developer building scalable solutions with modern technologies.',
    'ML Engineer': 'Machine learning specialist developing intelligent systems and algorithms.',
    'Website lead Developer': 'Frontend architect creating exceptional user experiences and interfaces.',
    'Backend developer': 'Backend engineer building robust server-side applications and APIs.',
    'Developer and Designer': 'Versatile professional combining development skills with design expertise.',
    'Developer and creative team': 'Developer contributing to both technical and creative aspects of projects.',
    'Creative Team': 'Creative professional bringing innovative ideas to visual and content projects.',
    'Creative Writer': 'Content strategist crafting compelling narratives and engaging copy.',
    'Product Manager': 'Product strategist driving user-centric solutions and feature development.',
    'Product & Marketing Manager': 'Dual-role leader managing product strategy and marketing initiatives.',
    'Video editing': 'Video production specialist creating engaging multimedia content.',
    'Design and social media': 'Visual designer managing brand presence across social platforms.',
    'UI/UX DESIGNER': 'User experience designer focused on intuitive and accessible interfaces.',
    'Brand Relation Manager': 'Relationship specialist building strategic partnerships and brand connections.',
    'Creative team and Social media': 'Creative professional managing social media presence and engagement.',
    'Marketing': 'Marketing specialist driving brand awareness and customer acquisition.',
    'Editior': 'Editorial expert ensuring content quality and brand consistency.',
    'Creative team lead': 'Creative strategy leader overseeing editorial direction and team coordination.'
  };
  
  return roleBios[role] || 'Dedicated team member contributing to innovative solutions and company success.';
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Ankit Bhati',
    role: 'Co-Founder Aurameter',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 22.26.51_9d549317.jpg',
    bio: 'Visionary leader driving strategic innovation and product development growth at Aurameter',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/ankit-bhati-9a1093324',
      instagram: 'https://www.instagram.com/ak_bhati__19?igsh=MWJjb212M3NkcHp4MA=='
    }
  },
  {
    id: 2,
    name: 'Nikhil Jha',
    role: ' Co-Founder Aurameter',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 22.26.51_a8a2f650.jpg',
    bio: 'Visionary leader driving tech and innovation growth at Aurameter',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/nikhil-jha-799a6b141',
    }
  },
  {
    id: 3,
    name: 'Niraj Mandal',
    role: 'Creative team lead and Editor',
    image: '/image/team numbers photos/pfp nirajjjjj - Niraj Mandal.jpg',
    bio: getRoleBio('Creative team lead and Editor'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/niraj-mandal-913095307?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 4,
    name: 'Aman Singh',
    role: 'Developer',
    image: '/image/team numbers photos/Snapchat-649764532~2 - AMAN SINGH.jpg',
    bio: getRoleBio('Developer'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/aman-singh-a5a476288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 5,
    name: 'Shantanu Panchal',
    role: 'ML Engineer',
    image: '/image/team numbers photos/ShantanuPanchal_ - Shantanu Panchal.jpg',
    bio: getRoleBio('ML Engineer'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/shantanu-panchal-329973315/',
    }
  },
  {
    id: 6,
    name: 'Govind Bhatter',
    role: 'Website lead Developer',
    image: '/image/team numbers photos/IMG_20251023_153644_915 - Govind Bhatter.webp',
    bio: getRoleBio('Website lead Developer'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/govind-bhatter-969a81290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    }
  },
  {
    id: 7,
    name: 'Vaibhav Agarwal',
    role: 'Developer',
    image: '/image/team numbers photos/IMG-20251002-WA0212 - Vaibhav Agarwal.jpg',
    bio: getRoleBio('Developer'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/agarwalva'
    }
  },
  {
    id: 8,
    name: 'Tanmay',
    role: 'Backend developer',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-21 at 19.43.37_988e449b - TANMAY.jpg',
    bio: getRoleBio('Backend developer'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/tanmay-gosavi-a42368324/'
    }
  },
  {
    id: 9,
    name: 'Piyush',
    role: 'Developer and Designer',
    image: '/image/team numbers photos/12782_11zon - Piyush.jpg',
    bio: getRoleBio('Developer and Designer'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/piyushthapliyalprof2006?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 10,
    name: 'M.Charan Reddy',
    role: 'Developer and creative team',
    image: '/image/team numbers photos/IMG_20251026_005555 - M.Charan Reddy.jpg',
    bio: getRoleBio('Developer and creative team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/charan-reddy-m-2694971b6/'
    }
  },
  {
    id: 11,
    name: 'Ishita Kasrija',
    role: 'Developer and creative team',
    image: '/image/team numbers photos/IMG-20250417-WA0046 - Ishita Kasrija.jpg',
    bio: getRoleBio('Developer and creative team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/ishita-kasrija-970764339?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 12,
    name: 'Diya',
    role: 'Creative Team',
    image: '/image/team numbers photos/2025-10-25 23-34-53 - Diya.jpeg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/diyachande',
    }
  },
  {
    id: 13,
    name: 'Devyani Mishra',
    role: 'Creative Team',
    image: '/image/team numbers photos/Snapchat-1832617595~3 - Devyani Mishra.jpg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/devyani-mishra-2b4080384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 14,
    name: 'Jimil Panchal',
    role: 'Creative Team',
    image: '/image/team numbers photos/IMG_20250504_181708 - Jimil Panchal.jpg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/jimil-panchal-b3a92a296?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    }
  },
  {
    id: 15,
    name: 'Vania Mangla',
    role: 'Creative Team',
    image: '/image/team numbers photos/8949FC17-9B2C-40C6-A20B-99E8BEFA2557 - vania mangla.jpeg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/vania-mangla-b8898336b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
    }
  },
  {
    id: 16,
    name: 'Dhawal Mehrotra',
    role: 'Creative Writer',
    image: '/image/team numbers photos/IMG-20230125-WA0052 - Mystical Poet.jpg',
    bio: getRoleBio('Creative Writer'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/dhawal-mehrotra-25875b378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 17,
    name: 'Twinkle',
    role: 'Product Manager',
    image: '/image/team numbers photos/52641 - Twinkle.jpg',
    bio: getRoleBio('Product Manager'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/twinkle14?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 18,
    name: 'Shreya Patel',
    role: 'Product & Marketing Manager',
    image: '/image/team numbers photos/IMG_20251031_210700 - Shreya Patel.jpg',
    bio: getRoleBio('Product & Marketing Manager'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/shreyapatel-p'
    }
  },
  {
    id: 19,
    name: 'Harshit Arora',
    role: 'Creative Team',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-26 at 13.30.19_1a6c5b97 - honey.jpg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/harshit-arora-788a5b350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 20,
    name: 'Dhyani Panchal',
    role: 'Product Manager',
    image: '/image/team numbers photos/IMG-20250926-WA0005 - Dhyani Panchal(1).jpg',
    bio: getRoleBio('Product Manager'),
    socialMedia: {
    }
  },
  {
    id: 21,
    name: 'Pranay Bijutkar',
    role: 'Video editing',
    image: '/image/team numbers photos/IMG-20250208-WA0011 - Pranay Bijutkar.jpg',
    bio: getRoleBio('Video editing'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/pranay-bijutkar-558445352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 22,
    name: 'Aastha Yadav',
    role: 'Design and social media',
    image: '/image/team numbers photos/IMG-20250418-WA0017 - Aastha Yadav.jpg',
    bio: getRoleBio('Design and social media'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/aastha-yadav-8261a5358?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 23,
    name: 'Hari lakshminaryana R',
    role: 'UI/UX DESIGNER',
    image: '/image/team numbers photos/IMG-20250922-WA0034 - Harilakshminaryana R.jpg',
    bio: getRoleBio('UI/UX DESIGNER'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/harilakshminarayana-r-094a7b282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      twitter: '#'
    }
  },
  {
    id: 24,
    name: 'Rachita Tripathy',
    role: 'Brand Relation Manager',
    image: '/image/team numbers photos/WhatsApp Image 2025-11-01 at 12.34.23_2f83adaf.jpg',
    bio: getRoleBio('Brand Relation Manager'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/rachitatripathy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    }
  },
  {
    id: 25,
    name: 'Shashwat Singh',
    role: 'Creative team and Social media',
    image: '/image/team numbers photos/IMG-20251029-WA0028(1) - Shashwat Singh.jpg',
    bio: getRoleBio('Creative team and Social media'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/shashwat-singh-b73310383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 26,
    name: 'Priyanshu',
    role: 'Editior',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 21.52.35_c2516fd8.jpg',
    bio: getRoleBio('Editior'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/priyanshu-undefined-50b4a6330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 27,
    name: 'Tanu Singh Attri',
    role: 'Creative team lead',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 23.16.34_b194b8e7.jpg',
    bio: getRoleBio('Creative team lead'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/tanu-singh-attri-aa22b7339/'
    }
  },
  {
    id: 28,
    name: 'Shailendra',
    role: 'Creative team',
    image: '/image/team numbers photos/WhatsApp Image 2025-11-01 at 12.43.50_9cce1742.jpg',
    bio: getRoleBio('Creative team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/shailendra-rai-28a62833a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 29,
    name: 'Saanvi',
    role: 'Product development and Creative team',
    image: '/image/team numbers photos/WhatsApp Image 2025-11-01 at 12.39.06_a6c30908.jpg',
    bio: getRoleBio('Product development and Creative team'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/saanvi-soni-3308a8251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    }
  },
  {
    id: 30,
    name: 'Nakshita',
    role: 'Creator and brand relations manager',
    image: '/image/team numbers photos/IMG_5152 - nakshita.jpeg',
    bio: getRoleBio('Creator and brand relations manager'),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/nakshita-b5011b280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
    }
  }
];
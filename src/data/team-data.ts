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
    'Content team lead': 'Content strategy leader overseeing editorial direction and team coordination.'
  };
  
  return roleBios[role] || 'Dedicated team member contributing to innovative solutions and company success.';
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Ankit Bhati',
    role: 'Co-Founder Aurameter',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 22.26.51_9d549317.jpg',
    bio: getRoleBio('Co-Founder Aurameter'),
    socialMedia: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    id: 2,
    name: 'Nikhil Jha',
    role: 'Co-Founder Aurameter',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 22.26.51_a8a2f650.jpg',
    bio: getRoleBio('Co-Founder Aurameter'),
    socialMedia: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    }
  },
  {
    id: 3,
    name: 'Niraj Mandal',
    role: 'Creative team lead and Editor',
    image: '/image/team numbers photos/pfp nirajjjjj - Niraj Mandal.jpg',
    bio: getRoleBio('Creative team lead and Editor'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 4,
    name: 'Aman Singh',
    role: 'Developer',
    image: '/image/team numbers photos/Snapchat-649764532~2 - AMAN SINGH.jpg',
    bio: getRoleBio('Developer'),
    socialMedia: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 5,
    name: 'Shantanu Panchal',
    role: 'ML Engineer',
    image: '/image/team numbers photos/ShantanuPanchal_ - Shantanu Panchal.jpg',
    bio: getRoleBio('ML Engineer'),
    socialMedia: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 6,
    name: 'Govind Bhatter',
    role: 'Website lead Developer',
    image: '/image/team numbers photos/IMG_20251023_153644_915 - Govind Bhatter.webp',
    bio: getRoleBio('Website lead Developer'),
    socialMedia: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 7,
    name: 'Vaibhav Agarwal',
    role: 'Developer',
    image: '/image/team numbers photos/IMG-20251002-WA0212 - Vaibhav Agarwal.jpg',
    bio: getRoleBio('Developer'),
    socialMedia: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 8,
    name: 'Tanmay',
    role: 'Backend developer',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-21 at 19.43.37_988e449b - TANMAY.jpg',
    bio: getRoleBio('Backend developer'),
    socialMedia: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 9,
    name: 'Piyush',
    role: 'Developer and Designer',
    image: '/image/team numbers photos/12782_11zon - Piyush.jpg',
    bio: getRoleBio('Developer and Designer'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 10,
    name: 'M.Charan Reddy',
    role: 'Developer and creative team',
    image: '/image/team numbers photos/IMG_20251026_005555 - M.Charan Reddy.jpg',
    bio: getRoleBio('Developer and creative team'),
    socialMedia: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 11,
    name: 'Ishita Kasrija',
    role: 'Developer and creative team',
    image: '/image/team numbers photos/IMG-20250417-WA0046 - Ishita Kasrija.jpg',
    bio: getRoleBio('Developer and creative team'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 12,
    name: 'Diya',
    role: 'Creative Team',
    image: '/image/team numbers photos/2025-10-25 23-34-53 - Diya.jpeg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      instagram: '#',
      twitter: '#'
    }
  },
  {
    id: 13,
    name: 'Devyani Mishra',
    role: 'Creative Team',
    image: '/image/team numbers photos/Snapchat-1832617595~3 - Devyani Mishra.jpg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 14,
    name: 'Jimil Panchal',
    role: 'Creative Team',
    image: '/image/team numbers photos/IMG_20250504_181708 - Jimil Panchal.jpg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 15,
    name: 'Vania Mangla',
    role: 'Creative Team',
    image: '/image/team numbers photos/8949FC17-9B2C-40C6-A20B-99E8BEFA2557 - vania mangla.jpeg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 16,
    name: 'Dhawal Mehrotra',
    role: 'Creative Writer',
    image: '/image/team numbers photos/IMG-20230125-WA0052 - Mystical Poet.jpg',
    bio: getRoleBio('Creative Writer'),
    socialMedia: {
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: 17,
    name: 'Twinkle',
    role: 'Product Manager',
    image: '/image/team numbers photos/52641 - Twinkle.jpg',
    bio: getRoleBio('Product Manager'),
    socialMedia: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 18,
    name: 'Shreya Patel',
    role: 'Product & Marketing Manager',
    image: '/image/team numbers photos/IMG_20251031_210700 - Shreya Patel.jpg',
    bio: getRoleBio('Product & Marketing Manager'),
    socialMedia: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 19,
    name: 'Harshit Arora',
    role: 'Creative Team',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-26 at 13.30.19_1a6c5b97 - honey.jpg',
    bio: getRoleBio('Creative Team'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 20,
    name: 'Dhyani Panchal',
    role: 'Product Manager',
    image: '/image/team numbers photos/IMG-20250926-WA0005 - Dhyani Panchal(1).jpg',
    bio: getRoleBio('Product Manager'),
    socialMedia: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 21,
    name: 'Pranay Bijutkar',
    role: 'Video editing',
    image: '/image/team numbers photos/IMG-20250208-WA0011 - Pranay Bijutkar.jpg',
    bio: getRoleBio('Video editing'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 22,
    name: 'Aastha Yadav',
    role: 'Design and social media',
    image: '/image/team numbers photos/IMG-20250418-WA0017 - Aastha Yadav.jpg',
    bio: getRoleBio('Design and social media'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 23,
    name: 'Hari lakshminaryana R',
    role: 'UI/UX DESIGNER',
    image: '/image/team numbers photos/IMG-20250922-WA0034 - Harilakshminaryana R.jpg',
    bio: getRoleBio('UI/UX DESIGNER'),
    socialMedia: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 24,
    name: 'Rachita Tripathy',
    role: 'Brand Relation Manager',
    image: '/image/team numbers photos/IMG-20251010-WA0073 - Rachita Tripathy.jpg',
    bio: getRoleBio('Brand Relation Manager'),
    socialMedia: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 25,
    name: 'Shashwat Singh',
    role: 'Creative team and Social media',
    image: '/image/team numbers photos/IMG-20251029-WA0028(1) - Shashwat Singh.jpg',
    bio: getRoleBio('Creative team and Social media'),
    socialMedia: {
      instagram: '#',
      linkedin: '#'
    }
  },
  {
    id: 26,
    name: 'Priyanshu',
    role: 'Marketing',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 21.52.35_c2516fd8.jpg',
    bio: getRoleBio('Marketing'),
    socialMedia: {
      linkedin: '#',
      instagram: '#'
    }
  },
  {
    id: 27,
    name: 'Tanu Singh Attri',
    role: 'Content team lead',
    image: '/image/team numbers photos/WhatsApp Image 2025-10-31 at 23.16.34_b194b8e7.jpg',
    bio: getRoleBio('Content team lead'),
    socialMedia: {
      linkedin: '#',
      twitter: '#'
    }
  }
];
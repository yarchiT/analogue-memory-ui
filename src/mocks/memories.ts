export interface Memory {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  year: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export const categories: Category[] = [
  {
    id: 'movies',
    name: 'Movies',
    description: 'Classic films from your childhood and beyond'
  },
  {
    id: 'tv-shows',
    name: 'TV Shows',
    description: 'Television series that defined generations'
  },
  {
    id: 'video-games',
    name: 'Video Games',
    description: 'From arcade classics to console favorites'
  },
  {
    id: 'toys',
    name: 'Toys',
    description: 'Iconic toys and games from different eras'
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Hits and albums that were the soundtrack to your life'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Styles and trends that marked the decades'
  }
];

export const memories: Memory[] = [
  {
    id: '1',
    title: 'The Lion King',
    imageUrl: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Movies',
    year: 1994,
    description: 'A Disney animated classic about a young lion prince who flees his kingdom after the murder of his father.'
  },
  {
    id: '2',
    title: 'Super Nintendo Entertainment System',
    imageUrl: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Video Games',
    year: 1990,
    description: 'The 16-bit home video game console that defined a generation of gaming.'
  },
  {
    id: '3',
    title: 'Friends',
    imageUrl: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'TV Shows',
    year: 1994,
    description: 'A sitcom about six friends living in Manhattan, navigating through life, love, and careers.'
  },
  {
    id: '4',
    title: 'Tamagotchi',
    imageUrl: 'https://images.unsplash.com/photo-1531908012224-8f8865e79a96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Toys',
    year: 1996,
    description: 'A handheld digital pet that you had to feed, clean, and care for.'
  },
  {
    id: '5',
    title: 'Nirvana - Nevermind',
    imageUrl: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Music',
    year: 1991,
    description: 'The second studio album by American rock band Nirvana, featuring the hit "Smells Like Teen Spirit".'
  },
  {
    id: '6',
    title: 'Jurassic Park',
    imageUrl: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Movies',
    year: 1993,
    description: 'A science fiction adventure film about a theme park with cloned dinosaurs.'
  },
  {
    id: '7',
    title: 'The Fresh Prince of Bel-Air',
    imageUrl: 'https://images.unsplash.com/photo-1611215681505-2c01a8be3f9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'TV Shows',
    year: 1990,
    description: 'A sitcom starring Will Smith as a teenager from Philadelphia who is sent to live with his wealthy relatives in Bel-Air.'
  },
  {
    id: '8',
    title: 'Pokémon Red and Blue',
    imageUrl: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Video Games',
    year: 1996,
    description: 'The first Pokémon games released for the Game Boy, starting a global phenomenon.'
  },
  {
    id: '9',
    title: 'Beanie Babies',
    imageUrl: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Toys',
    year: 1993,
    description: 'Collectible plush toys filled with plastic pellets, known for their rarity and collectibility.'
  },
  {
    id: '10',
    title: 'Michael Jackson - Thriller',
    imageUrl: 'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Music',
    year: 1982,
    description: 'The best-selling album of all time, featuring hits like "Billie Jean" and "Beat It".'
  },
  {
    id: '11',
    title: 'Walkman',
    imageUrl: 'https://images.unsplash.com/photo-1626143508000-4b5904e3e9e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Toys',
    year: 1979,
    description: 'Sony\'s portable cassette player that revolutionized how people listened to music.'
  },
  {
    id: '12',
    title: 'Grunge Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion',
    year: 1991,
    description: 'A style inspired by grunge musicians, featuring flannel shirts, ripped jeans, and combat boots.'
  }
];

export const popularSearches = [
  'Star Wars',
  '90s Cartoons',
  'Nintendo 64',
  'Vinyl Records',
  'Retro Fashion',
  'Classic Board Games',
  'Vintage Toys',
  'Arcade Games'
]; 
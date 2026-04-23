const allPhotoModules = import.meta.glob(
  '../assets/photos/**/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}',
  {
    eager: true,
    import: 'default',
  },
);
const highlightVideoModules = import.meta.glob('../assets/photos/**/Highlights/*.{mp4,MP4,mov,MOV,webm,WEBM}', {
  eager: true,
  import: 'default',
});

const categoryFolderMap = {
  Favorites: 'favorites',
  Trips: 'trips',
  Wedding: 'wedding',
  'Fun Moments': 'fun-moments',
  Memories: 'memories',
};

const chapterMeta = {
  Favorites: {
    title: 'Favorites',
    chapterTitle: 'Favorites, Always',
    subtitle:
      'The moments I return to most often, because some memories never fade no matter how many times the heart revisits them.',
  },
  Trips: {
    title: 'Trips Together',
    chapterTitle: 'Trips Together',
    subtitle:
      'The roads we took, the places we wandered, and the quiet happiness of seeing new worlds with you beside me.',
  },
  Wedding: {
    title: 'Our Wedding',
    chapterTitle: 'Our Wedding',
    subtitle:
      'Not just a celebration, but the beginning of a promise that still feels sacred every time I look back at it.',
  },
  'Fun Moments': {
    title: 'Fun Moments',
    chapterTitle: 'Fun Moments',
    subtitle:
      'The laughter, the teasing, the candid joy. The little scenes that made our love feel light, playful, and alive.',
  },
  Memories: {
    title: 'Little Memories',
    chapterTitle: 'Little Memories',
    subtitle:
      'The in-between moments that may have looked ordinary to everyone else, but quietly became precious to me.',
  },
};

const categoryCycle = ['Favorites', 'Trips', 'Wedding', 'Fun Moments', 'Memories'];
const captionCycle = [
  'Beautiful Memory',
  'A Special Day',
  'A Moment to Remember',
  'Us',
  'Forever In A Frame',
];
const descriptionCycle = [
  'A little chapter of us that still feels warm every time I look back at it.',
  'One of those memories that quietly reminds me how lucky I am to have you.',
  'A snapshot of joy, comfort, and the kind of togetherness that feels like home.',
  'A frame filled with the kind of happiness I want to keep forever.',
  'One more reminder that even ordinary moments become beautiful with you in them.',
];
const highlightSubtitleCycle = [
  'A chapter of our celebration I could watch over and over.',
  'The kind of moment that deserves music, motion, and a thousand replays.',
  'A beautiful piece of our story, still glowing every time it begins.',
  'One of those highlights that instantly brings every feeling back.',
];

function makeReadableTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function createPhotoRecord(path, image) {
  return {
    path,
    image,
    filename: path.split('/').pop() ?? path,
  };
}

function sortPhotos(photos) {
  return photos.sort((first, second) =>
    first.filename.localeCompare(second.filename, undefined, { numeric: true }),
  );
}

function getAllPhotos() {
  return sortPhotos(Object.entries(allPhotoModules).map(([path, image]) => createPhotoRecord(path, image)));
}

function getHighlightVideos() {
  return Object.entries(highlightVideoModules)
    .map(([path, src], index) => {
      const filename = path.split('/').pop() ?? path;
      const title = makeReadableTitle(filename);

      return {
        id: `highlight-${index + 1}`,
        src,
        filename,
        title,
        subtitle: highlightSubtitleCycle[index % highlightSubtitleCycle.length],
        category: 'Highlights',
      };
    })
    .sort((first, second) =>
      first.filename.localeCompare(second.filename, undefined, { numeric: true }),
    );
}

function getPhotosFromFolder(folderName) {
  const folderPath = `/photos/${folderName}/`;

  return sortPhotos(
    Object.entries(allPhotoModules)
      .filter(([path]) => path.includes(folderPath))
      .map(([path, image]) => createPhotoRecord(path, image)),
  );
}

function createGalleryItems(photos, forcedCategory) {
  return photos.map((photo, index) => {
    const category = forcedCategory ?? categoryCycle[index % categoryCycle.length];
    const caption = captionCycle[index % captionCycle.length];
    const description = descriptionCycle[index % descriptionCycle.length];

    return {
      id: `${category.toLowerCase().replace(/\s+/g, '-')}-${index + 1}-${photo.filename}`,
      image: photo.image,
      filename: photo.filename,
      alt: `${caption} - photo ${index + 1}`,
      caption,
      category,
      description,
    };
  });
}

function pickItem(items, preferredIndex) {
  return items[preferredIndex] ?? items[0] ?? null;
}

function buildCategorizedGalleryItems(allPhotos) {
  const categorizedItems = categoryCycle.flatMap((category) => {
    const folderName = categoryFolderMap[category];
    const categoryPhotos = getPhotosFromFolder(folderName);

    return createGalleryItems(categoryPhotos, category);
  });

  if (categorizedItems.length > 0) {
    return categorizedItems;
  }

  return createGalleryItems(allPhotos);
}

export function buildLoveStoryData() {
  const allPhotos = getAllPhotos();
  const highlightVideos = getHighlightVideos();
  const galleryItems = buildCategorizedGalleryItems(allPhotos);
  const heroItem = pickItem(galleryItems, 18) ?? pickItem(createGalleryItems(allPhotos), 18);
  const favoritesItems = galleryItems.filter((item) => item.category === 'Favorites');

  const timelineEvents = [
    {
      id: 'first-smile',
      title: 'When Everything Started To Feel Different',
      date: 'Replace with your real date',
      description:
        'It was the kind of moment that looked simple from the outside, but somewhere in my heart I knew you were becoming someone I would never stop choosing.',
      image: pickItem(galleryItems, 4)?.image ?? '',
      alt: 'A moment from the beginning of your story',
    },
    {
      id: 'deepening-bond',
      title: 'The Days We Became Each Other’s Safe Place',
      date: 'Replace with your real date',
      description:
        'Use this milestone for the phase where conversations became deeper, laughter became easier, and home started to feel like a person.',
      image: pickItem(galleryItems, 15)?.image ?? '',
      alt: 'A meaningful chapter in your relationship',
    },
    {
      id: 'promise',
      title: 'A Promise Wrapped In Love',
      date: 'Replace with your real date',
      description:
        'This is a beautiful spot for a memory tied to commitment, a celebration, or the day everything felt wonderfully certain.',
      image: pickItem(galleryItems, 31)?.image ?? '',
      alt: 'A promise-filled memory together',
    },
    {
      id: 'today',
      title: 'Still My Favorite Place In The World',
      date: 'Today and always',
      description:
        'End the timeline with the present: a reminder that your best chapter is not behind you, it is the life you are still building together.',
      image: pickItem(galleryItems, 46)?.image ?? '',
      alt: 'A present-day memory of the two of you',
    },
  ];

  const featuredIndices = [2, 12, 22, 34, 48].filter((index) => galleryItems[index]);
  const featuredMemories = featuredIndices.map((index, order) => ({
    ...galleryItems[index],
    id: `featured-${order + 1}`,
    caption: [
      'The Look That Still Melts Me',
      'One Of My Forever Favorites',
      'A Day I Would Relive Instantly',
      'The Kind Of Happiness That Stays',
      'Still Feels Like Magic',
    ][order] ?? galleryItems[index].caption,
    description: [
      'A featured moment for the kind of memory that still feels new, no matter how many times you revisit it.',
      'Use this card for a moment that deserves a little more room, a little more light, and a lot more love.',
      'A soft spotlight for one of the days that became part of your heart for good.',
      'Perfect for a memory that captures your chemistry, your warmth, and your joy together.',
      'The final featured slot is a lovely place for a memory that feels timeless.',
    ][order] ?? galleryItems[index].description,
  }));

  const memoryChapters = categoryCycle.map((category) => ({
    key: category,
    title: chapterMeta[category].chapterTitle,
    subtitle: chapterMeta[category].subtitle,
    items: galleryItems.filter((item) => item.category === category),
  })).filter((chapter) => chapter.items.length > 0);

  const featuredMemory =
    pickItem(favoritesItems, 0) ??
    pickItem(galleryItems, 0);

  return {
    categories: ['All', ...categoryCycle],
    hero: {
      image: heroItem?.image ?? '',
      title: 'The Journey of Us',
      subtitle:
        'A small digital keepsake built from our memories, our laughter, and all the quiet little moments that turned into a beautiful life together.',
      ctaLabel: 'Begin Our Story',
      featuredImage: pickItem(galleryItems, 25)?.image ?? heroItem?.image ?? '',
      featuredAlt: 'A featured portrait from your collection',
      details: [
        { label: 'Memories', value: `${galleryItems.length}+` },
        { label: 'Favorite Word', value: 'Us' },
        { label: 'Promise', value: 'Always' },
        { label: 'Destination', value: 'Together' },
      ],
    },
    highlights: {
      eyebrow: 'Wedding Highlights',
      title: 'Moments We Can Rewatch Forever',
      subtitle:
        'A cinematic reel of the big moments, the music, and the emotions that still make the heart pause for a second.',
      videos: highlightVideos,
    },
    loveNote: {
      title: 'A Note From My Heart',
      intro:
        'If this page could speak for me, it would tell you that loving you has been the calmest joy, the brightest blessing, and the most beautiful part of my life.',
      highlight:
        'Every version of life feels softer, brighter, and more meaningful because I get to share it with you.',
      paragraphs: [
        'You have a way of turning ordinary days into memories I never want to lose. Even in the quietest moments, being with you feels like the most beautiful part of my world.',
        'Thank you for your patience, your kindness, your laughter, and the warmth you bring into every space you enter. Loving you has been the easiest truth my heart has ever known.',
        'If I could choose this life over and over again, I would still choose you in every chapter, every season, and every possible version of forever.',
      ],
    },
    timelineEvents,
    galleryItems,
    memoryChapters,
    featuredMemory: featuredMemory
      ? {
          ...featuredMemory,
          featuredTitle: 'A memory I replay often',
          featuredDescription:
            'Some pictures feel less like photographs and more like a doorway back into a feeling. This is one of those moments for me.',
        }
      : null,
    featuredMemories,
    finalMessage: {
      title: 'And There Is Still One More Thing',
      teaser:
        'A final little reveal, saved for the end, because the best feelings deserve a beautiful pause before they arrive.',
      buttonLabel: 'One More Surprise',
      reveal: 'No matter where life takes us, my favorite place will always be right beside you.',
      closing:
        'Thank you for being my partner, my peace, my happiness, and the love story I will always be proud of.',
    },
  };
}

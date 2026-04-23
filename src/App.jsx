import { useEffect, useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import HighlightsSection from './components/HighlightsSection';
import LoveNoteSection from './components/LoveNoteSection';
import TimelineSection from './components/TimelineSection';
import MemoryGallerySection from './components/MemoryGallerySection';
import MemoryRevealSection from './components/MemoryRevealSection';
import FeaturedCarousel from './components/FeaturedCarousel';
import FinalSurpriseSection from './components/FinalSurpriseSection';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import MusicToggle from './components/MusicToggle';
import { buildLoveStoryData } from './data/loveStory';

function App() {
  const storyData = useMemo(() => buildLoveStoryData(), []);
  const [activePhotoId, setActivePhotoId] = useState(null);

  const activePhotoIndex = useMemo(
    () => storyData.galleryItems.findIndex((item) => item.id === activePhotoId),
    [activePhotoId, storyData.galleryItems],
  );

  const activePhoto = activePhotoIndex >= 0 ? storyData.galleryItems[activePhotoIndex] : null;

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const openPhoto = (item) => {
    setActivePhotoId(item.id);
  };

  const showAdjacentPhoto = (direction) => {
    if (activePhotoIndex < 0) {
      return;
    }

    const total = storyData.galleryItems.length;
    const nextIndex =
      direction === 'next'
        ? (activePhotoIndex + 1) % total
        : (activePhotoIndex - 1 + total) % total;

    setActivePhotoId(storyData.galleryItems[nextIndex].id);
  };

  return (
    <div className="relative overflow-hidden bg-rose-50 text-stone-700">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_rgba(255,240,242,0.4),_transparent_74%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-[20rem] -z-10 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-[55rem] -z-10 h-72 w-72 rounded-full bg-amber-100/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-96 -z-10 h-[42rem] bg-[radial-gradient(circle_at_center,_rgba(190,24,93,0.09),_transparent_64%)]" />

      <HeroSection hero={storyData.hero} />

      <main className="relative z-10">
        <HighlightsSection highlights={storyData.highlights} />
        <LoveNoteSection note={storyData.loveNote} />
        <TimelineSection events={storyData.timelineEvents} />
        <MemoryGallerySection
          chapters={storyData.memoryChapters}
          featuredMemory={storyData.featuredMemory}
          onOpen={openPhoto}
        />
        <MemoryRevealSection items={storyData.revealMemories} onOpen={openPhoto} />
        <FeaturedCarousel items={storyData.featuredMemories} onOpen={openPhoto} />
        <FinalSurpriseSection message={storyData.finalMessage} />
      </main>

      <Footer />
      <MusicToggle />

      <Lightbox
        item={activePhoto}
        onClose={() => setActivePhotoId(null)}
        onPrevious={() => showAdjacentPhoto('prev')}
        onNext={() => showAdjacentPhoto('next')}
      />
    </div>
  );
}

export default App;

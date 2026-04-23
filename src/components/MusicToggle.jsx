import { useEffect, useRef, useState } from 'react';

function MusicToggle() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
      setHasError(false);
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/song.mp3" preload="none" loop />

      <div className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
        <div className="rounded-full border border-white/55 bg-white/75 p-2 shadow-[0_18px_55px_rgba(120,53,15,0.14)] backdrop-blur-xl">
          <button
            type="button"
            onClick={toggleMusic}
            className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-100 to-white px-4 py-3 text-left text-stone-700 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rose-300"
            aria-pressed={isPlaying}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm text-white shadow-lg">
              {isPlaying ? 'II' : '♪'}
            </span>
            <span className="hidden pr-1 sm:block">
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-rose-500">
                Soundtrack
              </span>
              <span className="mt-1 block text-sm font-medium">
                {isPlaying ? 'Pause Music' : 'Play Music'}
              </span>
            </span>
          </button>
        </div>

        {hasError ? (
          <p className="mt-2 max-w-[14rem] rounded-2xl border border-rose-100 bg-white/90 px-3 py-2 text-xs leading-5 text-stone-500 shadow-[0_10px_30px_rgba(120,53,15,0.1)]">
            Add your song at `public/music/song.mp3` to enable the background music button.
          </p>
        ) : null}
      </div>
    </>
  );
}

export default MusicToggle;

import {useEffect, useRef} from 'react';

export type VideoModalVideo = {
  src: string;
  /** Accessible name for the dialog and the video. */
  title: string;
  /**
   * WebVTT captions, shown by default and toggled from the player's menu.
   * Omit only when captions are burnt into the picture.
   */
  captions?: {src: string; label: string; srcLang: string};
  /** `portrait` for 9:16 films; defaults to 16:9. */
  orientation?: 'landscape' | 'portrait';
};

type VideoModalProps = VideoModalVideo & {
  open: boolean;
  onClose: () => void;
  closeLabel?: string;
};

const frameClasses = {
  landscape: 'aspect-video w-full max-w-[calc((100dvh-7rem)*16/9)]',
  portrait:
    'aspect-[9/16] w-[min(100%,calc((100dvh-2rem)*9/16))] md:w-[min(100%,calc((100dvh-7rem)*9/16))]',
};

/**
 * Automatic cues sit on the bottom edge once the controls fade. Placing the
 * last line one row up leaves a margin, and the browser still lifts them
 * clear of the control bar while it is on screen.
 */
const captionLine = -2;

function raiseCaptions(track: TextTrack) {
  if (!track.cues) return;
  for (const cue of track.cues) {
    if (!(cue instanceof VTTCue) || cue.line !== 'auto') continue;
    cue.snapToLines = true;
    cue.lineAlign = 'end';
    cue.line = captionLine;
  }
}

/**
 * Full-screen video player built on the native `<dialog>`, which provides
 * Escape-to-close, focus trapping and top-layer stacking. Opening always
 * restarts the film with sound; closing pauses it.
 */
export function VideoModal({
  open,
  onClose,
  src,
  title,
  captions,
  orientation = 'landscape',
  closeLabel = 'Close video',
}: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const element = video?.querySelector('track');
    if (!element) return;

    // `load` on <track> does not bubble, so the listener has to sit on the
    // element. Cues for a newly chosen film often arrive after open.
    const apply = () => raiseCaptions(element.track);
    apply();
    element.addEventListener('load', apply);
    return () => element.removeEventListener('load', apply);
  }, [open, src]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const video = videoRef.current;
    if (!dialog || !video) return;

    if (open && !dialog.open) {
      dialog.showModal();
      video.currentTime = 0;
      video.play().catch(() => {});
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, src]);

  return (
    // The backdrop is part of the dialog box, so a click that lands on the
    // dialog itself (not the player) is a click outside the video.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={() => {
        videoRef.current?.pause();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-abyss/43 p-4 opacity-0 backdrop-blur-sm transition-[opacity,display,overlay] transition-discrete duration-base ease-out-soft open:flex open:opacity-100 starting:open:opacity-0 motion-reduce:transition-none md:px-16 md:py-14 backdrop:bg-transparent"
    >
      <div
        className={`relative overflow-hidden rounded-media bg-black ${frameClasses[orientation]}`}
      >
        {/* Captions are optional only for films with burnt-in subtitles. */}
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          src={src}
          title={title}
          controls
          controlsList="nodownload"
          playsInline
          preload="none"
          className="size-full"
        >
          {captions ? (
            <track
              kind="captions"
              src={captions.src}
              srcLang={captions.srcLang}
              label={captions.label}
              default
            />
          ) : null}
        </video>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          title={closeLabel}
          className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-white text-ink transition-colors duration-fast hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:top-4 md:right-4"
        >
          ✕
        </button>
      </div>
    </dialog>
  );
}

import { useEffect, useMemo, useState } from 'react';

import { audioService, VFAudio } from '@/services';

import { useCreateConst } from './cache.hook';
import { usePersistFunction } from './usePersistFunction';

const AUDIO_DURATION_CACHE = new Map<string, number>();

export const useAudioFormattedDuration = (duration: number) =>
  useMemo(() => {
    const minutes = Math.floor(duration / 60);
    const s = duration - minutes * 60;
    const seconds = s < 10 ? `0${s}` : s;

    return `${minutes}:${seconds}`;
  }, [duration]);

interface IAudioManager {
  src?: string;
  onEnded?: VoidFunction;
  onPaused?: VoidFunction;
  onPlaying?: VoidFunction;
  onStopped?: VoidFunction;
  onProgress?: (progress: number) => void;
}

export const useAudioManager = ({
  src = '',
  onEnded: onEndedProp,
  onPaused: onPausedProp,
  onPlaying: onPlayingProp,
  onStopped: onStoppedProp,
  onProgress: onProgressProp,
}: IAudioManager) => {
  const audio = useCreateConst(() => new VFAudio());

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(() => AUDIO_DURATION_CACHE.get(src) ?? 0);

  const play = usePersistFunction(() => {
    audioService.play(audio);
    setPlaying(true);
  });

  const pause = usePersistFunction(() => {
    audioService.pause();
    setPlaying(false);
  });

  const stop = usePersistFunction(() => {
    audioService.stop();
    setPlaying(false);
  });

  const onEnded = usePersistFunction(() => {
    setPlaying(false);
    onEndedProp?.();
  });

  const onPaused = usePersistFunction(() => {
    setPlaying(false);
    onPausedProp?.();
  });

  const onPlaying = usePersistFunction(() => {
    setPlaying(true);
    onPlayingProp?.();
  });

  const onStopped = usePersistFunction(() => {
    setPlaying(false);
    onStoppedProp?.();
  });

  const onTimeUpdated = usePersistFunction(() => {
    const progress = (audio.currentTime / audio.duration) * 100;

    setProgress(progress);
    onProgressProp?.(progress);
  });

  const onMetadataLoaded = usePersistFunction(() => {
    if (!Number.isFinite(audio.duration)) return;

    const duration = Math.ceil(audio.duration);

    AUDIO_DURATION_CACHE.set(src, duration);
    setDuration(duration);
  });

  useEffect(() => {
    if (!src) return undefined;

    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPaused);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('stopped', onStopped);
    audio.addEventListener('timeupdate', onTimeUpdated);
    audio.addEventListener('loadedmetadata', onMetadataLoaded);

    audio.src = src;

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPaused);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('stopped', onStopped);
      audio.removeEventListener('timeupdate', onTimeUpdated);
      audio.removeEventListener('loadedmetadata', onMetadataLoaded);
    };
  }, [src]);

  return {
    play,
    stop,
    pause,
    audio,
    playing,
    progress,
    duration,
  };
};

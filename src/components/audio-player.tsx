
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleAudio = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
    
    const formatTime = (time: number) => {
      if (isNaN(time)) return '00:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
  
    const handleProgressChange = (value: number[]) => {
      if (audioRef.current) {
        const newTime = (value[0] / 100) * duration;
        audioRef.current.currentTime = newTime;
        setProgress(value[0]);
      }
    };
  
    const handlePlaybackRateChange = () => {
      const rates = [1.0, 1.25, 1.5, 2.0, 0.75];
      const currentIndex = rates.indexOf(playbackRate);
      const nextRate = rates[(currentIndex + 1) % rates.length];
      if (audioRef.current) {
        audioRef.current.playbackRate = nextRate;
      }
      setPlaybackRate(nextRate);
    };
  
    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        const updateProgress = () => {
          const currentProgress = (audio.currentTime / audio.duration) * 100;
          setProgress(currentProgress);
          setCurrentTime(audio.currentTime);
        };
        
        const setAudioData = () => {
          setDuration(audio.duration);
        }
  
        const handleEnded = () => {
          setIsPlaying(false);
          setProgress(0);
          audio.currentTime = 0;
        }
  
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('ended', handleEnded);
  
        return () => {
          audio.removeEventListener('timeupdate', updateProgress);
          audio.removeEventListener('loadedmetadata', setAudioData);
          audio.removeEventListener('ended', handleEnded);
        };
      }
    }, []);

    return (
        <div className="rounded-xl bg-card p-6 border border-white/10 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button onClick={toggleAudio} variant="ghost" size="icon" className="h-14 w-14 flex-shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <div className="flex w-full flex-col gap-2">
                    <span className="text-sm font-semibold text-foreground">5 Maneiras de Lidar com a Ansiedade...</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground font-mono tabular-nums">{formatTime(currentTime)}</span>
                      <Slider value={[progress]} onValueChange={handleProgressChange} max={100} step={1} />
                      <span className="text-xs text-muted-foreground font-mono tabular-nums">{formatTime(duration)}</span>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Button onClick={() => audioRef.current && (audioRef.current.currentTime = 0)} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                        <RotateCcw className="h-5 w-5" />
                    </Button>
                    <Button onClick={handlePlaybackRateChange} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                        <span className="text-sm font-bold">{playbackRate.toFixed(1)}x</span>
                    </Button>
                     <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                        <Volume2 className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            <audio ref={audioRef} src="/audio-placeholder.mp3" />
        </div>
    )
}

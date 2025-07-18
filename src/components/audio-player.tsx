
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
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
      if (isNaN(time) || !isFinite(time)) return '0:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };
  
    const handleProgressChange = (value: number[]) => {
      if (audioRef.current) {
        const newTime = (value[0] / 100) * duration;
        audioRef.current.currentTime = newTime;
        setProgress(value[0]);
      }
    };
  
    const handleSkip = (seconds: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime + seconds);
        }
    }

    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        const updateProgress = () => {
          const currentProgress = (audio.duration > 0) ? (audio.currentTime / audio.duration) * 100 : 0;
          setProgress(currentProgress);
          setCurrentTime(audio.currentTime);
        };
        
        const setAudioData = () => {
          setDuration(audio.duration);
        }
  
        const handleEnded = () => {
          setIsPlaying(false);
          setProgress(0);
          if (audio) {
            audio.currentTime = 0;
          }
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
    }, [duration]);

    return (
        <div className="rounded-xl bg-card p-4 border border-border/50 w-full max-w-sm mx-auto shadow-lg text-foreground">
            <div className="relative h-24 w-full mb-4">
                <Image 
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="abstract waves"
                    alt="Capa do áudio"
                    fill
                    className="rounded-md object-cover"
                />
            </div>

            <div className="my-3">
                <Slider 
                    value={[progress]} 
                    onValueChange={handleProgressChange} 
                    max={100} 
                    step={1}
                />
                <div className="flex justify-between items-center mt-1.5">
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">{formatTime(currentTime)}</span>
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                 <Button onClick={() => handleSkip(-10)} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                    <SkipBack className="h-5 w-5" />
                </Button>
                <Button onClick={toggleAudio} variant="default" size="icon" className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>
                 <Button onClick={() => handleSkip(10)} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                    <SkipForward className="h-5 w-5" />
                </Button>
            </div>
             <audio ref={audioRef} src="/audio-placeholder.mp3" preload="metadata" />
        </div>
    )
}


'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Gauge, Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [volume, setVolume] = useState(1);
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

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    }

    const handleSpeedChange = () => {
        const rates = [1, 1.5, 2];
        const currentRateIndex = rates.indexOf(playbackRate);
        const nextRate = rates[(currentRateIndex + 1) % rates.length];
        setPlaybackRate(nextRate);
        if (audioRef.current) {
            audioRef.current.playbackRate = nextRate;
        }
    }
    
    const handleVolumeChange = (value: number[]) => {
      const newVolume = value[0];
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
      }
    };

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
            <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 flex-shrink-0">
                    <Image 
                        src="/pessoas_meditando.png"
                        data-ai-hint="calm serene meditation"
                        alt="Capa do áudio"
                        fill
                        className="rounded-md object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-sm">Leitura do Artigo</h4>
                </div>
            </div>

            <div className="my-3 space-y-1">
                <Slider 
                    value={[progress]} 
                    onValueChange={handleProgressChange} 
                    max={100} 
                    step={1}
                />
                <div className="flex justify-between items-center">
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">{formatTime(currentTime)}</span>
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center justify-between gap-2">
                <Button onClick={handleReset} variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                    <RotateCcw className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 flex justify-center">
                    <Button onClick={toggleAudio} variant="default" size="icon" className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90">
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                    </Button>
                </div>

                <div className="flex items-center gap-1">
                    <Button onClick={handleSpeedChange} variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
                        <Gauge className="h-4 w-4" />
                    </Button>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                                <Volume2 className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-2">
                           <Slider 
                                defaultValue={[1]} 
                                value={[volume]}
                                onValueChange={handleVolumeChange} 
                                max={1} 
                                step={0.1}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
             <audio ref={audioRef} src="/audio-placeholder.mp3" preload="metadata" />
        </div>
    )
}


'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, X, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
    isMobile?: boolean;
}

export default function AudioPlayer({ isMobile = false }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlayerVisible, setIsPlayerVisible] = useState(true);
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
    
    const handleVolumeChange = (value: number[]) => {
      const newVolume = value[0];
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume;
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

    if (isMobile) {
        if (!isPlayerVisible) return null;

        return (
            <AnimatePresence>
                <motion.div 
                    className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 shadow-[0_-4px_15px_rgba(0,0,0,0.1)] p-2"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ type: "tween", ease: "circOut", duration: 0.5 }}
                >
                    <div className="container mx-auto px-2 py-1">
                         <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground w-10 text-center">{formatTime(currentTime)}</span>
                            <Slider 
                                value={[progress]} 
                                onValueChange={handleProgressChange} 
                                max={100} 
                                step={1} 
                                className="w-full"
                            />
                            <span className="text-xs font-mono text-muted-foreground w-10 text-center">{formatTime(duration)}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <div className="w-10">
                               <Button onClick={() => setIsPlayerVisible(false)} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                 <Button onClick={() => handleSkip(-10)} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                                    <SkipBack className="h-5 w-5" />
                                </Button>
                                <Button onClick={toggleAudio} variant="default" size="icon" className="h-12 w-12 rounded-full">
                                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                                </Button>
                                 <Button onClick={() => handleSkip(10)} variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground">
                                    <SkipForward className="h-5 w-5" />
                                </Button>
                            </div>
                            
                            <div className="w-10" />
                        </div>
                    </div>
                    <audio ref={audioRef} src="/audio-placeholder.mp3" preload="metadata" />
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <div className="rounded-xl bg-card p-3 border border-border/50 w-full max-w-sm mx-auto shadow-lg text-foreground">
            <div className="relative w-full h-32 mb-3">
                <Image 
                    src="/pessoas_meditando.png"
                    data-ai-hint="calm serene meditation"
                    alt="Capa do áudio"
                    fill
                    className="rounded-md object-cover"
                />
            </div>

            <div className="my-2 space-y-1">
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
                <Button onClick={handleReset} variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <RotateCcw className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 flex justify-center">
                    <Button onClick={toggleAudio} variant="default" size="icon" className="h-10 w-10 rounded-full shadow-lg bg-primary hover:bg-primary/90">
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                    </Button>
                </div>

                <div className="flex items-center gap-1">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
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

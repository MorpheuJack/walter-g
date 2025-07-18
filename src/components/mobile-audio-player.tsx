
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, X, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function MobileAudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
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
      if (isNaN(time) || time === 0) return '0:00';
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
            audioRef.current.currentTime += seconds;
        }
    }

     const handleRestart = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        setProgress(0);
        if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        }
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

    if (!isVisible) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div 
                className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/50 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", ease: "circOut", duration: 0.5 }}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 mb-2">
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

                    <div className="flex items-center justify-between">
                         <Button onClick={handleRestart} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <RotateCcw className="h-5 w-5" />
                        </Button>
                        <Button onClick={() => handleSkip(-10)} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <SkipBack className="h-6 w-6" />
                        </Button>

                        <Button onClick={toggleAudio} variant="outline" size="icon" className="h-14 w-14 rounded-full border-primary/50 text-foreground hover:bg-primary/10">
                            {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                        </Button>

                        <Button onClick={() => handleSkip(10)} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <SkipForward className="h-6 w-6" />
                        </Button>
                        <Button onClick={() => setIsVisible(false)} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <audio ref={audioRef} src="/audio-placeholder.mp3" preload="metadata" />
            </motion.div>
        </AnimatePresence>
    )
}

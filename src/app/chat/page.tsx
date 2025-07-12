'use client';

import {useState, useRef, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {motion, AnimatePresence} from 'framer-motion';
import {Send, Compass, User} from 'lucide-react';
import type {ChatMessage} from '@/ai/flows/bussola-flow';
import {chatWithBussola} from '@/ai/flows/bussola-flow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {role: 'user', content: input};
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const result = await chatWithBussola({history: chatHistory});
      const modelMessage: ChatMessage = {
        role: 'model',
        content: result.response,
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        content:
          'Desculpe, não consegui processar sua mensagem. Tente novamente.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const Message = ({message}: {message: ChatMessage}) => {
    const isModel = message.role === 'model';
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-start gap-4 ${isModel ? 'justify-start' : 'justify-end'}`}
      >
        {isModel && (
          <Avatar className="h-9 w-9 border border-primary/50">
             <AvatarFallback className="bg-primary/20 text-primary">
                <Compass className="h-5 w-5"/>
             </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`max-w-md rounded-2xl p-4 text-base ${
            isModel
              ? 'bg-card text-card-foreground rounded-tl-none'
              : 'bg-primary text-primary-foreground rounded-br-none'
          }`}
        >
          <p>{message.content}</p>
        </div>
        {!isModel && (
          <Avatar className="h-9 w-9 border-border">
            <AvatarFallback className="bg-muted">
                <User className="h-5 w-5"/>
             </AvatarFallback>
          </Avatar>
        )}
      </motion.div>
    );
  };


  return (
    <div className="container mx-auto flex h-[calc(100vh-10rem)] max-w-3xl flex-col">
      <div className="flex-1 space-y-8 overflow-y-auto p-4 pr-6">
        <AnimatePresence>
          {messages.length === 0 && (
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
             >
                <div className="flex items-start gap-4 justify-start">
                    <Avatar className="h-9 w-9 border border-primary/50">
                        <AvatarFallback className="bg-primary/20 text-primary">
                            <Compass className="h-5 w-5"/>
                        </AvatarFallback>
                    </Avatar>
                    <div className="max-w-md rounded-2xl p-4 text-base bg-card text-card-foreground rounded-tl-none">
                        <p>Olá. Estou aqui para ajudar você a encontrar clareza. O que está em sua mente?</p>
                    </div>
                </div>
            </motion.div>
          )}
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
          {isLoading && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 justify-start"
            >
                <Avatar className="h-9 w-9 border border-primary/50">
                    <AvatarFallback className="bg-primary/20 text-primary">
                        <Compass className="h-5 w-5"/>
                    </AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-2xl p-4 text-base bg-card text-card-foreground rounded-tl-none">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/80" style={{ animationDelay: '0s' }}></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/80" style={{ animationDelay: '0.2s' }}></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary/80" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-4">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Descreva o que está em sua mente..."
            className="flex-1 rounded-xl border-border/60 bg-input p-4 text-base focus:border-primary focus:ring-primary"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 rounded-full"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

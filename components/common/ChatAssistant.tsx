
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { useAppContext } from '../../hooks/useAppContext';
import { ChatIcon, SendIcon, CloseIcon, SparklesIcon } from './Icons';

const ChatAssistant: React.FC = () => {
  const { state, t } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: 'user' | 'model', text: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        scrollToBottom();
    }
  }, [messages, isOpen]);

  // Initialize chat session with Gemini 3 Pro
  useEffect(() => {
    // Using process.env.API_KEY as required
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    chatRef.current = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are Marhaba AI, an expert virtual guide for the "Marhaba - Desert Tourism" platform in Algeria.
        
        Your role is to:
        1. Enthusiastically assist tourists in planning trips to the Algerian Sahara (Tassili n'Ajjer, Hoggar, Taghit, Ghardaia, etc.).
        2. Provide cultural insights, travel tips (best season, packing, transport), and historical facts.
        3. Help users understand the types of offers available: Tours (expeditions), Hotels, and Guesthouses.
        4. If a user wants to book something, guide them to navigate to the "Offers" page in the app, but do not pretend to process the transaction yourself.
        5. Keep your tone warm, welcoming, and professional.
        6. Current App Language: ${state.language === 'ar' ? 'Arabic' : 'English'}. Adapt your response language to match the user's input or the app context.
        7. Use emojis occasionally to make the conversation engaging 🏜️🐪✨.
        
        Strictly adhere to safety guidelines and avoid sensitive political topics. Focus on tourism and culture.`
      }
    });
    
    // Add initial welcome message if empty
    if (messages.length === 0) {
        setMessages([{ role: 'model', text: t('chatWelcome') }]);
    }
  }, [state.language]); // Re-initialize if language preference changes drastically, though chat history implies continuity.

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRef.current) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const resultStream = await chatRef.current.sendMessageStream({ message: userMsg });
      
      // Add a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let fullResponse = '';
      for await (const chunk of resultStream) {
          const c = chunk as GenerateContentResponse;
          const chunkText = c.text || '';
          fullResponse += chunkText;
          
          setMessages(prev => {
             const newArr = [...prev];
             // Update the last message (model's response)
             newArr[newArr.length - 1] = { role: 'model', text: fullResponse };
             return newArr;
          });
      }
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', text: t('chatError') }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" dir={document.documentElement.dir}>
      {/* Chat Window */}
      <div 
        className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mb-4 w-80 md:w-96 transition-all duration-300 origin-bottom-right overflow-hidden border border-gray-200 dark:border-gray-700 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 h-0'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5" />
            <div>
                <h3 className="font-bold">{t('aiAssistant')}</h3>
                <p className="text-xs opacity-80">{t('poweredBy')}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm rounded-bl-none border border-gray-100 dark:border-gray-600'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('typeMessage')}
            className="flex-grow px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none focus:ring-2 focus:ring-primary outline-none text-sm"
            disabled={isTyping}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-300 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg flex items-center justify-center group`}
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        <ChatIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

export default ChatAssistant;

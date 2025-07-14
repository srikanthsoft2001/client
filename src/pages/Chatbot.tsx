import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Send, Bot, Minimize2, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void; // callback to close the chatbot
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Nice! What is your role at Acme Corp?',
      isBot: true,
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Marketing',
      isBot: false,
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'Our tool is great for sales teams of all sizes! How many people are on yours?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSend = (): void => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your response! We'll get back to you soon.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-16 h-16 bg-white border border-gray-200 hover:bg-gray-50 shadow-lg"
          aria-label="Open chat"
          title="Open chat"
        >
          <Bot className="w-6 h-6 text-gray-700" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Card className="w-96 h-[600px] flex flex-col shadow-2xl border border-gray-200 overflow-hidden bg-white">
          {/* Header */}
          <CardHeader className="bg-red-500 text-white p-4 flex flex-row items-center justify-between space-y-0 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bliveus</h3>
                <p className="text-sm text-white flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  Online Now
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-gray-700 hover:bg-gray-100 p-1 h-8 w-8"
                aria-label="Minimize chat"
                title="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:bg-gray-100 p-1 h-8 w-8"
                onClick={onClose} // <-- call the onClose callback here
                aria-label="Close chat"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                  }`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-200 my-2" />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center space-x-2">
              {/* Minimize button here */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="rounded-full p-2 h-10 w-10 text-gray-700 hover:bg-gray-100"
                aria-label="Minimize chat"
                title="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>

              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Reply to LeadBot..."
                className="flex-1 rounded-full border-gray-300 focus:border-gray-400 focus:ring-gray-300"
              />
              <Button
                onClick={handleSend}
                size="sm"
                className="rounded-full bg-gray-800 hover:bg-gray-700 p-2 h-10 w-10"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
            {/* <div className="text-center mt-2">
              <p className="text-xs text-gray-500">
                We're ♦ by <span className="font-semibold">Drift</span>
              </p>
            </div> */}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Chatbot;

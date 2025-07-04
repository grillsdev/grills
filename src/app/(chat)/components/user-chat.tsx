import { useEffect, useState, useRef, KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { X, Send, ArrowLeftFromLine, Bell, BellOff } from 'lucide-react';


export const UserChatInterface = ({ isOpen, onClose }: {isOpen:boolean, onClose: () => void}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "End of this year chlte h",
      sender: "other",
      time: "now"
    },
    {
      id: 2,
      text: "Okh done",
      sender: "me",
      time: "now"
    },
    {
      id: 3,
      text: "Jagah tu decide kr lio ....baaki kharche ka to dekh hi lenge",
      sender: "other",
      time: "now"
    },
    {
      id: 4,
      text: "Han done dona done select kr bhi lia h",
      sender: "me",
      time: "now"
    },
    {
      id: 5,
      text: "Good boy",
      sender: "other",
      time: "now"
    }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);


  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "me",
        time: "now"
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage();
    }
  };

  return (
    <div
      className={`fixed bottom-2.5 md:right-2.5 mx-2 md:mx-0 md:w-72 h-[30rem] md:h-[27.5rem] bg-base-800 rounded-md md:rounded-md  flex flex-col z-50 transition-transform duration-500 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none opacity-0'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-base-700">
        {/* Left side - Notification Toggle */}
        <div className='block'></div>
        <div>

        {/* Right side - Close Button */}
        <Button
          variant="ghost"
          onClick={onClose}
          className="cursor-pointer rounded-full"
          size={"sm"}
        >
          <X />
        </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div>
              {msg.sender !== "me" && <span className='text-xs italic px-2'>{msg.sender}</span>}
            <div
              className={`max-w-xs px-3 py-2 rounded-[25px] ${
                msg.sender === 'me'
                  ? 'bg-sky-700/90 w-fit'
                  : 'bg-base-700 font-medium'
              }`}
            >
              {msg.text}
            </div>
            </div>
          
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-base-700">
        <div className="flex flex-row gap-2 items-center">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className=""
          />
        <button
            type="submit"
            className="-ml-10 right-3 bottom-3 bg-accent-foreground text-accent p-1.5 rounded-full cursor-pointer"
          >
            <Send width={18.5} height={18.5} />
          </button>
        </div>
      </div>
    </div>
  );
};


export const UserChatBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('notification');
    setNotificationsOn(stored !== 'off');
  }, []);

  const toggleNotification = () => {
    const newState = !notificationsOn;
    setNotificationsOn(newState);
    localStorage.setItem('notification', newState ? 'on' : 'off');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`flex flex-col items-center justify-between py-2 fixed bottom-72 md:bottom-60 right-0 w-7 h-40 bg-base-700 rounded-l-[13px] shadow-lg transition-colors z-50 cursor-pointer ${isOpen && 'hidden'}`}
      >
        <Badge
          className="block h-2.5 w-0.5 rounded-full px-1 font-mono tabular-nums animate-pulse"
          variant="destructive"
        >
        </Badge>

        <div
          onClick={(e) => {
            e.stopPropagation(); // prevent opening chat on toggle
            toggleNotification();
          }}
          className="cursor-pointer"
        >
          {notificationsOn ? <Bell size={18} /> : <BellOff size={18} />}
        </div>

        <ArrowLeftFromLine width="20" />
      </button>

      <UserChatInterface isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};


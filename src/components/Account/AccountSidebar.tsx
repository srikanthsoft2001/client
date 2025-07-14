import React, { useState } from 'react';
import { User, MapPin, CreditCard, RotateCcw, X, Heart, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Chatbot from '@/pages/Chatbot'; // Adjust path as needed

interface Item {
  name: string;
  route?: string;
}

const AccountSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State to control chatbot visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sidebarItems = [
    {
      title: 'Manage My Account',
      items: [
        { name: 'My Profile', icon: User, route: '/profile' },
        { name: 'Address Book', icon: MapPin, route: '/address-book' },
        { name: 'My Payment Options', icon: CreditCard, route: '/payment-options' },
      ],
    },
    {
      title: 'My Orders',
      items: [
        { name: 'My Returns', icon: RotateCcw, route: '/returns' },
        { name: 'My Cancellations', icon: X, route: '/cancellations' },
      ],
    },
    {
      title: 'My Wishlist',
      items: [{ name: 'My Wishlist', icon: Heart, route: '/wishlist' }],
    },
    {
      title: 'Support',
      items: [{ name: 'Chat with Us', icon: MessageCircle, route: '/chat' }],
    },
  ];

  const handleClick = (item: Item) => {
    if (item.name === 'Chat with Us') {
      setIsChatOpen(true); // Open chatbot modal
    } else if (item.route) {
      navigate(item.route);
    }
  };

  // Handler to close chatbot modal
  const handleCloseChatbot = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <aside className="w-64 bg-background border-r border-border p-6">
        <div className="space-y-6">
          {sidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="font-medium text-foreground mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => {
                  const isActive = location.pathname === item.route;

                  return (
                    <li key={itemIndex}>
                      <button
                        onClick={() => handleClick(item)}
                        className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive
                            ? 'bg-red-50 text-red-600 font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Render Chatbot modal when open, passing onClose prop */}
      {isChatOpen && <Chatbot onClose={handleCloseChatbot} />}
    </>
  );
};

export default AccountSidebar;

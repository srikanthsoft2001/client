import React from 'react';
import { User, MapPin, CreditCard, RotateCcw, X, Heart } from 'lucide-react';

const AccountSidebar: React.FC = () => {
  const sidebarItems = [
    {
      title: 'Manage My Account',
      items: [
        { name: 'My Profile', icon: User, active: true },
        { name: 'Address Book', icon: MapPin },
        { name: 'My Payment Options', icon: CreditCard },
      ],
    },
    {
      title: 'My Orders',
      items: [
        { name: 'My Returns', icon: RotateCcw },
        { name: 'My Cancellations', icon: X },
      ],
    },
    {
      title: 'My Wishlist',
      items: [{ name: 'My Wishlist', icon: Heart }],
    },
  ];

  return (
    <aside className="w-64 bg-background border-r border-border p-6">
      <div className="space-y-6">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="font-medium text-foreground mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <button
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                      item.active
                        ? 'bg-red-50 text-red-600 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default AccountSidebar;

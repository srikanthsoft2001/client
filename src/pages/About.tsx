import React from 'react';
import {
  ShoppingBag,
  DollarSign,
  Users,
  Gift,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* About Hero Section */}
        <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Our Story</h2>
            <p className="mb-6">
              Launched in 2015, Exclusive is East Africa's premier online
              shopping marketplace with an active presence in Kenya. Supported
              by wide range of tailored marketing, data and service solutions,
              Exclusive has 10,000 stores and 8 million customers across the
              region.
            </p>
            <p>
              Exclusive has continued to build a vibrant ecosystem that supports
              over a very fast, secure online shopping environment in categories
              ranging from electronics to fashion.
            </p>
          </div>
          <div>
            <img
              src="/lovable-uploads/1119d5f5-02b9-41b0-8608-9aa203a4b120.png"
              alt="Two women shopping"
              className="w-full rounded-xl"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={ShoppingBag}
              value="10.5k"
              description="Sellers active our site"
            />
            <StatsCard
              icon={DollarSign}
              value="33k"
              description="Monthly Products Sale"
              highlight={true}
            />
            <StatsCard
              icon={Users}
              value="45.5k"
              description="Customer active in our site"
            />
            <StatsCard
              icon={Gift}
              value="25k"
              description="Annual gross sale in our site"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Tom Cruise',
                role: 'Founder & Chairman',
                image: '/placeholder.svg',
              },
              {
                name: 'Emma Watson',
                role: 'Managing Director',
                image: '/placeholder.svg',
              },
              {
                name: 'Will Smith',
                role: 'Product Designer',
                image: '/placeholder.svg',
              },
            ].map((member, index) => (
              <div key={index} className="team-card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover mb-4 rounded-md"
                />
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
                <div className="flex justify-center space-x-3 mt-3">
                  <Instagram className="h-5 w-5" />
                  <Facebook className="h-5 w-5" />
                  <Linkedin className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === 0 ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// StatsCard component
const StatsCard = ({
  icon: Icon,
  value,
  description,
  highlight = false,
}: {
  icon: React.ElementType;
  value: string;
  description: string;
  highlight?: boolean;
}) => {
  return (
    <div
      className={`stats-card ${
        highlight ? 'bg-red-500 text-white' : 'bg-white'
      }`}
    >
      <div
        className={`stats-icon ${highlight ? 'bg-white/20' : 'bg-gray-100'}`}
      >
        <Icon
          className={`h-6 w-6 ${highlight ? 'text-white' : 'text-black'}`}
        />
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};

export default About;

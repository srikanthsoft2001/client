import ServiceFeatures from '@/components/home/ServiceFeatures';
import React from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaDribbble,
  FaBehance,
  FaChartLine,
  FaShoppingBag,
  FaUsers,
  FaUserTie,
} from 'react-icons/fa';
// import Breadcrumb from "../components/Breadcrumb";

const About = () => {
  const team = [
    {
      name: 'Tom Cruise',
      role: 'Founder & Chairman',
      image: '/images/founder.jpg',
      social: [
        { platform: 'linkedin', icon: FaLinkedin, url: '#' },
        { platform: 'twitter', icon: FaTwitter, url: '#' },
        { platform: 'facebook', icon: FaFacebook, url: '#' },
      ],
    },
    {
      name: 'Emma Watson',
      role: 'Managing Director',
      image: '/images/md.jpg',
      social: [
        { platform: 'linkedin', icon: FaLinkedin, url: '#' },
        { platform: 'instagram', icon: FaInstagram, url: '#' },
        { platform: 'twitter', icon: FaTwitter, url: '#' },
      ],
    },
    {
      name: 'Will Smith',
      role: 'Product Designer',
      image: '/images/product_designer.webp',
      social: [
        { platform: 'dribbble', icon: FaDribbble, url: '#' },
        { platform: 'behance', icon: FaBehance, url: '#' },
        { platform: 'linkedin', icon: FaLinkedin, url: '#' },
      ],
    },
  ];

  const statsData = [
    {
      value: '10.5k',
      label: 'Sellers active our site',
      icon: (
        <FaUserTie className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-white" />
      ),
    },
    {
      value: '33k',
      label: 'Monthly Product Sale',
      icon: (
        <FaShoppingBag className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-white" />
      ),
    },
    {
      value: '45.5k',
      label: 'Customer active in our site',
      icon: (
        <FaUsers className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-white" />
      ),
    },
    {
      value: '25k',
      label: 'Annual gross sale in our site',
      icon: (
        <FaChartLine className="w-10 h-10 mx-auto mb-4 text-primary group-hover:text-white" />
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl bg-white text-dark">
      {/* About Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h1>
            <p className="text-gray mb-6">
              Bliveus is making remarkable progress as a next-generation
              eCommerce platform, focusing on innovation and intelligent
              experiences. We are actively building solutions powered by GenAI
              and modern AI technologies to enhance user interaction, product
              discovery, and personalization.
            </p>
            <p className="text-gray">
              Bliveus has recently partnered with IoT device-selling companies
              to create a seamless smart shopping ecosystem. From connected home
              devices to wearable tech, our vision is to revolutionize the way
              customers engage with technology through an intelligent, adaptive
              online marketplace.
            </p>
          </div>
          <div>
            <img
              src="/images/11487.jpg"
              alt="About Bliveus"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg transition-all duration-500 ease-out hover:bg-red-500 hover:text-white group"
              >
                {stat.icon}
                <p className="text-3xl font-bold text-primary transition-transform duration-300 group-hover:text-white group-hover:scale-110">
                  {stat.value}
                </p>
                <p className="text-gray-700 font-semibold mt-2 transition-colors duration-300 group-hover:text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray max-w-2xl mx-auto">
            The talented people behind the success of our company
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent 
            opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                >
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary-light">{member.role}</p>
                    <div className="flex mt-3 space-x-3">
                      {member.social.map((social, i) => (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-primary transition-colors"
                          aria-label={`${member.name}'s ${social.platform}`}
                        >
                          {React.createElement(social.icon, {
                            className: 'w-5 h-5',
                            'aria-hidden': 'true',
                          })}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      {/* <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-black text-secondary rounded-lg p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe</h2>
            <p className="mb-6">Get 20% off your first order</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div> */}
      <ServiceFeatures />
    </div>
  );
};

export default About;

import { Card, CardContent } from "@/components/ui/card";

const ServiceFeatures = () => {
  const features = [
    {
      id: 1,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-truck"
        >
          <path d="M10 17h4V5H2v12h3" />
          <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
          <path d="M14 17a2 2 0 1 0 4 0" />
          <path d="M7 17a2 2 0 1 0 4 0" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-headphones"
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shield"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.id} className="border-0 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;

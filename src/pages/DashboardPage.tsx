import React from "react";
import { DataCards } from "@/components/dashboard/DataCards";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesGraph } from "@/components/dashboard/SalesGraph";

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">LOGO</h1>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-muted-foreground">Dashboard</h2>
          <span className="text-muted-foreground"></span>
          <h2 className="text-lg font-semibold">Home</h2>
        </div>
      </div>

      {/* Data Section */}
      <DataCards />

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard 
          title="Total Orders" 
          value="¥126.500" 
          description="Compared to Mention Date" 
        />
        <StatCard 
          title="Active Orders" 
          value="¥126.500" 
          description="Compared to Mention Date" 
        />
        <StatCard 
          title="Completed Orders" 
          value="¥126.500" 
          description="Compared Mention Date" 
        />
        <StatCard 
          title="Return Orders" 
          value="¥126.500" 
          description="Compared Mention Date" 
        />
      </div>

      {/* Sales Graph Section */}
      <SalesGraph />
    </div>
  );
};

export default DashboardPage;

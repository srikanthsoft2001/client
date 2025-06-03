import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function DataCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">ALL PRODUCTS</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">ORDER LIST</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SalesGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 flex-col justify-end">
          <div className="flex h-full items-end gap-2">
            <div 
              className="w-full rounded-t-sm bg-chart-1" 
              style={{ height: "80%" }}
            />
            <div 
              className="w-full rounded-t-sm bg-chart-2" 
              style={{ height: "60%" }}
            />
            <div 
              className="w-full rounded-t-sm bg-chart-3" 
              style={{ height: "40%" }}
            />
            <div 
              className="w-full rounded-t-sm bg-chart-4" 
              style={{ height: "70%" }}
            />
            <div 
              className="w-full rounded-t-sm bg-chart-5" 
              style={{ height: "50%" }}
            />
            <div 
              className="w-full rounded-t-sm bg-primary" 
              style={{ height: "30%" }}
            />
          </div>
          <div className="flex h-8 items-end justify-between border-t">
            <span className="text-xs text-muted-foreground">¥400</span>
            <span className="text-xs text-muted-foreground">¥300</span>
            <span className="text-xs text-muted-foreground">¥200</span>
            <span className="text-xs text-muted-foreground">¥100</span>
            <span className="text-xs text-muted-foreground">0</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <span className="text-sm text-muted-foreground">JUL</span>
          <span className="text-sm text-muted-foreground">AUG</span>
          <span className="text-sm text-muted-foreground">SEP</span>
          <span className="text-sm text-muted-foreground">OCT</span>
          <span className="text-sm text-muted-foreground">NOV</span>
          <span className="text-sm text-muted-foreground">DEC</span>
        </div>
      </CardContent>
    </Card>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { Archive, BarChart2, ChevronUp, FileText, TrendingUp, Users } from "lucide-react";
import { generateMockComplaintStats, ComplaintStats, mockCategories } from "@/types";
import { Progress } from "@/components/ui/progress";

// Generate mock data for the charts
const stats = generateMockComplaintStats();

// Weekly complaints data
const weeklyData = [
  { name: 'Mon', complaints: 12 },
  { name: 'Tue', complaints: 19 },
  { name: 'Wed', complaints: 15 },
  { name: 'Thu', complaints: 27 },
  { name: 'Fri', complaints: 21 },
  { name: 'Sat', complaints: 14 },
  { name: 'Sun', complaints: 9 },
];

// Monthly comparison data
const monthlyData = [
  { name: 'Jan', current: 65, previous: 80 },
  { name: 'Feb', current: 59, previous: 51 },
  { name: 'Mar', current: 80, previous: 75 },
  { name: 'Apr', current: 81, previous: 60 },
  { name: 'May', current: 56, previous: 65 },
  { name: 'Jun', current: 55, previous: 59 },
];

// Resolution time by category
const resolutionData = [
  { name: 'Infrastructure', time: 6.2 },
  { name: 'Public Services', time: 3.5 },
  { name: 'Safety', time: 2.1 },
  { name: 'Environment', time: 4.8 },
  { name: 'Others', time: 3.0 },
];

// Category distribution data
const categoryData = stats.complaintsByCategory.map(item => ({
  name: item.category,
  value: item.count,
}));

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

export function VillageHeadDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <section>
        <h2 className="text-2xl font-semibold mb-6">Executive Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <h3 className="text-3xl font-bold mt-2">{stats.totalComplaints}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground flex items-center">
                <ChevronUp className="h-3 w-3 text-status-completed mr-1" />
                <span className="text-status-completed mr-1">12%</span> 
                from previous month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                  <h3 className="text-3xl font-bold mt-2">72%</h3>
                </div>
                <div className="bg-status-completed/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-status-completed" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground flex items-center">
                <ChevronUp className="h-3 w-3 text-status-completed mr-1" />
                <span className="text-status-completed mr-1">8%</span> 
                from previous month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Citizens</p>
                  <h3 className="text-3xl font-bold mt-2">204</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground flex items-center">
                <ChevronUp className="h-3 w-3 text-status-completed mr-1" />
                <span className="text-status-completed mr-1">15%</span> 
                from previous month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Resolution Time</p>
                  <h3 className="text-3xl font-bold mt-2">{stats.averageResolutionTime} days</h3>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Archive className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground flex items-center">
                <ChevronUp className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                <span className="text-status-completed mr-1">10%</span> 
                improvement from last month
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trend */}
        <Card className="lg:col-span-2 bg-white shadow-subtle">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Complaint Volume</CardTitle>
              <Button variant="outline" size="sm">
                <BarChart2 className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" dy={10} />
                  <YAxis />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #f3f4f6',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Bar 
                    dataKey="complaints" 
                    fill="rgba(59, 130, 246, 0.8)" 
                    radius={[4, 4, 0, 0]} 
                    barSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-white shadow-subtle">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} complaints`, 'Count']}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #f3f4f6',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Comparison */}
        <Card className="lg:col-span-2 bg-white shadow-subtle">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Comparison</CardTitle>
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
                  <span>Current Year</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary/40 rounded-full mr-1"></div>
                  <span>Previous Year</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" dy={10} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #f3f4f6',
                      borderRadius: '6px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    name="Current Year" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previous" 
                    name="Previous Year" 
                    stroke="#93C5FD" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Resolution Time */}
        <Card className="bg-white shadow-subtle">
          <CardHeader>
            <CardTitle>Resolution Time by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resolutionData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.time} days</span>
                  </div>
                  <Progress 
                    value={(item.time / 7) * 100} 
                    className="h-2"
                    // Different colors for different categories
                    indicatorClassName={COLORS[index % COLORS.length]}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-3">Key Insights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-status-completed mr-2">•</span>
                  <span>Safety issues have the fastest resolution times</span>
                </li>
                <li className="flex items-start">
                  <span className="text-status-pending mr-2">•</span>
                  <span>Infrastructure complaints take longest to resolve</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Overall resolution time improved by 10% this month</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/analytics">
          <Button className="px-6">
            View Full Analytics
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VillageHeadDashboard;

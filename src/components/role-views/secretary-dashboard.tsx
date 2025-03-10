
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, PieChart, AlertTriangle, MessageSquare, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { ComplaintCard } from "@/components/complaints/complaint-card";
import { Complaint, ComplaintStats, mockComplaints } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { AvatarWithStatus } from "@/components/ui/avatar-with-status";
import { Progress } from "@/components/ui/progress";

export function SecretaryDashboard() {
  const { toast } = useToast();
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>(mockComplaints);
  
  // Simulated metrics
  const stats: ComplaintStats = {
    totalComplaints: 124,
    pendingComplaints: 32,
    processingComplaints: 45,
    completedComplaints: 47,
    averageResolutionTime: 3.5,
    complaintsByCategory: [
      { category: 'Infrastructure', count: 42 },
      { category: 'Public Services', count: 28 },
      { category: 'Safety', count: 19 },
      { category: 'Environment', count: 23 },
      { category: 'Others', count: 12 },
    ],
  };

  // Prioritized complaints list (for demonstration)
  const prioritizedComplaints = [...mockComplaints].sort((a, b) => {
    // Sort by priority (high -> low)
    const priorityValues = { high: 3, medium: 2, low: 1 };
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  const handleAssign = (complaintId: string, userId: string) => {
    toast({
      title: "Complaint Assigned",
      description: `Complaint #${complaintId} has been assigned to staff member.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Complaints</p>
                  <h3 className="text-3xl font-bold mt-2">{stats.totalComplaints}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-status-completed">↑ 12%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Need Verification</p>
                  <h3 className="text-3xl font-bold mt-2">{stats.pendingComplaints}</h3>
                </div>
                <div className="bg-status-pending/10 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-status-pending" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-red-500">↑ 5%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <h3 className="text-3xl font-bold mt-2">{stats.processingComplaints}</h3>
                </div>
                <div className="bg-status-processing/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-status-processing" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-status-completed">↑ 8%</span> from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <h3 className="text-3xl font-bold mt-2">{stats.completedComplaints}</h3>
                </div>
                <div className="bg-status-completed/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-status-completed" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-status-completed">↑ 16%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Queue */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Priority Queue</h2>
            <Link to="/all-complaints">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {prioritizedComplaints.slice(0, 3).map((complaint) => (
              <Card key={complaint.id} className="bg-white shadow-subtle hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-2 h-16 rounded-full 
                        ${complaint.priority === 'high' ? 'bg-red-500' : 
                          complaint.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'}
                      `} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`
                            text-xs font-medium px-2 py-0.5 rounded-full 
                            ${complaint.priority === 'high' ? 'bg-red-100 text-red-700' : 
                              complaint.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}
                          `}>
                            {complaint.priority.toUpperCase()} PRIORITY
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-medium mt-1">{complaint.title}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                            {complaint.category.name}
                          </span>
                          <span className={`status-badge ${complaint.status}`}>
                            {complaint.status === 'pending' ? 'Needs Verification' : 
                             complaint.status === 'processing' ? 'In Progress' : 'Resolved'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:justify-end">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => {
                          toast({
                            title: "Complaint Verified",
                            description: `Complaint "${complaint.title}" has been verified.`
                          });
                        }}
                      >
                        Verify
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAssign(complaint.id, "staff-123")}
                      >
                        Assign
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => {
                          // View details logic
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Categories Distribution</h2>
          <Card className="bg-white shadow-subtle">
            <CardContent className="p-6">
              <div className="space-y-4">
                {stats.complaintsByCategory.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.category}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                    <Progress 
                      value={(item.count / stats.totalComplaints) * 100} 
                      className="h-2"
                      // Different colors for different categories
                      indicatorClassName={
                        index % 4 === 0 ? "bg-primary" :
                        index % 4 === 1 ? "bg-status-pending" :
                        index % 4 === 2 ? "bg-status-processing" :
                        "bg-status-completed"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mt-8 mb-6">Staff Activity</h2>
          <Card className="bg-white shadow-subtle">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AvatarWithStatus
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3"
                      status="processing"
                      name="Ahmad Santoso"
                    />
                    <div>
                      <p className="font-medium">Ahmad Santoso</p>
                      <p className="text-xs text-muted-foreground">Public Works</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">12</p>
                    <p className="text-xs text-muted-foreground">Assigned</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AvatarWithStatus
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1522&ixlib=rb-4.0.3"
                      status="completed"
                      name="Siti Rahma"
                    />
                    <div>
                      <p className="font-medium">Siti Rahma</p>
                      <p className="text-xs text-muted-foreground">Environment</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">8</p>
                    <p className="text-xs text-muted-foreground">Assigned</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AvatarWithStatus
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=687&ixlib=rb-4.0.3"
                      status="pending"
                      name="Budi Santoso"
                    />
                    <div>
                      <p className="font-medium">Budi Santoso</p>
                      <p className="text-xs text-muted-foreground">Public Services</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">5</p>
                    <p className="text-xs text-muted-foreground">Assigned</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SecretaryDashboard;

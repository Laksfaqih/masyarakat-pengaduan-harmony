
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, FileText, Clock, ChevronRight, Filter } from "lucide-react";
import { Complaint, mockComplaints } from "@/types";
import { ComplaintCard } from "@/components/complaints/complaint-card";
import { useToast } from "@/hooks/use-toast";

export function UserDashboard() {
  const { toast } = useToast();
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>(mockComplaints);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const totalComplaints = mockComplaints.length;
  const pendingComplaints = mockComplaints.filter(c => c.status === 'pending').length;
  const processingComplaints = mockComplaints.filter(c => c.status === 'processing').length;
  const completedComplaints = mockComplaints.filter(c => c.status === 'completed').length;

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    if (status === "all") {
      setFilteredComplaints(mockComplaints);
    } else {
      setFilteredComplaints(mockComplaints.filter(c => c.status === status));
    }
    toast({
      title: "Filter Applied",
      description: `Showing ${status === "all" ? "all" : status} complaints`,
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
                  <h3 className="text-3xl font-bold mt-2">{totalComplaints}</h3>
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
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <h3 className="text-3xl font-bold mt-2">{pendingComplaints}</h3>
                </div>
                <div className="bg-status-pending/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-status-pending" />
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
                  <h3 className="text-3xl font-bold mt-2">{processingComplaints}</h3>
                </div>
                <div className="bg-status-processing/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-status-processing" />
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
                  <h3 className="text-3xl font-bold mt-2">{completedComplaints}</h3>
                </div>
                <div className="bg-status-completed/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-status-completed" />
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <span className="text-status-completed">↑ 16%</span> from last month
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">My Complaints</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Link to="/new-complaint">
              <Button size="sm">New Complaint</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger 
              value="all" 
              onClick={() => handleStatusFilter("all")}
              className="relative px-4 py-2"
            >
              All
              <span className="ml-1.5 text-xs bg-muted px-1.5 py-0.5 rounded-full">{totalComplaints}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              onClick={() => handleStatusFilter("pending")}
              className="relative px-4 py-2"
            >
              Pending
              <span className="ml-1.5 text-xs bg-status-pending/20 text-status-pending px-1.5 py-0.5 rounded-full">{pendingComplaints}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="processing" 
              onClick={() => handleStatusFilter("processing")}
              className="relative px-4 py-2"
            >
              In Progress
              <span className="ml-1.5 text-xs bg-status-processing/20 text-status-processing px-1.5 py-0.5 rounded-full">{processingComplaints}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              onClick={() => handleStatusFilter("completed")}
              className="relative px-4 py-2"
            >
              Resolved
              <span className="ml-1.5 text-xs bg-status-completed/20 text-status-completed px-1.5 py-0.5 rounded-full">{completedComplaints}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <ComplaintCard key={complaint.id} complaint={complaint} />
                ))
              ) : (
                <Card className="col-span-full bg-muted/30">
                  <CardContent className="flex flex-col items-center justify-center p-8">
                    <MessageSquare className="h-10 w-10 text-muted-foreground/60 mb-4" />
                    <h3 className="text-lg font-medium">No complaints found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You don't have any complaints in this category yet.
                    </p>
                    <Link to="/new-complaint">
                      <Button>Submit a Complaint</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            {/* Same structure as "all" tab but with filtered data */}
          </TabsContent>
          <TabsContent value="processing" className="mt-0">
            {/* Same structure as "all" tab but with filtered data */}
          </TabsContent>
          <TabsContent value="completed" className="mt-0">
            {/* Same structure as "all" tab but with filtered data */}
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-6">
          <Link to="/my-complaints">
            <Button variant="outline" className="flex items-center">
              View All Complaints
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;

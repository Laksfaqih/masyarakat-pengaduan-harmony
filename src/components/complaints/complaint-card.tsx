
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Complaint } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export interface ComplaintCardProps {
  complaint: Complaint;
}

export function ComplaintCard({ complaint }: ComplaintCardProps) {
  // Status colors
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
    processing: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
    completed: "bg-green-100 text-green-800 hover:bg-green-100/80",
  };

  // Priority colors
  const priorityColors = {
    low: "bg-gray-100 text-gray-800 hover:bg-gray-100/80",
    medium: "bg-orange-100 text-orange-800 hover:bg-orange-100/80",
    high: "bg-red-100 text-red-800 hover:bg-red-100/80",
  };

  // Format date
  const formatDate = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: id });
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{complaint.title}</CardTitle>
          <Badge className={statusColors[complaint.status]}>
            {complaint.status === "pending"
              ? "Menunggu"
              : complaint.status === "processing"
              ? "Diproses"
              : "Selesai"}
          </Badge>
        </div>
        <div className="flex space-x-2 text-sm text-muted-foreground">
          <span>{complaint.category.name}</span>
          <span>•</span>
          <span>{formatDate(complaint.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-2">{complaint.description}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={complaint.createdBy.avatar} alt={complaint.createdBy.name} />
            <AvatarFallback>{getInitials(complaint.createdBy.name)}</AvatarFallback>
          </Avatar>
          <span className="text-xs">{complaint.createdBy.name}</span>
        </div>
        <Badge className={priorityColors[complaint.priority]} variant="outline">
          {complaint.priority === "low"
            ? "Rendah"
            : complaint.priority === "medium"
            ? "Sedang"
            : "Tinggi"}
        </Badge>
      </CardFooter>
    </Card>
  );
}

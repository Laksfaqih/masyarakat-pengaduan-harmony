
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Eye, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComplaintStatus = "pending" | "processing" | "completed";

export interface ComplaintCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ComplaintStatus;
  date: string;
  hasAttachments?: boolean;
  onView?: (id: string) => void;
  onRespond?: (id: string) => void;
}

export function ComplaintCard({
  id,
  title,
  description,
  category,
  status,
  date,
  hasAttachments,
  onView,
  onRespond,
}: ComplaintCardProps) {
  const statusMap = {
    pending: { label: "Menunggu Konfirmasi", class: "status-badge pending" },
    processing: { label: "Sedang Diproses", class: "status-badge processing" },
    completed: { label: "Selesai", class: "status-badge completed" },
  };

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Badge variant="outline">{category}</Badge>
            <span>•</span>
            <time dateTime={date}>{date}</time>
            {hasAttachments && (
              <>
                <span>•</span>
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Lampiran
                </span>
              </>
            )}
          </div>
        </div>
        <div className={cn(statusMap[status].class)}>
          {statusMap[status].label}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => onView && onView(id)}
        >
          <Eye className="h-3.5 w-3.5 mr-1" />
          Lihat
        </Button>
        {onRespond && (
          <Button
            variant="default"
            size="sm"
            className="h-8"
            onClick={() => onRespond(id)}
          >
            <MessageCircle className="h-3.5 w-3.5 mr-1" />
            Tanggapi
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ComplaintCard;

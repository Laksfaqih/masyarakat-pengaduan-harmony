
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ComplaintStatus } from "@/types";

interface AvatarWithStatusProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  status?: ComplaintStatus;
  statusPosition?: 'top-right' | 'bottom-right';
  name?: string;
  src?: string;
}

export function AvatarWithStatus({
  status,
  statusPosition = 'bottom-right',
  name,
  src,
  className,
  ...props
}: AvatarWithStatusProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusColor = (status?: ComplaintStatus) => {
    switch(status) {
      case 'pending': return 'bg-status-pending';
      case 'processing': return 'bg-status-processing';
      case 'completed': return 'bg-status-completed';
      default: return 'bg-gray-400';
    }
  };

  const positionClasses = {
    'top-right': '-top-1 -right-1',
    'bottom-right': '-bottom-1 -right-1',
  };

  return (
    <div className="relative inline-block">
      <Avatar className={cn("border-2 border-white", className)} {...props}>
        <AvatarImage src={src} alt={name || "Avatar"} className="object-cover" />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {name ? getInitials(name) : "?"}
        </AvatarFallback>
      </Avatar>
      {status && (
        <span
          className={cn(
            "absolute w-3 h-3 rounded-full ring-2 ring-white",
            getStatusColor(status),
            positionClasses[statusPosition]
          )}
        />
      )}
    </div>
  );
}

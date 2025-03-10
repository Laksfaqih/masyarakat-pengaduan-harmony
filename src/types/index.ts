export type UserRole = 'super_admin' | 'citizen' | 'secretary' | 'village_head';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
}

export interface ComplaintCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type ComplaintStatus = 'pending' | 'processing' | 'completed';

export type ComplaintPriority = 'low' | 'medium' | 'high';

export interface ComplaintAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface ComplaintStatusUpdate {
  id: string;
  status: ComplaintStatus;
  message: string;
  createdAt: Date;
  updatedBy: User;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  attachments: ComplaintAttachment[];
  statusUpdates: ComplaintStatusUpdate[];
  assignedTo?: User;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComplaintStats {
  totalComplaints: number;
  pendingComplaints: number;
  processingComplaints: number;
  completedComplaints: number;
  averageResolutionTime: number;
  complaintsByCategory: { category: string; count: number }[];
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  type: 'status_update' | 'assignment' | 'comment' | 'system';
  relatedComplaintId?: string;
}

export const generateMockComplaintStats = (): ComplaintStats => {
  return {
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
};

export const mockCategories: ComplaintCategory[] = [
  {
    id: '1',
    name: 'Infrastructure',
    description: 'Roads, bridges, public buildings and other physical infrastructure issues',
    icon: 'building',
  },
  {
    id: '2',
    name: 'Public Services',
    description: 'Issues related to public services like water, electricity, waste management',
    icon: 'lightbulb',
  },
  {
    id: '3',
    name: 'Safety',
    description: 'Safety concerns, crime, accidents, and emergencies',
    icon: 'shield',
  },
  {
    id: '4',
    name: 'Environment',
    description: 'Pollution, deforestation, and other environmental concerns',
    icon: 'tree',
  },
  {
    id: '5',
    name: 'Others',
    description: 'Other issues not covered by the above categories',
    icon: 'more-horizontal',
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Broken street lamp on Jalan Merdeka',
    description: 'The street lamp has been broken for over a week and makes the area unsafe at night.',
    category: mockCategories[1],
    status: 'pending',
    priority: 'medium',
    attachments: [
      {
        id: '1',
        name: 'photo1.jpg',
        url: 'https://images.unsplash.com/photo-1616279969096-54b228f2f31d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3',
        type: 'image/jpeg',
        size: 2048000,
      },
    ],
    statusUpdates: [
      {
        id: '1',
        status: 'pending',
        message: 'Complaint received and awaiting verification',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedBy: {
          id: '2',
          name: 'Raden Ayu',
          email: 'secretary@example.com',
          role: 'secretary',
          verified: true,
        },
      },
    ],
    createdBy: {
      id: '1',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      role: 'citizen',
      verified: true,
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Garbage not collected on schedule',
    description: 'The garbage collectors have missed our area for two weeks in a row.',
    category: mockCategories[1],
    status: 'processing',
    priority: 'high',
    attachments: [
      {
        id: '2',
        name: 'garbage.jpg',
        url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
        type: 'image/jpeg',
        size: 1536000,
      },
    ],
    statusUpdates: [
      {
        id: '2',
        status: 'pending',
        message: 'Complaint received and awaiting verification',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedBy: {
          id: '2',
          name: 'Raden Ayu',
          email: 'secretary@example.com',
          role: 'secretary',
          verified: true,
        },
      },
      {
        id: '3',
        status: 'processing',
        message: 'Complaint verified and assigned to sanitation department',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        updatedBy: {
          id: '2',
          name: 'Raden Ayu',
          email: 'secretary@example.com',
          role: 'secretary',
          verified: true,
        },
      },
    ],
    assignedTo: {
      id: '4',
      name: 'Ahmad Santoso',
      email: 'ahmad@example.com',
      role: 'secretary',
      verified: true,
    },
    createdBy: {
      id: '1',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      role: 'citizen',
      verified: true,
    },
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Pothole on Jalan Pemuda causing accidents',
    description: 'A large pothole has formed and already caused multiple motorcycle accidents.',
    category: mockCategories[0],
    status: 'completed',
    priority: 'high',
    attachments: [
      {
        id: '3',
        name: 'pothole.jpg',
        url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
        type: 'image/jpeg',
        size: 2048000,
      },
      {
        id: '4',
        name: 'accident_report.pdf',
        url: '#',
        type: 'application/pdf',
        size: 1024000,
      },
    ],
    statusUpdates: [
      {
        id: '4',
        status: 'pending',
        message: 'Complaint received and awaiting verification',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedBy: {
          id: '2',
          name: 'Raden Ayu',
          email: 'secretary@example.com',
          role: 'secretary',
          verified: true,
        },
      },
      {
        id: '5',
        status: 'processing',
        message: 'Complaint verified and assigned to public works department',
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
        updatedBy: {
          id: '2',
          name: 'Raden Ayu',
          email: 'secretary@example.com',
          role: 'secretary',
          verified: true,
        },
      },
      {
        id: '6',
        status: 'completed',
        message: 'Pothole has been repaired',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        updatedBy: {
          id: '2',
          name: 'Raden Ayu',
          email: 'secretary@example.com',
          role: 'secretary',
          verified: true,
        },
      },
    ],
    createdBy: {
      id: '5',
      name: 'Siti Rahma',
      email: 'siti@example.com',
      role: 'citizen',
      verified: true,
    },
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
];

export const mockNotifications: NotificationType[] = [
  {
    id: '1',
    title: 'Complaint Status Updated',
    message: 'Your complaint "Broken street lamp on Jalan Merdeka" has been verified',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'status_update',
    relatedComplaintId: '1',
  },
  {
    id: '2',
    title: 'New Assignment',
    message: 'You have been assigned to handle "Garbage not collected on schedule"',
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    type: 'assignment',
    relatedComplaintId: '2',
  },
  {
    id: '3',
    title: 'Complaint Resolved',
    message: 'The complaint "Pothole on Jalan Pemuda" has been marked as resolved',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    type: 'status_update',
    relatedComplaintId: '3',
  },
];

export const mockUser: User = {
  id: '1',
  name: 'Budi Santoso',
  email: 'budi@example.com',
  role: 'citizen',
  verified: true,
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=687&ixlib=rb-4.0.3',
};

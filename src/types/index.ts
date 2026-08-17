
export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  membership: "Basic" | "Standard" | "Premium";
  status: "Active" | "Expired";
  joinDate: string;
  expiryDate: string;
  avatar: string;
}

export interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  status: "Active" | "Inactive";
  joinDate: string;
  avatar: string;
}

interface MembershipPlan {
  id: number;
  name: string;
  duration: number;
  durationType: "Days" | "Months" | "Years";
  price: number;
  description: string;
  status: "Active" | "Inactive";
}
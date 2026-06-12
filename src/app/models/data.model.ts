// Hotel Interface
export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  rooms: number;
  rating: number;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
}

// Room Interface
export interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  type: 'single' | 'double' | 'suite' | 'deluxe';
  capacity: number;
  price: number;
  available: boolean;
  amenities: string[];
  createdAt: Date;
}

// Reservation Interface
export interface Reservation {
  id: string;
  roomId: string;
  hotelId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}

// User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

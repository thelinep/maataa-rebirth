import type { DemoVendor, DemoBooking } from "../types/demo";
const c="2026-10-01T10:00:00+05:30",u="2026-10-04T08:30:00+05:30";
export const DEMO_VENDORS: readonly DemoVendor[] = [
{id:"vendor-01",name:"Aurum Hospitality",category:"Hospitality",city:"Delhi NCR",rating:4.9,priceBand:"₹₹₹",status:"preferred",createdAt:c,updatedAt:u},
{id:"vendor-02",name:"Lotus Floral Studio",category:"Décor & Floral",city:"Delhi NCR",rating:4.8,priceBand:"₹₹",status:"preferred",createdAt:c,updatedAt:u},
{id:"vendor-03",name:"CineLight AV",category:"AV & Production",city:"Delhi NCR",rating:4.7,priceBand:"₹₹₹",status:"available",createdAt:c,updatedAt:u},
{id:"vendor-04",name:"Quiet Rituals",category:"Wellness",city:"Gurugram",rating:4.9,priceBand:"₹₹₹",status:"preferred",createdAt:c,updatedAt:u},
{id:"vendor-05",name:"Signature Kitchens",category:"Catering",city:"New Delhi",rating:4.6,priceBand:"₹₹₹₹",status:"busy",createdAt:c,updatedAt:u},
{id:"vendor-06",name:"Urban Mobility",category:"Transport",city:"Delhi NCR",rating:4.5,priceBand:"₹₹",status:"available",createdAt:c,updatedAt:u},
{id:"vendor-07",name:"Framecraft Media",category:"Photo & Video",city:"Mumbai",rating:4.8,priceBand:"₹₹₹",status:"available",createdAt:c,updatedAt:u},
{id:"vendor-08",name:"StageMatrix",category:"Stage & Fabrication",city:"Bengaluru",rating:4.7,priceBand:"₹₹₹",status:"available",createdAt:c,updatedAt:u},
{id:"vendor-09",name:"SecureGate",category:"Access & Security",city:"Delhi NCR",rating:4.6,priceBand:"₹₹",status:"available",createdAt:c,updatedAt:u},
{id:"vendor-10",name:"GuestFlow",category:"Guest Management",city:"Delhi NCR",rating:4.8,priceBand:"₹₹",status:"preferred",createdAt:c,updatedAt:u}
] as const;
export const DEMO_BOOKINGS: readonly DemoBooking[] = [
{id:"booking-01",name:"Wellness facilitator",eventId:"event-001",vendorId:"vendor-04",service:"Guided wellness session",amount:125000,status:"booked",createdAt:c,updatedAt:u},
{id:"booking-02",name:"Floral tables",eventId:"event-001",vendorId:"vendor-02",service:"Table florals and planters",amount:95000,status:"booked",createdAt:c,updatedAt:u},
{id:"booking-03",name:"AV package",eventId:"event-001",vendorId:"vendor-03",service:"LED, microphones and speakers",amount:145000,status:"approved",createdAt:c,updatedAt:u},
{id:"booking-04",name:"Guest operations",eventId:"event-001",vendorId:"vendor-10",service:"Invitations and check-in",amount:65000,status:"quoted",createdAt:c,updatedAt:u},
{id:"booking-05",name:"Security",eventId:"event-001",vendorId:"vendor-09",service:"Access control",amount:55000,status:"draft",createdAt:c,updatedAt:u}
] as const;

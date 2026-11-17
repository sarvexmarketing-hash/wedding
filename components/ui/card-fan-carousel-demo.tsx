"use client";

import SocialCards from "@/components/ui/card-fan-carousel";

const DEMO_CARDS = [
  {
    imgUrl: "https://images.unsplash.com/photo-1781077127258-2f3f22cf5d5e?auto=format&fit=crop&w=1000&q=80",
    alt: "Royal Muhurat & Pheras",
    title: "The Royal Muhurat & Pheras",
    subtitle: "Rahul & Priya Reddy · Taj Falaknuma Palace",
    badge: "Sacred Union"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    alt: "Grand Sangeet & Musical Gala",
    title: "Grand Sangeet & Musical Gala",
    subtitle: "Kabir & Ananya Varma · The Oberoi Udaivilas",
    badge: "Evening Gala"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    alt: "Mughal Floral Mandap & Vows",
    title: "Mughal Floral Mandap & Vows",
    subtitle: "Dev & Meera Singhania · Rambagh Palace",
    badge: "Royal Mandap"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1761488948640-61b9e273d671?auto=format&fit=crop&w=1000&q=80",
    alt: "Intimate Mehendi & Henna Garden",
    title: "Intimate Mehendi & Henna Garden",
    subtitle: "Arjun & Tara Mehta · Alila Diwa, Goa",
    badge: "Day Celebration"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1628335179471-987edb152881?auto=format&fit=crop&w=1000&q=80",
    alt: "Royal Groom & Baraat Procession",
    title: "Royal Groom & Baraat Procession",
    subtitle: "Vikram & Pooja Rao · ITC Grand Bharat",
    badge: "Baraat Gala"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1000&q=80",
    alt: "Golden Hour Courtyard Vows",
    title: "Golden Hour Courtyard Vows",
    subtitle: "Rohan & Sanjana Kapur · Heritage Palace Courtyard",
    badge: "Destination Vows"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80",
    alt: "Palace Floral Aisle & Vows",
    title: "Palace Floral Aisle & Reception",
    subtitle: "Sameer & Neha Chawla · Umaid Bhawan Palace",
    badge: "Palace Aisle"
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    alt: "Bridal Jewels & Auspicious Muhurat",
    title: "Bridal Regalia & Jewels",
    subtitle: "Aditya & Riya Kapoor · The Leela Palace",
    badge: "Vedic Rituals"
  }
];

export default function Demo() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] py-16">
      <SocialCards cards={DEMO_CARDS} />
    </div>
  );
}

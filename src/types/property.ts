import { StaticImageData } from "next/image";
export interface Property {
  _id: string;
  title: string;
  city: string;
  price: string;
  image: string | StaticImageData; 
  type?: string;
  state?: string;
  areaSqFt?: number;
  bedrooms?: number;
  furnished?: string;
  listedBy?: string;
  amenities?: string[];
  tags?: string[];
  colorTheme?: string;
  rating?: number;
  isVerified?: boolean;
  listingType?: string;
}

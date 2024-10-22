// get model
// export interface ItineraryDescriptionsGet {
//     itineraryDescriptionId: number;
//     itineraryDetailsId: number;
//     itineraryDetails: string;
//     itenaryPoints?: string;
// }

// export interface ItineraryDetailsGet {
//     itineraryDetailsId: number;
//     packageDetailsId: number;
//     packageDetails: string;
//     itineraryTitle?: string;
//     itineraryDescriptions?: ItineraryDescriptionsGet[];
// }

// export interface PackageDetailsGet {
//     packageDetailsId: number;
//     packageId: number;
//     package?: string;
//     packageDescription?: string;
//     itineraryDetails?: ItineraryDetailsGet[];
// }

// export interface PackageGet {
//     packageId: number;
//     packageName: string;
//     packageLocation: string;
//     packageType: number;
//     isActive: boolean;
//     originalPrice?: number;
//     actualPrice?: number;
//     days?: number;
//     nights?: number;
//     packageDetails?: PackageDetailsGet;
// }

export interface ItineraryPoint {
  $id: string;
  itineraryDescriptionId: number;
  itineraryDetailsId: number;
  itineraryDetails: Reference;
  itenaryPoints: string;
}

export interface ItineraryDescriptions {
  $id: string;
  $values: ItineraryPoint[];
}

export interface ItineraryDetails {
  $id: string;
  itineraryDetailsId: number;
  packageDetailsId: number;
  packageDetails: Reference;
  itineraryTitle: string;
  itineraryDescriptions: ItineraryDescriptions;
}

export interface ItineraryDetailsCollection {
  $id: string;
  $values: ItineraryDetails[];
}

export interface PackageDetails {
  $id: string;
  packageDetailsId: number;
  packageId: number;
  package: Reference;
  packageDescription: string;
  itineraryDetails: ItineraryDetailsCollection;
  packageImages: File[];
}

export interface Reference {
  $ref: string;
}

export interface PackageGet {
  $id: string;
  packageId: number;
  packageName: string;
  packageLocation: string;
  packageType: number;
  isActive: boolean;
  originalPrice: number;
  actualPrice: number;
  days: number;
  nights: number;
  isFixedDeparture: boolean;
  packageDetails: PackageDetails;
  cardThumbNailImage: string;
}


// post model
export interface ItineraryDescriptionPost {
    itenaryPoints: string;
}

export interface ItineraryDetailsPost {
    itineraryTitle: string;
    itineraryDescriptions: ItineraryDescriptionPost[];
}

export interface PackageDetailsPost {
    packageDescription: string;
    packageImages: File[];
    itineraryDetails: ItineraryDetailsPost[];
}

export interface PackagePost {
    packageName: string;
    packageLocation: string;
    packageType: number;
    isActive: boolean;
    originalPrice: number | null;
    actualPrice: number | null;
    days: number | null;
    nights: number | null;
    isFixedDeparture: boolean;
    packageDetails: PackageDetailsPost;
    cardThumbNailImage: File | null;
}


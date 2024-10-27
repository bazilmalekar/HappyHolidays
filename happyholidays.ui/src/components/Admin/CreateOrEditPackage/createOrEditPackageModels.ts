// get model
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
  packageImages: {
    $id: string;
    $values: string[] | File[];
  };
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
  cardThumbNailImage: File | null | string;
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

//edit interfact
export interface EditItineraryPoint {
  $id: string;
  itineraryDescriptionId: number;
  itineraryDetailsId: number;
  itineraryDetails: Reference;
  itenaryPoints: string;
}

export interface EditItineraryDescriptions {
  $id: string;
  $values: EditItineraryPoint[];
}

export interface EditItineraryDetails {
  $id: string;
  itineraryDetailsId: number;
  packageDetailsId: number;
  packageDetails: Reference;
  itineraryTitle: string;
  itineraryDescriptions: EditItineraryDescriptions;
}

export interface EditItineraryDetailsCollection {
  forEach(arg0: (itinerary: { itineraryTitle: string | Blob; itineraryDescriptions: any[]; }, iIndex: any) => void): unknown;
  $id: string;
  $values: EditItineraryDetails[];
}

export interface PackageEditDetails {
  $id: string;
  packageDetailsId: number;
  packageId: number;
  package: Reference;
  packageDescription: string;
  itineraryDetails: EditItineraryDetailsCollection;
  packageImages: {
    $id: string;
    $values: string[] | File[];
  };
}

export interface Reference {
  $ref: string;
}

export interface PackageEdit {
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
  packageDetails: PackageEditDetails;
  cardThumbNailImage: File | null | string;
}


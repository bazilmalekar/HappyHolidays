// get model
export interface ItineraryDescriptionsGet {
    itineraryDescriptionId: number;
    itineraryDetailsId: number;
    itineraryDetails: string;
    itenaryPoints?: string;
}

export interface ItineraryDetailsGet {
    itineraryDetailsId: number;
    packageDetailsId: number;
    packageDetails: string;
    itineraryTitle?: string;
    itineraryDescriptions?: ItineraryDescriptionsGet[];
}

export interface PackageDetailsGet {
    packageDetailsId: number;
    packageId: number;
    package?: string;
    packageDescription?: string;
    itineraryDetails?: ItineraryDetailsGet[];
}

export interface PackageGet {
    packageId: number;
    packageName: string;
    packageLocation: string;
    packageType: number | null;
    isActive: boolean;
    originalPrice?: number;
    actualPrice?: number;
    days?: number;
    nights?: number;
    packageDetails?: PackageDetailsGet;
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
    packageDetails: PackageDetailsPost;
}


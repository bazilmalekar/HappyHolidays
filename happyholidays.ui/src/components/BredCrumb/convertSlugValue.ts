const slugToTitleDictionary: Record<string, string> = {
    "international": "International Packages",
    "details": "Package Details"
};

export const convertSlugToTitle = (slug: string): string => {
    // Remove numbers from the slug
    const cleanSlug = slug.replace(/[0-9]/g, '').replace(/ - /g, ' ');

    return slugToTitleDictionary[cleanSlug] ||
        cleanSlug
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
};
import { RATES } from './Rates';

// --- Constants ---
export const ROOM_NAMES = [
    'Living Room', 'Master Bedroom', 'Bedroom', 'Kitchen', 'Bathroom', 'Lounge', 'Dining Room', 'Office Room', 'Corridor', 'Other'
];

export const SERVICE_TYPES = [
    'Interior Painting', 'Exterior Painting', 'Texture Work', 'Waterproofing', 'Wood Polish & Paint', 'Epoxy Floor Coating', 'Full Home Package'
];

export const PROPERTY_TYPES = [
    'House / Bungalow', 'Apartment / Flat', 'Office / Commercial', 'Factory / Warehouse', 'Shop / Showroom'
];

const formatLabel = (id: string) => id.split('_').map(word => {
    if (word === 'chs') return 'CHS';
    if (word === 'kda') return 'KDA';
    if (word === 'dha') return 'DHA';
    if (word === 'pechs') return 'PECHS';
    if (word === 'kaechs') return 'KAECHS';
    if (word === 'machs') return 'MACHS';
    return word.charAt(0).toUpperCase() + word.slice(1);
}).join(' ');

// All areas combined into a alphabetically sorted group
export const LOCATION_GROUPS = [
    {
        group: 'Karachi Areas',
        areas: Object.keys(RATES.locationMultiplier)
            .map(id => ({ id, label: formatLabel(id) }))
            .sort((a, b) => {
                // Ensure 'other_area' and 'out_of_karachi' are placed at the bottom
                const isSpecialA = a.id === 'other_area' || a.id === 'out_of_karachi';
                const isSpecialB = b.id === 'other_area' || b.id === 'out_of_karachi';

                if (isSpecialA && !isSpecialB) return 1;
                if (!isSpecialA && isSpecialB) return -1;

                return a.label.localeCompare(b.label);
            })
    }
];

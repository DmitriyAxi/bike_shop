interface IBikeSpecification {
    frameSize: string[];
    frameMaterial: string;
    suspension: string;
    wheelSize: number;
    speeds: number;
    weight: number;
    brakeType: string;
}

interface IBikeColor {
    name: string;
    hex: string;
    inStock: boolean;
}

export interface IBike {
    id: string;
    name: string;
    type: string;
    brand: string;
    price: number;
    oldPrice?: number | null;
    rating: number;
    reviews: number;
    inStock: boolean;
    isNew?: boolean | null;
    discount?: number | null;
    specifications: IBikeSpecification;
    features: string[];
    colors: IBikeColor[];
    image: string;
    description: string;
    category: string[];
}
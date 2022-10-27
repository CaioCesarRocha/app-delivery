
export interface IInputCreateDelivery{
    name_item: string;
    size_item: "small" | "medium" | "large";
    startPosition: [number, number]
    endPosition: [number, number];
}

export interface IDelivery {
    id: string;
    id_client: string;
    id_deliveryman: string | null;
    name_item: string;
    size_item: 'small' |'medium' | 'large';
    startPosition: [number, number];
    endPosition: [number, number];
    status: 'open' | 'inprogress' | 'closed';
    price: number;
    created_at: Date;
    end_at: String;
}

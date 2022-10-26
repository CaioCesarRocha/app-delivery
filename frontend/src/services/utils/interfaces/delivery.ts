
export interface IInputCreateDelivery{
    name_item: string;
    size_item: "small" | "medium" | "large";
    startPosition: [number, number]
    endPosition: [number, number];
}
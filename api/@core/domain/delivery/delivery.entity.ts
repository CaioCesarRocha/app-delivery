import crypto from 'crypto';
import { getDistanceFromLatLntInKm } from './_calculate_distance';

export type LatLng = [ number, number]
export type sizeItem = 'small' | 'medium' | 'large'
export type statusDelivery = 'open' | 'inprogress' | 'closed'

export type DeliveryProps={
    id_client: string,
    id_deliveryman?: string,
    name_item: string,
    size_item: sizeItem,
    startPosition: LatLng,
    endPosition: LatLng,
    status?: statusDelivery,
    price?: number
}

export class Delivery{
    public readonly id: string;
    public readonly feeDistance = 5;
    public readonly feeSmall = 20;
    public readonly feeMedium = 50;
    public readonly feeLarge = 100;
    public props: Required<DeliveryProps>

    private constructor(props: DeliveryProps, id?: string){
        this.id = id || crypto.randomUUID();
        let calculatedPrice = getDistanceFromLatLntInKm(props.startPosition, props.endPosition) * this.feeDistance;
        if(props.size_item === 'small') calculatedPrice = calculatedPrice + this.feeSmall;
        if(props.size_item === 'medium') calculatedPrice = calculatedPrice + this.feeMedium;
        if(props.size_item === 'large') calculatedPrice = calculatedPrice + this.feeLarge;

        this.props ={
            ...props,
            id_deliveryman: props.id_deliveryman || '',
            status: props.status || 'open',
            price: props.price || calculatedPrice
        }
    }

    static create(props: DeliveryProps, id?:string){
        return new Delivery(props, id)
    }

    updateNameItem(name_item: string){
        this.props.name_item = name_item;
    }

    updateSizeItem(size: sizeItem){
        this.props.size_item = size;
    }

    updatePosition(startPosition: LatLng, endPosition: LatLng){
        this.props.startPosition = startPosition;
        this.props.endPosition = endPosition;
    }

    updateStatus(status: statusDelivery){
        this.props.status = status;
    }

    private set name_item(name_item: string){
        this.props.name_item = name_item;
    }

    get name_item(){
        return this.props.name_item;
    }

    private set size_item(value: sizeItem){
        this.props.size_item = value
    }

    get size_item(){
        return this.props.size_item
    }

    private set startPosition(value: LatLng){ 
        this.props.startPosition = value;  
    }

    get startPosition(){ 
        return this.props.startPosition;
    }

    private set endPosition(value: LatLng){ 
        this.props.endPosition = value;  
    }

    get endPosition(){ 
        return this.props.endPosition;
    }

    private set status(value: statusDelivery){ 
        this.props.status= value;  
    }

    get status(){ 
        return this.props.status;
    }

    toJSON(){
        return {
            id: this.id,
            ...this.props
        }
    }
}
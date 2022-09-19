import crypto from 'crypto';
import { getDistanceFromLatLntInKm } from './_calculate_distance';

export type LatLng = {lat: number, lng: number}

export type DeliveryProps={
    id_client: string,
    id_deliveryman?: string,
    name_item: string,
    size_item: 'small' | 'medium' | 'large',
    startPosition: LatLng,
    endPosition: LatLng,
    status?: 'open' | 'inprogress' | 'closed'
    price?: number
}

export class Delivery{
    public readonly id: string;
    public props: Required<DeliveryProps>

    private constructor(props: DeliveryProps, id?: string){
        this.id = id || crypto.randomUUID();
        let calculatedPrice = getDistanceFromLatLntInKm(props.startPosition, props.endPosition) * 5;
        if(props.size_item === 'small') calculatedPrice = calculatedPrice + 20;
        if(props.size_item === 'medium') calculatedPrice = calculatedPrice + 50;
        if(props.size_item === 'large') calculatedPrice = calculatedPrice + 100;

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

    updateSizeItem(size: 'small' | 'medium' | 'large'){
        this.props.size_item = size;
    }

    updatePosition(startPosition: LatLng, endPosition: LatLng){
        this.props.startPosition = startPosition;
        this.props.endPosition = endPosition;
    }

    updateStatus(status: 'open' | 'inprogress' |'closed'){
        this.props.status = status;
    }

    private set name_item(name_item: string){
        this.props.name_item = name_item;
    }

    get name_item(){
        return this.props.name_item;
    }

    private set size_item(value: 'small' | 'medium' | 'large'){
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

    private set status(value: 'open' | 'inprogress' |'closed'){ 
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
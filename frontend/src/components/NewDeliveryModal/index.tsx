import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { TileLayer, Marker, MapContainer, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { X ,Bicycle, Truck, Jeep} from 'phosphor-react';
import { Overlay, Content, CloseButton, DeliveryType, DeliveryTypeButton } from './styles';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export function NewDeliveryModal(){
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

    function LocationMarker(){
        const map = useMapEvents({
            click: (event) => {
                setSelectedPosition([
                    event.latlng.lat,
                    event.latlng.lng
                ]);
            },
          })      
        return null   
    }

    function handleDataForm(){
        console.log('poiston', selectedPosition)
    }

    return(
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <Dialog.Title>Nova Entrega</Dialog.Title>

                <form action=''>
                    <input type="text" placeholder='descrição' required/>
                    <DeliveryType>
                        <DeliveryTypeButton value="small">
                            <Bicycle size={24}/>
                            Pequena
                        </DeliveryTypeButton>
                        <DeliveryTypeButton value="medium">
                            <Jeep size={24}/>
                            Média
                        </DeliveryTypeButton>
                        <DeliveryTypeButton value="large">
                            <Truck size={24}/>
                            Grande
                        </DeliveryTypeButton>
                    </DeliveryType>
                    <Dialog.DialogDescription>Selecione o local da partida</Dialog.DialogDescription>
                    <MapContainer center={[-18.5913406,-46.5258909]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker/> 
                        <Marker position={selectedPosition}/>
                    </MapContainer>
                    <Dialog.DialogDescription>Selecione o local da entrega</Dialog.DialogDescription>
                    <MapContainer center={[-18.5913406,-46.5258909]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker/> 
                        <Marker position={selectedPosition}/>
                    </MapContainer>
                    <button type='submit' onClick={() => handleDataForm()}>
                        Cadastrar
                    </button>
                </form>                
            </Content>
        </Dialog.Portal> 
    )
}
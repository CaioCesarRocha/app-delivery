import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
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

const newFormDeliverySchema = z.object({
    description: z.string(),
    size: z.enum(['small', 'medium', 'large']),
    //startPosition: z.number(),
    //endPosition: z.number()
});

type NewDeliveryFormInputs = z.infer<typeof newFormDeliverySchema>

export function NewDeliveryModal(){   
    const [startPosition, setStartPosition] = useState<[number, number]>([0,0]);
    const [endPosition, setEndPosition] = useState<[number, number]>([0,0]);
    const noOnePosition = 0;

    const { 
        control, // qdo nao for html nativo(ex: input), precisa usar o control pra pegar os valores
        register,
        handleSubmit,
        formState: {isSubmitting} //informa estado do form, podendo ser usado pra desabilitar o botao
    } = useForm<NewDeliveryFormInputs>({
        resolver: zodResolver(newFormDeliverySchema)
    });

    function LocationMarkerStart(){
        const map = useMapEvents({
            click: (event) => {
                setStartPosition([
                    event.latlng.lat,
                    event.latlng.lng
                ]);
            },
          })      
        return null   
    }

    function LocationMarkerEnd(){
        const map = useMapEvents({
            click: (event) => {
                setEndPosition([
                    event.latlng.lat,
                    event.latlng.lng
                ]);
            },
          })      
        return null   
    }

    async function handleSendDeliverys(data: NewDeliveryFormInputs){
        if(startPosition[0] === noOnePosition || endPosition[0] === noOnePosition){
            alert('Selectione corretamente as posições')
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 2000))// importante usar pra simular delay
        
        const dataDelivery = {...data, startPosition: startPosition, endPosition: endPosition }
        console.log('data', dataDelivery)
    }

    return(
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <Dialog.Title>Nova Entrega</Dialog.Title>

                <form onSubmit={handleSubmit(handleSendDeliverys)}>
                    <input type="text" placeholder='descrição' required {...register('description')}/>
                    <Controller
                        control={control}
                        name="size"
                        render={({field}) =>{
                            return(
                                <DeliveryType 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                >
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
                            )
                        }}                 
                    />                    
                    
                    <Dialog.DialogDescription>Selecione o local da partida</Dialog.DialogDescription>
                    <MapContainer center={[-18.5913406,-46.5258909]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarkerStart/> 
                        <Marker position={startPosition}/>
                    </MapContainer>
                    <Dialog.DialogDescription>Selecione o local da entrega</Dialog.DialogDescription>
                    <MapContainer center={[-18.5913406,-46.5258909]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarkerEnd/> 
                        <Marker position={endPosition} />
                    </MapContainer>
                    <button type='submit' disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>                
            </Content>
        </Dialog.Portal> 
    )
}
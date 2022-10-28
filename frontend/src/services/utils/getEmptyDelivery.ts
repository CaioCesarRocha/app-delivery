

export function getEmptyDelivery(){
    return {   
        id: "", id_client: "", 
        id_deliveryman: "", 
        name_item: "",
        size_item: "small",           
        status: 'open',
        startPosition: [0, 0], 
        endPosition: [0, 0],
        price: 0, 
        created_at: new Date(), 
        end_at: new Date()
    }
}
import { createStackNavigator } from '@react-navigation/stack';
import { Authentication } from '../screens/Authentication';

const { Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
    return(
        <Navigator 
            screenOptions={
                { headerShown: false }
            }    
        >
            <Screen
                name="Authentication"
                component={Authentication}
            />
        </Navigator>
    )
}
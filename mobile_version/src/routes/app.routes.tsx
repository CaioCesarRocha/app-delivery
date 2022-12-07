import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { 
    ListChecks, 
    ChartPieSlice
} from 'phosphor-react-native'
import { Dashboard } from '../screens/Dashboard';
import { Resume } from '../screens/Resume';

const { Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes(){
    const theme = useTheme()
    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.COLORS.GREEN_500,
                tabBarInactiveTintColor: theme.COLORS.GRAY_200,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle:{
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    backgroundColor: theme.COLORS.GRAY_700
                }
            }}
        >
            <Screen
                name="Entregas"
                component={Dashboard}
                options={{
                    tabBarIcon: (({size, color}) =>
                        <ListChecks size={size} color={color}/>
                    )
                }}
            />
            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({size, color}) =>
                        <ChartPieSlice size={size} color={color}/>
                    )
                }}
            />
        </Navigator>
    )
}
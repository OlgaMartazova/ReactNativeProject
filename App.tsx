import React, { useEffect } from "react";
import { View, Text, Button, Linking } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from "./screens/SettingsScreen";
import NewsScreen from "./screens/NewsScreen";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import Navigation from "./navigation/Navigation";
import { DeepLinking } from "./navigation/DeepLinking";
import AboutScreen from "./screens/AboutScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="News" component={NewsScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={(props) => ({
                    headerRight: () => (
                        <Button
                            onPress={() => props.navigation.navigate('About')}
                            title="О приложении"
                            color="#000"
                        />)
                })}
            />
            <Stack.Screen name={'About'} component={AboutScreen} initialParams={{ itemId: 42 }} />
        </Stack.Navigator>
    );
}

const App = () => {
    useEffect(() => {
        Linking.getInitialURL().then(async (deepLinkInitialURL: any) => {
            if (deepLinkInitialURL) {
                await DeepLinking.handleInitialNavigate(deepLinkInitialURL);
            }
        });
    }, []);

    return (
        <NavigationContainer
            linking={DeepLinking.linking}
            ref={Navigation.navigationRef}>
            <Stack.Navigator>
                <Stack.Screen
                    name={'Tab'}
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
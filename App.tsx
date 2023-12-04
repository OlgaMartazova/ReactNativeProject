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
import { useTranslation } from "react-i18next";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { useRootStore } from "./hooks/UseRootStore";
import { observer } from "mobx-react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const home = 'Home'
const news = 'News'
const chat = 'Chat'
const settings = 'Settings'

const TabNavigation = () => {
    const { t } = useTranslation()
    return (
        <Tab.Navigator
            initialRouteName={home}>
            <Tab.Screen name={home} component={HomeStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="snow-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }
            }} />
            <Tab.Screen name={news} component={NewsScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="analytics-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabel: t('main.tabs.news'),
                headerTitle: t('main.tabs.news'),
                headerTitleAlign: 'center',
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }
            }} />
            <Tab.Screen name={chat} component={ChatScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="bonfire-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabel: t('main.tabs.chat'),
                headerTitle: t('main.tabs.chat'),
                headerTitleAlign: 'center',
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }
            }} />
            <Tab.Screen name={settings} component={SettingsScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="telescope-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabel: t('main.tabs.settings'),
                headerTitle: t('main.tabs.settings'),
                headerTitleAlign: 'center',
                tabBarStyle: {
                    backgroundColor: "white",
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                  }
            }} />
        </Tab.Navigator>
    );
}
const HomeStack = observer(() => {
    const { langStore } = useRootStore()
    const { t } = useTranslation()
    useEffect(() => {
        langStore.getLang();
    }, [])

    const handleChangeLang = async () => {
        await langStore.changeLang();
    };
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={(props) => ({
                    headerTitleAlign: 'center',
                    headerLeft: () =>
                        <Icon type="ionicon" name="text-outline" onPress={() => handleChangeLang()} />,
                    headerTitle: () =>
                        <Icon type="ionicon" name="heart-half" color="red"/>,
                    headerRight: () => (
                        <Button
                            onPress={() => props.navigation.navigate('About')}
                            title={t('main.tabs.home.button')}
                            color="#000"
                        />
                    )
                })}
            />
            <Stack.Screen name={'About'} component={AboutScreen} initialParams={{ itemId: 42 }}
                options={{ headerTitle: t('main.tabs.about') }} />
        </Stack.Navigator>
    );
})

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
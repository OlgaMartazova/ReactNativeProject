import React, { useEffect } from "react";
import { View, Text, Button, Linking, StyleSheet } from "react-native";
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
import { useTheme } from "./modules/theme/hooks/UseTheme";
import { ThemeProviders } from "./modules/theme/ThemeProvider";
import { ThemeTypes } from "./modules/theme/ThemeTypes";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const home = 'Home'
const news = 'News'
const chat = 'Chat'
const settings = 'Settings'

const TabNavigation = () => {
    const { Colors } = useTheme();
    const colors = Colors
    const { t } = useTranslation()
    return (
        <Tab.Navigator
            initialRouteName={home}>
            <Tab.Screen name={home} component={HomeStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="snow-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: colors.accentPrimary,
                tabBarInactiveTintColor: colors.accentSecondary,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.overlay,
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                }
            }} />
            <Tab.Screen name={news} component={NewsScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="analytics-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: colors.accentPrimary,
                tabBarInactiveTintColor: colors.accentSecondary,
                tabBarLabel: t('main.tabs.news'),
                headerTitle: t('main.tabs.news'),
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: colors.overlay },
                headerTitleStyle: {
                    color: colors.textPrimary
                },
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: colors.overlay,
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                }
            }} />
            <Tab.Screen name={chat} component={ChatScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="bonfire-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: colors.accentPrimary,
                tabBarInactiveTintColor: colors.accentSecondary,
                tabBarLabel: t('main.tabs.chat'),
                headerTitle: t('main.tabs.chat'),
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: colors.overlay },
                headerTitleStyle: {
                    color: colors.textPrimary
                },
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: colors.overlay,
                    height: 60,
                    paddingBottom: 10,
                    paddingTop: 10,
                }
            }} />
            <Tab.Screen name={settings} component={SettingsScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="telescope-outline" size={size} color={color} />
                ),
                tabBarActiveTintColor: colors.accentPrimary,
                tabBarInactiveTintColor: colors.accentSecondary,
                tabBarLabel: t('main.tabs.settings'),
                headerTitle: t('main.tabs.settings'),
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: colors.overlay },
                headerTitleStyle: {
                    color: colors.textPrimary
                },
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: colors.overlay,
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

    const { Colors, selectTheme, changeTheme } = useTheme();
    const colors = Colors;

    useEffect(() => {
        langStore.getLang();
    }, [])

    const handleChangeLang = async () => {
        await langStore.changeLang();
    };

    const handleChangeTheme = async () => {
        changeTheme(selectTheme === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT)
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={(props) => ({
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: colors.overlay },
                    headerShadowVisible: false,
                    headerLeft: () =>
                        <Icon type="ionicon" name="text-outline" color={colors.buttonTertiary} onPress={() => handleChangeLang()} />,
                    headerTitle: () =>
                        <Icon type="ionicon" name="heart-half" color={colors.changeThemeIcon} onPress={() => handleChangeTheme()} />,
                    headerRight: () => (
                        <Button
                            onPress={() => props.navigation.navigate('About')}
                            title={t('main.tabs.home.button')}
                            color={colors.buttonTertiary}
                        />
                    )
                })}
            />
            <Stack.Screen name={'About'} component={AboutScreen} initialParams={{ itemId: 42 }}
                options={{
                    headerTitle: t('main.tabs.about'),
                    headerStyle: { backgroundColor: colors.overlay },
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        color: colors.textPrimary
                    },
                    headerTintColor: colors.textPrimary
                }} />
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
        <ThemeProviders>
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
        </ThemeProviders>
    );
};

export default App;
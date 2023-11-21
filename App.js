import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, TouchableOpacity } from "react-native";
import SettingsScreen from "./screens/SettingsScreen";
import ChatScreen from "./screens/ChatScreen";
import AboutScreen from "./screens/AboutScreen";
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";
import { Icon } from 'react-native-elements';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';


const homeName = 'Home'
const newsName = 'News'
const chatName = 'Chat'
const settingsName = 'Settings'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === newsName) {
            iconName = focused ? 'trending-up' : 'trending-up-outline';
          } else if (rn === chatName) {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack}
        options={{
          headerShown: false,
        }} />
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
          headerTitle: (props) =>
            <Icon
              type="ionicon"
              name={Platform.OS === "ios" ? "ios-infinite" : "md-infinite"}
            />,
          headerRight: () => (
            <Button
              onPress={() => props.navigation.navigate('About')}
              title="About app"
              color="#000"
            />)
        })}
      />
      <Stack.Screen name={'About'} component={AboutScreen} initialParams={{ itemId: 42 }} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Tab'} component={TabNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
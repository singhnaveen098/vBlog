import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react'
import { View, Text, ActivityIndicator, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import tw from 'tailwind-react-native-classnames'
import auth from '@react-native-firebase/auth'
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Createblog from './screens/Createblog';
import Updateblog from './screens/Updateblog';
import Blog from './screens/Blog';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [loggedin, setloggedin] = useState(false);
  const [loading, setloading] = useState(true);

  const onauthstatechanged = (user)=>{
    if(user){
      setloggedin(true)
    }
    else{
      setloggedin(false)
    }
    if(loading){
      setloading(false)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onauthstatechanged)
    return subscriber
  }, []);
  

  if(loading){
    return(
      <ActivityIndicator
        size={32}
        color={'gray'}
      />
    )
  }

  if(!loggedin){
    return(
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Login'>
          <Tab.Screen name='Login' component={Login} />
          <Tab.Screen name='Signup' component={Signup} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Create Blog' component={Createblog} />
        <Stack.Screen name='Update Blog' component={Updateblog} />
        <Stack.Screen name='Blog' component={Blog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

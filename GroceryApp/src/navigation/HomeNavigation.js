import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/Home/Home';
import Category from '../components/Home/Category';
import Account from '../components/Home/Account';
import Favorite from '../components/Home/Favorite';
import Cart from '../components/Home/Cart';
import { Image, Platform, SafeAreaView } from 'react-native';
import HomeStack from './HomeStack';
import CategoryStack from './CategoryStack';
import AccountStack from './AccountStack';
import CartStack from './CartStack';
const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#E9E9E9',
                    height: Platform.OS === 'android' ? 60 : 80,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                // tabBarLabelStyle: {
                //     color: 'red', // Màu chữ khi tab được focus
                // },
                tabBarShowLabel: false,
                tabBarInactiveTintColor: 'blue', // Màu chữ khi tab chưa được focus
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('../media/images/homefocus.png')
                            : require('../media/images/home.png');
                    } else if (route.name === 'Category') {
                        iconName = focused
                            ? require('../media/images/searchfocus.png')

                            : require('../media/images/search.png');

                    }
                    else if (route.name === 'Favorite') {
                        iconName = focused
                            ? require('../media/images/lovefocus.png')

                            : require('../media/images/love.png');

                    }
                    else if (route.name === 'Cart') {
                        iconName = focused
                            ? require('../media/images/cartfocus.png')

                            : require('../media/images/cart.png');

                    }
                    else {
                        iconName = focused
                            ? require('../media/images/accountfocus.png')

                            : require('../media/images/account.png');

                    }
                    return (
                        <Image
                            source={iconName}
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Category" component={CategoryStack} />
            <Tab.Screen name="Cart" component={CartStack} />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Account" component={AccountStack} />
        </Tab.Navigator>


    );
}


export default HomeNavigation;
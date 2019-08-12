import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })
);

//createSwitchNavigator = navegação única vez, sem animação e sem voltar
//createStackNavigator = navegação entre telas com cabeçalho
//createBottomTabNavigator = cria navegação por abas inferior
//createMaterialTopNavigation = cria abas superiores estilo material (para IOS)
//createDrawerNavigator = cria menu lateral
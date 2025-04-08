import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import '@/global.css';

const pages = [
    {
        page:"Home",
        title:"Home",
        icon:"home",
        header:"Home",
    },
    {
      page:"add_post",
      title:"Add Story",
      icon:"add",
      header:"Add Post",
    },
    {
        page:"Video",
        title:"Videos",
        icon:"video-collection",
        header:"Videos",
    },
    {
        page:"Account",
        title:"Account",
        icon:"account-circle",
        header:"Account",
    },
]

export default function RootLayout() {
    return (
      
      <Tabs     
        screenOptions={{     
          tabBarActiveTintColor: '#000',    
          headerShown:true,  
          headerStyle:{backgroundColor:'#fff'}     
        }}
  
      >
        {
          pages.map((item,index)=>(
            <Tabs.Screen         
              key={item.page + index}
              name={item.page}
              options={{
                title: item.header,
                headerTitleAlign: 'left',
                tabBarIcon: ({color}) => <MaterialIcons size={28} name={item.icon} color={color}/>,
                tabBarShowLabel: pages.length > 5 ? false : true
              }}
            />
          ))
        }
      </Tabs>
  
     
    )
  }
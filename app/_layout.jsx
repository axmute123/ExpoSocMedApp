import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import '@/global.css';


export default function RootLayout() {
  return(
    <>
  <Stack>
    <Stack.Screen 
        name="index" 
        options={{ title:"Login"}} 
    />
    <Stack.Screen 
          name="add_post" 
          options={{ title: "Post" }}/>
    <Stack.Screen 
          name="update_post" 
          options={{ title: "Update_Post" }} />
    <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} />
  </Stack>
  <StatusBar style="auto" />
  </>
)};

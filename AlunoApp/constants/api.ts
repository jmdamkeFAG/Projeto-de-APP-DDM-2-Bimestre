import AsyncStorage from '@react-native-async-storage/async-storage';

//await AsyncStorage.setItem('API_IP', '10.0.2.2');

export const getApiUrl = async (): Promise<string> => {
  const storedIp = await AsyncStorage.getItem('API_IP');
  return `http://${storedIp}:3000`;
};
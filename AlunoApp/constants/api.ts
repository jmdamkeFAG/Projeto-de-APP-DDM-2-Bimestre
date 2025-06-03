import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiUrl = async (): Promise<string> => {
  const storedIp = await AsyncStorage.getItem('API_IP');
  return `http://${storedIp || '10.0.2.2'}:3000`;
};
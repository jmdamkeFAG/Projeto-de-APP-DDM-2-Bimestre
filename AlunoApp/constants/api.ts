import AsyncStorage from '@react-native-async-storage/async-storage';

export const getApiUrl = async (): Promise<string> => {
  const storedIp = await AsyncStorage.getItem('API_IP');
  const ipToUse = storedIp || '10.0.2.2';
  return `http://${ipToUse}:3000`;
};
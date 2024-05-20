import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageUtils {
    static async get<T>(key: string): Promise<T> {
        return await AsyncStorage.getItem(key) as T;
    }

    static async set(key: string, value: any): Promise<void> {
        await AsyncStorage.setItem(key, value);
    }

    static async remove(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    }
}

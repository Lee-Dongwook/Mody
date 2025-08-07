import AsyncStorage from '@react-native-async-storage/async-storage'

export const asyncAuthStorage = {
  getSession: async () => {
    const sessionString = await AsyncStorage.getItem('firebase-session')
    if (sessionString) {
      return JSON.parse(sessionString)
    }
    return null
  },

  removeSession: async () => {
    await AsyncStorage.removeItem('firebase-session')
  },
}

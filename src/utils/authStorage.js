import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken() {
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`,
    );

    return accessToken ? accessToken : null;
  }

  setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      accessToken,
    );
  }

  removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
  }
}

export default AuthStorage;

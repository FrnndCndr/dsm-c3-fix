import AppButton from "@/components/shared/AppButton";
import AppInput from "@/components/shared/AppInput";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <AppInput placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
      <AppInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
});
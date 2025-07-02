import AppButton from "@/components/shared/AppButton";
import AppInput from "@/components/shared/AppInput";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function SignupScreen() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    const { name, lastname, email, password } = form;

    if (!name || !lastname || !email || !password) {
      Alert.alert("Campos requeridos", "Todos los campos son obligatorios");
      return;
    }

    try {
      await register(form);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Register error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo registrar"
      );
    }
  };

  return (
    <View style={styles.container}>
      <AppInput
        placeholder="Nombre"
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
      />
      <AppInput
        placeholder="Apellido"
        value={form.lastname}
        onChangeText={(v) => handleChange("lastname", v)}
      />
      <AppInput
        placeholder="Correo electrónico"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <AppInput
        placeholder="Contraseña"
        value={form.password}
        onChangeText={(v) => handleChange("password", v)}
        secureTextEntry
      />
      <AppButton title="Crear cuenta" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
});
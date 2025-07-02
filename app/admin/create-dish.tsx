import { uploadImageToCloudinary } from "@/services/cloudinary";
import { createDish, DishPayload } from "@/services/DishService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function CreateDishScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState<DishPayload["category"]>("main course");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!name || !description || !price || !category || !ingredients || !imageUri) {
        return Alert.alert("Todos los campos son obligatorios");
      }

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return Alert.alert("No hay sesión activa");
      }

      const imageUrl = await uploadImageToCloudinary(imageUri);

      await createDish(
        {
          name,
          description,
          price: parseFloat(price),
          category,
          ingredients,
          image: imageUrl,
        },
        token
      );

      Alert.alert("Plato creado exitosamente");
      router.replace("/menu");
    } catch (error: any) {
      console.error("Error al crear plato:", error);
      Alert.alert("Error", error.message || "No se pudo crear el plato");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Nuevo Plato</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Ingredientes (separados por coma)"
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        placeholder="Precio"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Categoría (entree, main course, dessert, beverage, snack)"
        style={styles.input}
        value={category}
        onChangeText={(text) =>
          setCategory(text as DishPayload["category"])
        }
      />

      <Button title="Seleccionar Imagen" onPress={handlePickImage} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : null}

      <View style={{ marginTop: 20 }}>
        <Button title="Crear Plato" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flexGrow: 1 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

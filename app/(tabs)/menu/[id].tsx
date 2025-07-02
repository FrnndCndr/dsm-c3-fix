import { Dish, getDishById } from "@/services/DishService";
import { Button } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function DishDetailScreen() {
  const { id } = useLocalSearchParams();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDish = async () => {
      try {
        const result = await getDishById(Number(id));
        setDish(result);
      } catch (error) {
        console.error("Error al obtener el plato:", error);
        Alert.alert("Error", "No se pudo cargar el platillo");
      } finally {
        setLoading(false);
      }
    };
    fetchDish();
  }, [id]);

  if (loading) {
    return (
      <ScrollView contentContainerStyle={styles.centered}>
        <ActivityIndicator size="large" />
      </ScrollView>
    );
  }

  if (!dish) {
    return (
      <ScrollView contentContainerStyle={styles.centered}>
        <Text>Platillo no encontrado</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.image} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
      <Text style={styles.description}>{dish.description}</Text>

      {dish.ingredients && (
        <Text style={styles.ingredients}>
          Ingredients: {dish.ingredients}
        </Text>
      )}

      <Button
        onPress={() => alert("Platillo agregado al carrito")}
        color="#e74c3c"
      >
        Add to Cart
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "#e74c3c",
    marginVertical: 10,
  },
  description: {
    padding: 10,
    fontSize: 16,
  },
  ingredients: {
    padding: 10,
    fontSize: 16,
    marginVertical: 10,
    color: "#555",
    fontStyle: "italic",
  },
});

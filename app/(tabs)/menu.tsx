import { Dish, getAllDishes } from "@/services/DishService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES: Dish["category"][] = [
  "main course",
  "beverage",
  "dessert",
  "entree",
  "snack",
];

const CATEGORY_LABELS: Record<Dish["category"], string> = {
  "main course": "Platos Principales",
  beverage: "Bebidas",
  dessert: "Postres",
  entree: "Entradas",
  snack: "Snacks",
};

export default function MenuScreen() {
  const router = useRouter();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = async () => {
    try {
      const result = await getAllDishes();
      setDishes(result);
    } catch (error) {
      console.error("Error cargando platos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const renderItem = ({ item }: { item: Dish }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/menu/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}.00</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {CATEGORIES.map((category) => {
        const dishesInCategory = dishes.filter((d) => d.category === category);
        if (dishesInCategory.length === 0) return null;

        return (
          <View key={category}>
            <Text style={styles.header}>{CATEGORY_LABELS[category]}</Text>
            <FlatList
              data={dishesInCategory}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>
        );
      })}

      <View style={{ marginTop: 40 }}>
        <Button
          title="Crear nuevo plato"
          onPress={() => router.push("/admin/create-dish")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 15,
    alignSelf: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#cccccc",
    margin: 5,
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  image: {
    height: 100,
    width: 150,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: 5,
  },
});

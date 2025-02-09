import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Octicons } from "@expo/vector-icons";

interface Resep {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
}

const ResepDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Resep | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/recipes/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data);
          setRecipe(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setError("Failed to fetch recipe details.");
          setLoading(false);
        });
    } else {
      setError("Recipe ID is missing.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Octicons name="arrow-left" style={{ fontSize: 24 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Detail Resep</Text>
        </View>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        <View style={styles.views}>
          <Text style={styles.subTitle}>Bahan-bahan</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.subtitle}>
              • {ingredient}
            </Text>
          ))}
        </View>
        <View style={styles.views}>
          <Text style={styles.subTitle}>Cara pembuatan:</Text>
          {recipe.instructions.map((step, index) => (
            <Text key={index} style={styles.subtitle}>
              • {step}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 20,
  },
  description: {
    fontSize: 16,
    color: "gray",
  },
  header: {
    marginBottom: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    gap: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  views: {
    gap: 5,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 300,
    marginBottom: 8,
    color: "#b1b1b1"
  },
});

export default ResepDetailScreen;
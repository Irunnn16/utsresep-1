import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface Resep {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ResepScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Resep[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes))
      .catch((error) => console.error(error));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resep</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari resep"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {/* List Resep */}
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => alert(`Detail ${item.name}`)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
  },
});

export default ResepScreen;

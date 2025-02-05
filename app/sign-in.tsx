import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type LoginParams = {
  username: string;
  password: string;
};

type LoginResponse = {
  message: string;
};

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const loginUser = async ({ username, password }: LoginParams): Promise<LoginResponse> => {
  const response = await fetch("https://api.example.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error("Login gagal");
  }
  return response.json();
};

const SignInScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert("Login berhasil: " + data.message);
      navigation.navigate("Home");
    },
    onError: (error: unknown) => {
      const err = error as Error;
      alert(err.message || "Username atau password salah");
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Image source={require("../assets/sushi.png")} style={{ width: 150, height: 150 }} />
        </View>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Selamat Datang</Text>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>Silakan login untuk masuk ke akun Anda.</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 20 }}
        />
        <TouchableOpacity
          onPress={() => mutation.mutate({ username, password })}
          style={{ backgroundColor: "#FFA500", padding: 15, borderRadius: 5, alignItems: "center" }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

import { Link, Stack, useRouter } from "expo-router";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function Home() {
    const [ingredients, setIngredients] = useState([]);

    async function fetchIngredients() {
        const response = await api.getIngredients();
        setIngredients(response);
    }

    useEffect(() => {
        fetchIngredients();
    }, []);

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <Stack.Screen
                options={{
                    title: "WhatDrinkCanIDo",
                }}
            />
            <ThemedView>
                {ingredients ? (
                    ingredients.length > 0 ? (
                        <IngredientSelector ingredients={ingredients} />
                    ) : (
                        <ThemedText>No ingredients available</ThemedText>
                    )
                ) : (
                    <ThemedText>No ingredients available</ThemedText>
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
}

interface Ingredient {
    name: string;
}

interface IngredientSelectorProps {
    ingredients: Ingredient[];
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
    ingredients,
}) => {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        []
    );

    const toggleIngredient = (ingredientName: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredientName)
                ? prev.filter((name) => name !== ingredientName)
                : [...prev, ingredientName]
        );
    };
    const router = useRouter();
    return (
        <ThemedView style={{ flex: 1, flexDirection: "column" }}>
            {ingredients && ingredients.length > 0 ? (
                ingredients.map((item, index) => (
                    <ThemedView
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 10,
                            padding: 5,
                        }}
                        onTouchEnd={() => {
                            toggleIngredient(item.name);
                        }}
                    >
                        <Checkbox
                            value={selectedIngredients.includes(item.name)}
                        />
                        <ThemedText style={{ paddingHorizontal: 10 }}>
                            {item.name}
                        </ThemedText>
                    </ThemedView>
                ))
            ) : (
                <ThemedText>No ingredients available</ThemedText>
            )}
            <TouchableOpacity
                onPress={() => {
                    if (selectedIngredients.length > 0) {
                        router.push({
                            pathname: "/searchResult",
                            params: { ingredients: selectedIngredients },
                        });
                    }
                }}
            >
                <ThemedView
                    style={{
                        marginTop: 20,
                        alignContent: "center",
                        borderColor: "#fff",
                        borderRadius: 5,
                        borderWidth: 1,
                        padding: 20,
                    }}
                >
                    <ThemedText
                        style={[
                            {
                                textAlign: "center",
                                fontSize: 24,
                            },
                        ]}
                    >
                        Search
                    </ThemedText>
                </ThemedView>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    card: {
        marginTop: 5,
        marginHorizontal: 5,
        padding: 10,
    },
});

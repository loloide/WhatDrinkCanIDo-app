import { Link, Stack, useRouter } from "expo-router";
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Button,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function home() {
    const [ingredients, setIngredients] = useState([]);
    const [text, onChangeText] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [featureDrink, setFeatureDrink] = useState(null);

    async function fetchIngredients() {
        const response = await api.getIngredients();
        setIngredients(response);
    }

    async function fetchFeatureDrink() {
        const response = await api.getRandomDrink();
        setFeatureDrink(response);
    }

    useEffect(() => {
        fetchIngredients();
        fetchFeatureDrink();

        const interval = setInterval(() => {
            fetchFeatureDrink();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function filterIngredients(query: string) {
        if (!query) return ingredients;

        const lowerCaseQuery = String(query).toLowerCase();

        return ingredients.filter(
            (ingredient) =>
                ingredient.name &&
                ingredient.name.toLowerCase().includes(lowerCaseQuery)
        );
    }


    const router = useRouter();
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={featureDrink ? (
                        <TouchableOpacity
                            onPress={() => {
                                router.push({
                                    pathname: "/drinkDetail",
                                    params: { drink: featureDrink.id },
                                });
                            }}
                        >
                            <Image
                                source={{
                                    uri: api.getImageUrl(featureDrink.image),
                                }}
                                style={styles.reactLogo}
                            />
                            <Text
                                style={{
                                    position: "absolute",
                                    textAlign: "right",
                                    right: 0,
                                    bottom: 0,
                                    mix: "substract",
                                    fontSize: 24,
                                    padding: 10,
                                    backgroundColor: "#fff",
                                    borderTopLeftRadius: 5,
                                }}
                            >
                                {featureDrink.name}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        require("@/assets/images/partial-react-logo.png")
                    )}
        >
            <Stack.Screen
                options={{
                    title: "WhatDrinkCanIDo",
                }}
            />
            <ThemedText style={{ fontSize: 24 }}>
                Busca una bebida que quieras hacer
            </ThemedText>
            <ThemedView
                style={{ flexDirection: "row", justifyContent: "center" }}
            >
                <TextInput
                    style={[
                        styles.input,
                        {
                            flex: 1,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                        },
                    ]}
                    onChangeText={setNameSearch}
                    value={nameSearch}
                    placeholder="Busca una bebida"
                    placeholderTextColor={"#808080"}
                />
                <Ionicons
                    style={{
                        borderWidth: 1,
                        padding: 1,
                        borderColor: useThemeColor({}, "text"),
                        borderRadius: 5,
                        backgroundColor: useThemeColor({}, "text"),
                        borderBottomLeftRadius: 0,
                        borderTopLeftRadius: 0,
                    }}
                    name="search"
                    color={useThemeColor({}, "background")}
                    size={32}
                    onPress={() => {
                        router.push({
                            pathname: "/nameSearchResult",
                            params: { name: nameSearch },
                        });
                    }}
                />
            </ThemedView>

            <ThemedText style={{ fontSize: 24 }}>
                O selecciona los ingredientes que tengas a disposición
            </ThemedText>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Buscar Ingredientes"
                placeholderTextColor={"#808080"}
            />
            <ThemedView>
                {ingredients ? (
                    ingredients.length > 0 ? (
                        <IngredientSelector
                            ingredients={filterIngredients(text)}
                        />
                    ) : (
                        <ThemedText>No ingredients available</ThemedText>
                    )
                ) : (
                    <ActivityIndicator size="large" />
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
                            pathname: "/ingredientSearchResult",
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
                        Buscar
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
        height: 250,
        width: "auto",
        bottom: 0,
        left: 0,
    },
    card: {
        marginTop: 5,
        marginHorizontal: 5,
        padding: 10,
    },
    input: {
        color: "white",
        borderWidth: 1,
        padding: 10,
        borderColor: "white",
        borderRadius: 5,
    },
});

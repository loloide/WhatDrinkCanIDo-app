import { Stack, useLocalSearchParams, useRouter, Link } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { useThemeColor } from "@/hooks/useThemeColor";
import { routeToScreen } from "expo-router/build/useScreens";

export default function IngredientSearchResults() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [drinks, setDrinks] = useState([]);

    async function fetchDrinks() {
        const response = await api.searchDrinksByIngreditents(
            params.ingredients
        );
        setDrinks(response);
    }

    useEffect(() => {
        fetchDrinks();
    }, []);

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Search with ingredients",
                }}
            />
            <ScrollView
                style={{
                    backgroundColor: useThemeColor({}, "background"),
                    flex: 1,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {drinks ? (
                    drinks.length > 0 ? (
                        drinks.map((item, index) => (
                            <DrinkCard key={index} drink={item} />
                        ))
                    ) : (
                        <ThemedView
                            style={{
                                justifyContent: "center",
                                margin: 30,
                            }}
                        >
                            <Image
                                style={[styles.image]}
                                source={require("../assets/images/404.png")}
                                alt="Drink image"
                                resizeMode="cover"
                            />
                            <ThemedText
                                style={{ textAlign: "center" }}
                                type="subtitle"
                            >
                                Sorry, I couldn't find any drinks with those
                                ingredients
                            </ThemedText>
                        </ThemedView>
                    )
                ) : (
                    <ActivityIndicator style={{ marginTop: 10 }} size="large" />
                )}
            </ScrollView>
        </ThemedView>
    );
}
interface Drink {
    id: string;
    name: string;
    desc: string;
}

function DrinkCard({ drink }: DrinkCardProps) {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: "/drinkDetail",
                    params: { drink: drink[""] },
                });
            }}
        >
            <ThemedView style={styles.card}>
                <ThemedText type="title">{drink.strDrink}</ThemedText>
                <ThemedText type="default" numberOfLines={3}>
                    {drink.strInstructions}
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        //alignItems: "center",
    },
    card: {
        marginTop: 5,
        marginHorizontal: 5,
        padding: 10,
        borderColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
    },
    image: {
        alignSelf: "center",
        flex: 1,
        width: "100%",
        height: 300,
    },
});

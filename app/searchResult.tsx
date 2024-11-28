import { Stack, useLocalSearchParams, useRouter, Link } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useThemeColor } from "@/hooks/useThemeColor";
import { routeToScreen } from "expo-router/build/useScreens";

export default function SearchResults() {
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
        <ScrollView
            style={{
                backgroundColor: useThemeColor({}, "background"),
                paddingBottom: 50,
            }}
        >
            <ThemedView style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "Drinks with",
                    }}
                />
                {drinks && drinks.length > 0 ? (
                    drinks.map((item, index) => (
                        <DrinkCard key={index} drink={item} />
                    ))
                ) : (
                    <ThemedText>No drinks available</ThemedText>
                )}
            </ThemedView>
        </ScrollView>
    );
}
interface Drink {
    id: string;
    name: string;
    desc: string;
}
interface DrinkCardProps {
    drink: Drink;
}

function DrinkCard({ drink }: DrinkCardProps) {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: "/drinkDetail",
                    params: { drink: drink.id },
                });
            }}
        >
            <ThemedView style={styles.card}>
                <ThemedText style={{ fontSize: 32, paddingTop: 10 }}>
                    {drink.name}
                </ThemedText>
                <ThemedText numberOfLines={3}>{drink.desc}</ThemedText>
            </ThemedView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingBottom: 50,
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
});

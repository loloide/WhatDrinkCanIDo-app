import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Drink {
    id: string;
    name: string;
    desc: string;
}

export default function DrinkDetail() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [drink, setDrink] = useState<Drink | null>(null);

    async function fetchDrink() {
        const response = await api.getDrinkInfo(params.drink as string); // Ensure params.drink is typed correctly
        setDrink(response);
    }

    useEffect(() => {
        fetchDrink();
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
                        title: "Details",
                    }}
                />
                {drink ? (
                    <ThemedView>
                        <ThemedText
                            style={{
                                textAlign: "center",
                                fontSize: 48,
                                paddingTop: 24,
                            }}
                        >
                            {drink.name}
                        </ThemedText>

                        <ThemedText style={{ marginTop: 40 }}>
                            {drink.desc}
                        </ThemedText>
                    </ThemedView>
                ) : (
                    <ThemedText>No drinks available</ThemedText>
                )}
            </ThemedView>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingBottom: 50,

        padding: 10,
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

import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Drink {
    image: any;
    id: string;
    name: string;
    desc: string;
}

export default function DrinkDetail() {
    const params = useLocalSearchParams();

    const [drink, setDrink] = useState<Drink | null>(null);
    const [drinkImage, setDrinkImage] = useState("");

    async function fetchDrink() {
        const response = await api.getDrinkInfo(params.drink as string);
        if (response.image) {
            var imageUrl = api.getImageUrl(response.image);
            setDrinkImage(imageUrl);
        }
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
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <ThemedView style={styles.container}>
                <Stack.Screen
                    options={{
                        title: "Details",
                    }}
                />
                {drink ? (
                    <ThemedView>
                        <ThemedText  style={[styles.title, styles.titleImage]}>
                            {drink.name}
                        </ThemedText>

                        <ThemedText style={[styles.titleImage]}>
                            {drink.desc}
                        </ThemedText>

                        {drink.image ? (
                            <Image
                                style={[styles.image, styles.titleImage]}
                                source={{
                                    uri: drinkImage,
                                }}
                                alt="asd"
                                resizeMode="cover"
                            />
                        ) : null}
                    </ThemedView>
                ) : (
                    <ThemedText>No drinks available</ThemedText>
                )}
            </ThemedView>
        </ScrollView>
    );
}

const radius = 5;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingBottom: 50,

        padding: 10,
        //alignItems: "center",
    },
    image: {
        alignSelf: "center",
        flex: 1,
        width: "100%",
        height: 400,
    },
    title: {
        //textAlign: "center",
        fontSize: 36,
        paddingTop: 18,
        paddingBottom: 0,
    },
    titleImage: {
        borderRadius: radius,
        borderColor: "white",
        borderWidth: 2,
        marginBottom: 10,
        padding: radius,
    },
});

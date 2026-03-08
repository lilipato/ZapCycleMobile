import React from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

export default function CustomButton({ title, onPress, style, textStyle, ...props }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[tw`w-full bg-green-500 py-4 rounded-full shadow-md items-center`, style]}
            activeOpacity={0.8}
            {...props}
        >
            <Text style={[tw`text-white font-semibold text-lg`, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

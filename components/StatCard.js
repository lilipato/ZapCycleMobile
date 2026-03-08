import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

export default function StatCard({ iconName, label, value, change, positive, colorClass }) {
    return (
        <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex-row items-center mb-4`}>
            <View style={tw`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClass}`}>
                <Feather name={iconName} size={26} color="white" />
            </View>
            <View style={tw`flex-1 ml-4`}>
                <Text style={tw`text-gray-500 text-sm font-medium`}>{label}</Text>
                <Text style={tw`text-2xl font-bold text-gray-900 mt-0.5`}>{value}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
                <Feather name={positive ? "chevron-up" : "chevron-down"} size={16} color={positive ? "#22c55e" : "#f87171"} />
                <Text style={tw`text-sm font-semibold ml-1 ${positive ? "text-green-500" : "text-red-400"}`}>
                    {change}
                </Text>
            </View>
        </View>
    );
}

import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Alert } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("");
    const [notifications, setNotifications] = useState(true);
    const [saveMessage, setSaveMessage] = useState("");

    const handleSave = () => {
        setSaveMessage("Settings saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
            <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
                {/* Top Bar */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-2xl font-bold text-gray-900`}>Settings</Text>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>Manage your account and preferences.</Text>
                </View>

                {/* Profile Info */}
                <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6`}>
                    <Text style={tw`text-lg font-bold text-gray-900 mb-5`}>Profile Info</Text>

                    <View style={tw`mb-4`}>
                        <Text style={tw`text-gray-500 text-sm font-medium mb-2`}>Email</Text>
                        <View style={tw`flex-row items-center border border-gray-200 bg-gray-50 rounded-xl px-4 py-3`}>
                            <Feather name="mail" size={18} color="#9ca3af" style={tw`mr-3`} />
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                style={tw`flex-1 text-gray-700 text-base`}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={tw`text-gray-500 text-sm font-medium mb-2`}>Password</Text>
                        <View style={tw`flex-row items-center border border-gray-200 bg-gray-50 rounded-xl px-4 py-3`}>
                            <Feather name="lock" size={18} color="#9ca3af" style={tw`mr-3`} />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholder="********"
                                placeholderTextColor="#9ca3af"
                                style={tw`flex-1 text-gray-700 text-base`}
                            />
                        </View>
                    </View>
                </View>

                {/* Account Settings */}
                <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6`}>
                    <Text style={tw`text-lg font-bold text-gray-900 mb-5`}>Account Settings</Text>
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center`}>
                            <Feather name="bell" size={20} color="#6b7280" style={tw`mr-3`} />
                            <Text style={tw`text-gray-700 font-medium text-base`}>Enable email notifications</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setNotifications(!notifications)}
                            style={[tw`w-12 h-6 rounded-full justify-center px-1`, notifications ? tw`bg-green-500 items-end` : tw`bg-gray-300 items-start`]}
                        >
                            <View style={tw`w-5 h-5 bg-white rounded-full`} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Preferences */}
                <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8`}>
                    <Text style={tw`text-lg font-bold text-gray-900 mb-5`}>Preferences</Text>
                    <TouchableOpacity style={tw`flex-row items-center justify-center bg-purple-500 rounded-xl py-3.5`}>
                        <Feather name="settings" size={18} color="white" style={tw`mr-2`} />
                        <Text style={tw`text-white font-semibold text-base`}>Manage Integrations</Text>
                    </TouchableOpacity>
                </View>

                {/* Success Message */}
                {saveMessage !== "" && (
                    <View style={tw`bg-green-100 p-3 rounded-xl mb-4 flex-row items-center border border-green-200`}>
                        <Feather name="check-circle" size={18} color="#16a34a" style={tw`mr-2`} />
                        <Text style={tw`text-green-700 font-medium`}>{saveMessage}</Text>
                    </View>
                )}

                {/* Save Button */}
                <TouchableOpacity
                    onPress={handleSave}
                    style={tw`bg-green-500 py-4 rounded-xl items-center shadow-md mb-4`}
                >
                    <Text style={tw`text-white font-bold text-lg`}>Save Changes</Text>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
                    style={tw`bg-white py-4 rounded-xl items-center shadow-sm border border-red-100 flex-row justify-center`}
                >
                    <Feather name="log-out" size={18} color="#ef4444" style={tw`mr-2`} />
                    <Text style={tw`text-red-500 font-bold text-lg`}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

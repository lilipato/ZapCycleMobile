import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";
import CustomButton from "../components/CustomButton";

export default function SignUpScreen({ navigation }) {
    const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
        setError("");
    };

    const handleSubmit = () => {
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        console.log("Sign Up:", form);
        navigation.navigate("Main");
    };

    return (
        <KeyboardAvoidingView style={tw`flex-1 bg-gray-50`} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={tw`flex-grow justify-center px-4 py-16`} keyboardShouldPersistTaps="handled">

                    <View style={tw`mb-4 flex flex-col items-center`}>
                        <Image source={require("../assets/zapcycle_logo.png")} style={tw`w-64 h-50`} resizeMode="contain" />
                    </View>

                    <View style={tw`w-full max-w-md bg-white rounded-3xl shadow-xl px-6 py-8 self-center`}>
                        <View style={tw`mb-8`}>
                            <Text style={tw`text-2xl font-bold text-gray-800`}>Create Account</Text>
                            <Text style={tw`text-gray-500 text-base mt-1`}>Join the cycle today.</Text>
                        </View>

                        <View style={tw`flex flex-col`}>
                            {/* Full Name */}
                            <View style={tw`relative flex-row items-center border border-gray-200 rounded-2xl bg-white mb-4`}>
                                <View style={tw`absolute left-4 z-10`}><Feather name="user" size={20} color="#9ca3af" /></View>
                                <TextInput
                                    placeholder="Full Name" placeholderTextColor="#9ca3af"
                                    value={form.fullName} onChangeText={(v) => handleChange("fullName", v)}
                                    style={tw`flex-1 py-3.5 pl-11 pr-4 text-gray-800 text-base`}
                                />
                            </View>

                            {/* Email Address */}
                            <View style={tw`relative flex-row items-center border border-gray-200 rounded-2xl bg-white mb-4`}>
                                <View style={tw`absolute left-4 z-10`}><Feather name="mail" size={20} color="#9ca3af" /></View>
                                <TextInput
                                    placeholder="Email Address" placeholderTextColor="#9ca3af"
                                    value={form.email} onChangeText={(v) => handleChange("email", v)}
                                    keyboardType="email-address" autoCapitalize="none"
                                    style={tw`flex-1 py-3.5 pl-11 pr-4 text-gray-800 text-base`}
                                />
                            </View>

                            {/* Phone */}
                            <View style={tw`relative flex-row items-center border border-gray-200 rounded-2xl bg-white mb-4`}>
                                <View style={tw`absolute left-4 z-10`}><Feather name="phone" size={20} color="#9ca3af" /></View>
                                <TextInput
                                    placeholder="Phone Number" placeholderTextColor="#9ca3af"
                                    value={form.phone} onChangeText={(v) => handleChange("phone", v)}
                                    keyboardType="phone-pad"
                                    style={tw`flex-1 py-3.5 pl-11 pr-4 text-gray-800 text-base`}
                                />
                            </View>

                            {/* Password */}
                            <View style={tw`relative flex-row items-center border border-gray-200 rounded-2xl bg-white mb-4`}>
                                <View style={tw`absolute left-4 z-10`}><Feather name="lock" size={20} color="#9ca3af" /></View>
                                <TextInput
                                    placeholder="Password" placeholderTextColor="#9ca3af"
                                    value={form.password} onChangeText={(v) => handleChange("password", v)}
                                    secureTextEntry={!showPassword}
                                    style={tw`flex-1 py-3.5 pl-11 pr-12 text-gray-800 text-base`}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={tw`absolute right-4 z-10`}>
                                    <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#9ca3af" />
                                </TouchableOpacity>
                            </View>

                            {/* Confirm Password */}
                            <View style={tw`relative flex-row items-center border border-gray-200 rounded-2xl bg-white mb-2`}>
                                <View style={tw`absolute left-4 z-10`}><Feather name="lock" size={20} color="#9ca3af" /></View>
                                <TextInput
                                    placeholder="Confirm Password" placeholderTextColor="#9ca3af"
                                    value={form.confirmPassword} onChangeText={(v) => handleChange("confirmPassword", v)}
                                    secureTextEntry={!showConfirm}
                                    style={tw`flex-1 py-3.5 pl-11 pr-12 text-gray-800 text-base`}
                                />
                                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={tw`absolute right-4 z-10`}>
                                    <Feather name={showConfirm ? "eye-off" : "eye"} size={20} color="#9ca3af" />
                                </TouchableOpacity>
                            </View>

                            {error ? <Text style={tw`text-red-500 text-sm text-center mt-2`}>{error}</Text> : null}

                            <CustomButton title="Create Account" onPress={handleSubmit} style={tw`mt-6 mb-4`} />

                            <View style={tw`flex-row justify-center mt-2`}>
                                <Text style={tw`text-gray-500 text-base mr-1`}>Already have an account?</Text>
                                <TouchableOpacity onPress={() => navigation?.navigate?.("Login")}>
                                    <Text style={tw`text-green-600 font-semibold text-base`}>Sign In</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

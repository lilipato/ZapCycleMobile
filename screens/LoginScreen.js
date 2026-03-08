import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setErrorMessage("");
    console.log("Login submitted:", { email, password });
    navigation.navigate("Main");
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-gray-50`}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={tw`flex-grow justify-center px-4 py-10`}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo above the card */}
          <View style={tw`mb-2 flex flex-col items-center`}>
            <Image
              source={require("../assets/zapcycle_logo.png")}
              style={tw`w-64 h-50`}
              resizeMode="contain"
            />
          </View>

          {/* Login Card */}
          <View style={tw`w-full max-w-md min-h-[480px] bg-white rounded-3xl shadow-xl px-8 py-10 self-center`}>
            {/* Heading */}
            <View style={tw`mb-8`}>
              <Text style={tw`text-2xl font-bold text-gray-800`}>Welcome Back</Text>
              <Text style={tw`text-gray-500 text-base mt-1`}>
                Sign in to keep the cycle going.
              </Text>
            </View>

            <View style={tw`flex flex-col`}>
              {/* Error Message */}
              {errorMessage !== "" && (
                <View style={tw`bg-red-50 p-3 rounded-xl mb-4 border border-red-100 flex-row items-center`}>
                  <Feather name="alert-circle" size={16} color="#ef4444" style={tw`mr-2`} />
                  <Text style={tw`text-red-600 text-sm font-medium`}>{errorMessage}</Text>
                </View>
              )}

              {/* Email Input */}
              <View style={tw`relative flex-row items-center border border-gray-200 rounded-2xl bg-white mb-4`}>
                <View style={tw`absolute left-4 z-10`}>
                  <Feather name="mail" size={20} color="#9ca3af" />
                </View>
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={tw`flex-1 py-3.5 pl-11 pr-4 text-gray-800 text-base`}
                />
              </View>

              {/* Password Input */}
              <View style={tw`relative flex-row items-center border border-gray-200 rounded-2xl bg-white mb-2`}>
                <View style={tw`absolute left-4 z-10`}>
                  <Feather name="lock" size={20} color="#9ca3af" />
                </View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={tw`flex-1 py-3.5 pl-11 pr-12 text-gray-800 text-base`}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={tw`absolute right-4 z-10`}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <View style={tw`items-end mb-6`}>
                <TouchableOpacity>
                  <Text style={tw`text-green-600 font-medium text-base`}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign In Button */}
              <CustomButton
                title="Sign In"
                onPress={handleSubmit}
                style={tw`mb-4 mt-2`}
              />

              {/* Sign Up Link */}
              <View style={tw`flex-row justify-center`}>
                <Text style={tw`text-gray-500 text-base mr-1`}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={tw`text-green-600 font-semibold text-base`}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

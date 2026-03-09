import React from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";
import tw from "twrnc";

/**
 * A reusable confirmation modal for dangerous or sensitive actions.
 * @param {boolean} isOpen - Whether the modal is visible.
 * @param {function} onClose - Function to call when user cancels.
 * @param {function} onConfirm - Function to call when user confirms.
 * @param {string} title - The title of the modal.
 * @param {string} message - The description text.
 * @param {string} confirmText - Text for the confirm button.
 * @param {'danger' | 'warning' | 'success' | 'info'} type - Visual style.
 * @param {string} iconName - Optional Feather icon name.
 */
const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    type = "danger",
    iconName
}) => {
    if (!isOpen) return null;

    const typeStyles = {
        danger: {
            bg: "bg-red-50",
            iconColor: "#dc2626", // text-red-600
            button: "bg-red-500",
            defaultIcon: "trash-2"
        },
        warning: {
            bg: "bg-orange-50",
            iconColor: "#ea580c", // text-orange-600
            button: "bg-orange-500",
            defaultIcon: "alert-triangle"
        },
        success: {
            bg: "bg-green-50",
            iconColor: "#16a34a", // text-green-600
            button: "bg-[#37B26C]",
            defaultIcon: "check-circle"
        },
        info: {
            bg: "bg-blue-50",
            iconColor: "#2563eb", // text-blue-600
            button: "bg-blue-500",
            defaultIcon: "shield"
        }
    };

    const style = typeStyles[type];
    const iconToUse = iconName || style.defaultIcon;

    return (
        <Modal
            transparent={true}
            visible={isOpen}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={tw`flex-1 justify-center items-center bg-black/60 px-4`}>
                    <TouchableWithoutFeedback>
                        <View style={tw`bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden p-8 items-center`}>
                            {/* Close Button */}
                            <TouchableOpacity
                                onPress={onClose}
                                style={tw`absolute top-6 right-6 p-2 rounded-full`}
                            >
                                <Feather name="x" size={20} color="#9ca3af" />
                            </TouchableOpacity>

                            {/* Icon */}
                            <View style={tw`${style.bg} w-16 h-16 rounded-2xl items-center justify-center mb-6`}>
                                <Feather name={iconToUse} size={28} color={style.iconColor} />
                            </View>

                            <Text style={tw`text-xl font-bold text-gray-900 mb-2 text-center`}>{title}</Text>
                            <Text style={tw`text-gray-500 text-sm leading-relaxed mb-8 px-2 text-center`}>{message}</Text>

                            <View style={tw`flex-row w-full`}>
                                <TouchableOpacity
                                    onPress={onClose}
                                    style={tw`flex-1 px-6 py-4 rounded-2xl border border-gray-100 items-center justify-center mr-3`}
                                >
                                    <Text style={tw`text-sm font-bold text-gray-500`}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onConfirm}
                                    style={tw`flex-1 px-6 py-4 rounded-2xl ${style.button} items-center justify-center shadow-md`}
                                >
                                    <Text style={tw`text-sm font-bold text-white`}>{confirmText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ConfirmationModal;

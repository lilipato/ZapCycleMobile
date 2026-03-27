import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Modal, KeyboardAvoidingView, Platform } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import ConfirmationModal from "../components/ConfirmationModal";

const initialCollectors = [
    { id: "COL-001", name: "RecyclePros Inc.", business: "Green Waste Solutions", contact: "+63 912 888 7777", pickups: 156, status: "active", joined: "Dec 10, 2024", verified: true },
    { id: "COL-002", name: "EcoPick Services", business: "EcoPick Ltd.", contact: "+63 917 555 4444", pickups: 89, status: "pending", joined: "Jan 05, 2025", verified: false },
    { id: "COL-003", name: "Metro E-Waste", business: "Metro Junkshops", contact: "+63 918 222 1111", pickups: 210, status: "active", joined: "Nov 22, 2024", verified: true },
    { id: "COL-004", name: "Junkyard Heroes", business: "Heroes Collect", contact: "+63 919 999 0000", pickups: 42, status: "inactive", joined: "Feb 15, 2025", verified: false },
];

export default function CollectorsScreen({ navigation }) {
    const [collectors, setCollectors] = useState(initialCollectors);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Modals & Action State
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Data States
    const [activeCollector, setActiveCollector] = useState(null);
    const [formData, setFormData] = useState({ name: "", business: "", contact: "", status: "active" });
    const [confirmAction, setConfirmAction] = useState({ type: '', id: '', title: '', message: '' });

    const handleEditSubmit = () => {
        setCollectors(collectors.map(c => (c.id === activeCollector.id ? { ...c, ...formData } : c)));
        setShowEditModal(false);
        setActiveCollector(null);
    };

    const startEdit = (collector) => {
        setActiveCollector(collector);
        setFormData({ name: collector.name, business: collector.business, contact: collector.contact, status: collector.status });
        setShowEditModal(true);
    };

    const confirmDelete = (id, business) => {
        setConfirmAction({
            type: 'delete',
            id,
            title: 'Remove Collector',
            message: `Are you sure you want to remove ${business}? All associated pickup data will be archived.`
        });
        setShowConfirmModal(true);
    };

    const confirmToggleStatus = (col) => {
        const isSuspending = col.status === 'active';
        setConfirmAction({
            type: 'status',
            id: col.id,
            title: isSuspending ? 'Suspend Collector' : 'Activate Collector',
            message: `This will ${isSuspending ? 'prevent' : 'allow'} ${col.business} from accepting new pickup requests.`
        });
        setShowConfirmModal(true);
    };

    const handleConfirmAction = () => {
        if (confirmAction.type === 'delete') {
            setCollectors(collectors.filter(c => c.id !== confirmAction.id));
        } else if (confirmAction.type === 'status') {
            setCollectors(collectors.map(c =>
                c.id === confirmAction.id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
            ));
        }
        setShowConfirmModal(false);
    };

    const getBadgeStyle = (status) => {
        switch (status) {
            case "active": return tw`bg-green-100 text-green-700`;
            case "inactive": return tw`bg-red-100 text-red-700`;
            case "pending": return tw`bg-yellow-100 text-yellow-700`;
            default: return tw`bg-gray-100 text-gray-600`;
        }
    };

    const renderCollectorCard = ({ item }) => (
        <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4`}>
            <View style={tw`flex-row justify-between items-start mb-2`}>
                <View style={tw`flex-1 pr-2`}>
                    <View style={tw`flex-row items-center`}>
                        <Text style={tw`text-base font-bold text-gray-900`}>{item.name}</Text>
                        {item.verified && <Feather name="shield" size={14} color="#3b82f6" style={tw`ml-1.5`} />}
                    </View>
                    <Text style={tw`text-xs text-gray-500 font-medium`}>{item.business}</Text>
                </View>
                <View style={[tw`px-2.5 py-1 rounded-full`, getBadgeStyle(item.status)]}>
                    <Text style={[
                        tw`text-[10px] font-bold uppercase`,
                        item.status === 'active' ? tw`text-green-700` : item.status === 'inactive' ? tw`text-red-700` : tw`text-yellow-700`
                    ]}>{item.status}</Text>
                </View>
            </View>

            <View style={tw`mt-2`}>
                <View style={tw`flex-row items-center mb-1`}>
                    <Feather name="phone" size={12} color="#9ca3af" style={tw`mr-1.5`} />
                    <Text style={tw`text-sm text-gray-600`}>{item.contact}</Text>
                </View>
            </View>

            <View style={tw`flex-row justify-between items-center mt-3 pt-3 border-t border-gray-50`}>
                <View style={tw`flex-row items-baseline`}>
                    <Text style={tw`font-bold text-gray-800 text-sm`}>{item.pickups}</Text>
                    <Text style={tw`text-xs text-gray-500 ml-1`}>pickups</Text>
                </View>

                <View style={tw`flex-row items-center`}>
                    <TouchableOpacity
                        onPress={() => startEdit(item)}
                        style={tw`p-2 bg-gray-50 rounded-lg mr-2 border border-gray-100 items-center justify-center`}
                    >
                        <Feather name="edit-2" size={14} color="#4b5563" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => confirmToggleStatus(item)}
                        style={tw`p-2 bg-gray-50 rounded-lg mr-2 border border-gray-100 items-center justify-center`}
                    >
                        <Feather name={item.status === 'active' ? "shield-off" : "shield"} size={14} color={item.status === 'active' ? "#ea580c" : "#16a34a"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => confirmDelete(item.id, item.business)}
                        style={tw`p-2 bg-red-50 rounded-lg border border-red-100 items-center justify-center`}
                    >
                        <Feather name="trash-2" size={14} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const filteredCollectors = collectors.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.business.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || c.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
            <View style={tw`px-6 pt-6 pb-2`}>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-2xl font-bold text-gray-900`}>Collectors</Text>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>Manage partners and junkshops</Text>
                </View>

                {/* Search Bar */}
                <View style={tw`flex-row items-center mb-4 mt-2`}>
                    <View style={tw`flex-1 relative flex-row items-center border border-gray-200 rounded-xl bg-white`}>
                        <View style={tw`absolute left-3 z-10`}>
                            <Feather name="search" size={18} color="#9ca3af" />
                        </View>
                        <TextInput
                            placeholder="Search business or name..."
                            placeholderTextColor="#9ca3af"
                            value={search}
                            onChangeText={setSearch}
                            style={tw`flex-1 py-3 pl-10 pr-4 text-gray-800 text-sm`}
                        />
                    </View>
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`pb-4`}>
                    {[
                        { id: "all", label: "All Status" },
                        { id: "active", label: "Active" },
                        { id: "pending", label: "Pending" },
                        { id: "inactive", label: "Suspended" },
                    ].map(f => (
                        <TouchableOpacity
                            key={f.id}
                            onPress={() => setFilterStatus(f.id)}
                            style={[
                                tw`px-4 py-2 rounded-full border mr-2`,
                                filterStatus === f.id ? tw`bg-green-500 border-green-500` : tw`bg-white border-gray-200`
                            ]}
                        >
                            <Text style={filterStatus === f.id ? tw`text-white font-semibold text-sm` : tw`text-gray-600 font-medium text-sm`}>
                                {f.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredCollectors}
                keyExtractor={(item) => item.id}
                renderItem={renderCollectorCard}
                contentContainerStyle={tw`px-6 pb-20`}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={tw`py-10 items-center justify-center`}>
                        <Feather name="inbox" size={40} color="#d1d5db" style={tw`mb-3`} />
                        <Text style={tw`text-gray-400 text-sm`}>No collectors found.</Text>
                    </View>
                )}
            />

            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmAction}
                title={confirmAction.title}
                message={confirmAction.message}
                type={confirmAction.type === 'delete' ? 'danger' : 'warning'}
                confirmText={confirmAction.type === 'delete' ? 'Delete' : (confirmAction.title.includes('Suspend') ? 'Suspend' : 'Activate')}
                iconName={confirmAction.type === 'delete' ? 'trash-2' : 'shield'}
            />

            {/* Edit Modal */}
            <Modal transparent={true} visible={showEditModal} animationType="slide">
                <KeyboardAvoidingView
                    style={tw`flex-1 justify-end`}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                >
                    <View style={tw`flex-1 justify-end bg-black/50`}>
                        <View style={tw`bg-white rounded-t-3xl p-6 shadow-xl w-full`}>
                            <View style={tw`flex-row justify-between items-center mb-5`}>
                                <Text style={tw`text-xl font-bold text-gray-900`}>Update Collector</Text>
                                <TouchableOpacity onPress={() => setShowEditModal(false)} style={tw`p-2 rounded-full bg-gray-100`}>
                                    <Feather name="x" size={20} color="#6b7280" />
                                </TouchableOpacity>
                            </View>

                            <View style={tw`space-y-4`}>
                                <View>
                                    <Text style={tw`text-xs font-bold text-gray-400 uppercase ml-1 mb-1`}>Contact Person</Text>
                                    <TextInput
                                        value={formData.name}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                                        style={tw`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-base`}
                                        returnKeyType="next"
                                    />
                                </View>
                                <View style={tw`mt-4`}>
                                    <Text style={tw`text-xs font-bold text-gray-400 uppercase ml-1 mb-1`}>Business Name</Text>
                                    <TextInput
                                        value={formData.business}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, business: text }))}
                                        style={tw`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-base`}
                                        returnKeyType="next"
                                    />
                                </View>
                                <View style={tw`mt-4`}>
                                    <Text style={tw`text-xs font-bold text-gray-400 uppercase ml-1 mb-1`}>Contact Number</Text>
                                    <TextInput
                                        value={formData.contact}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, contact: text }))}
                                        style={tw`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-base`}
                                        keyboardType="phone-pad"
                                        returnKeyType="done"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleEditSubmit}
                                style={tw`w-full bg-green-500 py-4 items-center rounded-xl mt-6 mb-4 shadow-md`}
                            >
                                <Text style={tw`text-white font-bold text-base`}>Update Information</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
}

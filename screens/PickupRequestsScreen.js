import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, Modal } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import ConfirmationModal from "../components/ConfirmationModal";

const initialRequests = [
    { id: "REQ-001", user: "Maria Santos", collector: "RecyclePros Inc.", category: "Working", item: "iPhone 13", status: "completed", date: "Feb 12, 2025", icon: "smartphone", description: "Battery health 85%, screen intact. Includes original box.", address: "Unit 402, Green Residence, Quezon City" },
    { id: "REQ-002", user: "Juan Dela Cruz", collector: "Metro E-Waste", category: "Broken", item: "Laptop Monitor", status: "accepted", date: "Feb 20, 2025", icon: "monitor", description: "Dead pixels on the left side. 14-inch Dell monitor.", address: "15-B Sunflower St., Pasig City" },
    { id: "REQ-003", user: "Ana Reyes", collector: "None", category: "Scrap", item: "Old HardDrive", status: "pending", date: "Feb 28, 2025", icon: "hard-drive", description: "500GB HDD, clicking sound. End of life.", address: "789 Blue Ave, Makati City" },
    { id: "REQ-004", user: "Carlo Mendoza", collector: "None", category: "Scrap", item: "Li-ion Battery", status: "cancelled", date: "Mar 01, 2025", icon: "battery", description: "Swollen battery from an old power bank.", address: "Block 4 Lot 10, Spring Village, Taguig" },
];

export default function PickupRequestsScreen({ navigation }) {
    const [requests, setRequests] = useState(initialRequests);
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    // Modal States
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedReq, setSelectedReq] = useState(null);

    const filtered = requests.filter(r => {
        const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) ||
            r.item.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCategory === "all" || r.category === filterCategory;
        return matchSearch && matchCat;
    });

    const openViewModal = (req) => {
        setSelectedReq(req);
        setShowViewModal(true);
    };

    const openDeleteConfirm = (req) => {
        setSelectedReq(req);
        setShowConfirmModal(true);
    };

    const handleDelete = () => {
        if (selectedReq) {
            setRequests(prev => prev.filter(r => r.id !== selectedReq.id));
            setShowConfirmModal(false);
            setSelectedReq(null);
        }
    };

    const getBadgeStyle = (status) => {
        switch (status) {
            case "completed": return { cls: tw`bg-green-100 text-green-700`, iconColor: "#15803d" };
            case "accepted": return { cls: tw`bg-blue-100 text-blue-700`, iconColor: "#1d4ed8" };
            case "pending": return { cls: tw`bg-yellow-100 text-yellow-700`, iconColor: "#b45309" };
            case "cancelled": return { cls: tw`bg-gray-100 text-gray-500`, iconColor: "#6b7280" };
            default: return { cls: tw`bg-gray-100 text-gray-600`, iconColor: "#4b5563" };
        }
    };

    const renderRequestCard = ({ item }) => {
        const styleInfo = getBadgeStyle(item.status);

        return (
            <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4`}>
                <View style={tw`flex-row justify-between items-start mb-2`}>
                    <View style={tw`bg-green-50 p-3 rounded-xl mr-3`}>
                        <Feather name={item.icon} size={20} color="#22c55e" />
                    </View>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-base font-bold text-gray-900`}>{item.item}</Text>
                        <Text style={tw`text-xs text-green-600 font-bold tracking-widest uppercase`}>{item.id}</Text>
                    </View>
                    <View style={[tw`px-2.5 py-1 rounded-full flex-row items-center`, styleInfo.cls]}>
                        <Text style={[tw`text-[10px] font-bold uppercase`, styleInfo.cls]}>{item.status}</Text>
                    </View>
                </View>

                <View style={tw`flex-row items-center mt-2 mb-1`}>
                    <Feather name="user" size={12} color="#9ca3af" style={tw`mr-1.5`} />
                    <Text style={tw`text-sm text-gray-600`}>{item.user}</Text>
                </View>
                <View style={tw`flex-row items-center`}>
                    <Feather name="calendar" size={12} color="#9ca3af" style={tw`mr-1.5`} />
                    <Text style={tw`text-xs text-gray-400 font-semibold`}>{item.date}</Text>
                </View>

                <View style={tw`flex-row justify-between items-center mt-3 pt-3 border-t border-gray-50`}>
                    <View style={tw`bg-gray-50 px-3 py-1.5 rounded-lg`}>
                        <Text style={tw`text-xs text-gray-500 font-semibold uppercase tracking-widest`}>{item.category}</Text>
                    </View>
                    <View style={tw`flex-row`}>
                        <TouchableOpacity
                            onPress={() => openViewModal(item)}
                            style={tw`p-2 bg-gray-50 rounded-lg mr-2 border border-gray-100`}
                        >
                            <Feather name="eye" size={14} color="#4b5563" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => openDeleteConfirm(item)}
                            style={tw`p-2 bg-red-50 rounded-lg border border-red-100`}
                        >
                            <Feather name="trash-2" size={14} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
            <View style={tw`px-6 pt-6 pb-2`}>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-2xl font-bold text-gray-900`}>Pickup Requests</Text>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>Manage and review e-waste requests.</Text>
                </View>

                <View style={tw`flex-row items-center mb-4 mt-2`}>
                    <View style={tw`flex-1 relative flex-row items-center border border-gray-200 rounded-xl bg-white`}>
                        <View style={tw`absolute left-3 z-10`}>
                            <Feather name="search" size={18} color="#9ca3af" />
                        </View>
                        <TextInput
                            placeholder="Search by ID, user or item..."
                            placeholderTextColor="#9ca3af"
                            value={search}
                            onChangeText={setSearch}
                            style={tw`flex-1 py-3 pl-10 pr-4 text-gray-800 text-sm`}
                        />
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`pb-4`}>
                    {["all", "Working", "Broken", "Scrap"].map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setFilterCategory(cat)}
                            style={[
                                tw`px-4 py-2 rounded-full border mr-2`,
                                filterCategory === cat ? tw`bg-green-500 border-green-500` : tw`bg-white border-gray-200`
                            ]}
                        >
                            <Text style={filterCategory === cat ? tw`text-white font-semibold text-sm` : tw`text-gray-600 font-medium text-sm`}>
                                {cat === "all" ? "All Categories" : cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={renderRequestCard}
                contentContainerStyle={tw`px-6 pb-20`}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={tw`py-10 items-center justify-center`}>
                        <Feather name="inbox" size={40} color="#d1d5db" style={tw`mb-3`} />
                        <Text style={tw`text-gray-400 text-sm`}>No pickup requests found.</Text>
                    </View>
                )}
            />

            {selectedReq && (
                <ConfirmationModal
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleDelete}
                    title="Delete Pickup Request"
                    message={`Are you sure you want to delete ${selectedReq.id}? This will permanently remove the record for ${selectedReq.item} by ${selectedReq.user}.`}
                    type="danger"
                    confirmText="Delete Record"
                />
            )}

            {/* View Modal */}
            <Modal transparent={true} visible={showViewModal} animationType="fade">
                {selectedReq && (
                    <View style={tw`flex-1 justify-center items-center bg-black/60 px-4`}>
                        <View style={tw`bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm`}>
                            <View style={tw`flex-row justify-between items-center mb-6`}>
                                <View style={tw`flex-row items-center`}>
                                    <View style={tw`p-2.5 bg-green-500 rounded-xl mr-3`}>
                                        <Feather name={selectedReq.icon} size={20} color="white" />
                                    </View>
                                    <View>
                                        <Text style={tw`text-lg font-bold text-gray-900`}>Request Details</Text>
                                        <Text style={tw`text-xs font-bold text-green-600 tracking-widest`}>{selectedReq.id}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => setShowViewModal(false)} style={tw`p-2 rounded-full border border-gray-200 bg-gray-50`}>
                                    <Feather name="x" size={18} color="#6b7280" />
                                </TouchableOpacity>
                            </View>

                            <View style={tw`space-y-4`}>
                                <View style={tw`mb-3`}>
                                    <Text style={tw`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1`}>E-Waste Item</Text>
                                    <View style={tw`px-4 py-3 rounded-xl bg-gray-50 border border-gray-100`}><Text style={tw`text-sm font-semibold`}>{selectedReq.item}</Text></View>
                                </View>
                                <View style={tw`mb-3`}>
                                    <Text style={tw`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1`}>Posted By</Text>
                                    <View style={tw`px-4 py-3 rounded-xl bg-gray-50 border border-gray-100`}><Text style={tw`text-sm font-semibold`}>{selectedReq.user}</Text></View>
                                </View>
                                <View style={tw`mb-3`}>
                                    <Text style={tw`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1`}>Posting Date</Text>
                                    <View style={tw`px-4 py-3 rounded-xl bg-gray-50 border border-gray-100`}><Text style={tw`text-sm font-semibold`}>{selectedReq.date}</Text></View>
                                </View>
                                <View style={tw`mb-3`}>
                                    <Text style={tw`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1`}>Assigned Collector</Text>
                                    <View style={tw`px-4 py-3 rounded-xl bg-gray-50 border border-gray-100`}>
                                        <Text style={[tw`text-sm font-bold`, selectedReq.collector === 'None' ? tw`text-gray-400` : tw`text-blue-500`]}>
                                            {selectedReq.collector}
                                        </Text>
                                    </View>
                                </View>
                                <View style={tw`mb-5`}>
                                    <Text style={tw`text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1`}>Item Description & Address</Text>
                                    <View style={tw`px-4 py-3 rounded-xl bg-gray-50 border border-gray-100`}>
                                        <Text style={tw`text-sm font-medium text-gray-800 mb-1`}>{selectedReq.description}</Text>
                                        <Text style={tw`text-xs text-gray-500 italic`}>{selectedReq.address}</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => setShowViewModal(false)}
                                style={tw`w-full border border-gray-200 py-3 rounded-xl items-center bg-white shadow-sm`}
                            >
                                <Text style={tw`text-gray-700 font-bold text-sm`}>Close Preview</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Modal>
        </SafeAreaView>
    );
}

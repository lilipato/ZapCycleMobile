import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";

const usersData = [
    { id: "USR-001", name: "Maria Santos", email: "maria.santos@email.com", phone: "+63 912 345 6789", role: "Member", cycles: 42, status: "active", joined: "Jan 12, 2025", avatar: "MS", color: "bg-blue-500" },
    { id: "USR-002", name: "Juan Dela Cruz", email: "juan.delacruz@email.com", phone: "+63 917 234 5678", role: "Member", cycles: 31, status: "active", joined: "Jan 18, 2025", avatar: "JD", color: "bg-purple-500" },
    { id: "USR-003", name: "Ana Reyes", email: "ana.reyes@email.com", phone: "+63 918 345 6789", role: "Admin", cycles: 0, status: "active", joined: "Feb 01, 2025", avatar: "AR", color: "bg-pink-500" },
    { id: "USR-004", name: "Carlo Mendoza", email: "carlo.mendoza@email.com", phone: "+63 919 456 7890", role: "Member", cycles: 18, status: "inactive", joined: "Dec 05, 2024", avatar: "CM", color: "bg-indigo-500" },
    { id: "USR-005", name: "Liza Bautista", email: "liza.bautista@email.com", phone: "+63 920 567 8901", role: "Member", cycles: 57, status: "active", joined: "Nov 22, 2024", avatar: "LB", color: "bg-teal-500" },
    { id: "USR-006", name: "Ramon Torres", email: "ramon.torres@email.com", phone: "+63 921 678 9012", role: "Member", cycles: 9, status: "pending", joined: "Feb 10, 2025", avatar: "RT", color: "bg-orange-500" },
    { id: "USR-007", name: "Grace Villanueva", email: "grace.villanueva@email.com", phone: "+63 922 789 0123", role: "Member", cycles: 74, status: "active", joined: "Oct 14, 2024", avatar: "GV", color: "bg-cyan-500" },
];

export default function UsersScreen({ navigation }) {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const getBadgeStyle = (status) => {
        switch (status) {
            case "active": return tw`bg-green-100 text-green-700`;
            case "inactive": return tw`bg-gray-100 text-gray-500`;
            case "pending": return tw`bg-yellow-100 text-yellow-700`;
            default: return tw`bg-gray-100 text-gray-600`;
        }
    };

    const renderUserCard = ({ item }) => (
        <View style={tw`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 flex-row`}>
            {/* Avatar */}
            <View style={[tw`w-12 h-12 rounded-xl flex items-center justify-center mr-4`, tw`${item.color}`]}>
                <Text style={tw`text-white font-bold text-lg`}>{item.avatar}</Text>
            </View>

            <View style={tw`flex-1`}>
                <View style={tw`flex-row justify-between items-start mb-1`}>
                    <View>
                        <Text style={tw`text-base font-bold text-gray-900`}>{item.name}</Text>
                        <Text style={tw`text-xs text-gray-500 font-mono`}>{item.id}</Text>
                    </View>
                    <View style={[tw`px-2.5 py-1 rounded-full`, getBadgeStyle(item.status)]}>
                        <Text style={[
                            tw`text-[10px] font-bold uppercase`,
                            item.status === 'active' ? tw`text-green-700` : item.status === 'inactive' ? tw`text-gray-500` : tw`text-yellow-700`
                        ]}>{item.status}</Text>
                    </View>
                </View>

                <View style={tw`mt-2`}>
                    <View style={tw`flex-row items-center mb-1`}>
                        <Feather name="mail" size={12} color="#9ca3af" style={tw`mr-1.5`} />
                        <Text style={tw`text-sm text-gray-600`}>{item.email}</Text>
                    </View>
                    <View style={tw`flex-row items-center mb-2`}>
                        <Feather name="phone" size={12} color="#9ca3af" style={tw`mr-1.5`} />
                        <Text style={tw`text-sm text-gray-600`}>{item.phone}</Text>
                    </View>
                </View>

                <View style={tw`flex-row justify-between items-center mt-2 pt-3 border-t border-gray-50`}>
                    <View style={[tw`px-2.5 py-1 rounded-full flex-row items-center`, item.role === 'Admin' ? tw`bg-purple-100` : tw`bg-blue-50`]}>
                        {item.role === 'Admin' && <Feather name="shield" size={10} color="#9333ea" style={tw`mr-1`} />}
                        <Text style={[tw`text-xs font-semibold`, item.role === 'Admin' ? tw`text-purple-600` : tw`text-blue-600`]}>{item.role}</Text>
                    </View>
                    <View style={tw`flex-row items-baseline`}>
                        <Text style={tw`font-bold text-gray-800 text-sm`}>{item.cycles}</Text>
                        <Text style={tw`text-xs text-gray-500 ml-1`}>cycles</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const filteredUsers = usersData.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || u.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const counts = {
        total: usersData.length,
        active: usersData.filter(u => u.status === "active").length,
        inactive: usersData.filter(u => u.status === "inactive").length,
        pending: usersData.filter(u => u.status === "pending").length,
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
            <View style={tw`px-6 pt-6 pb-2`}>
                <View style={tw`mb-4`}>
                    <Text style={tw`text-2xl font-bold text-gray-900`}>Users</Text>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>Manage and monitor all registered users.</Text>
                </View>

                {/* Summary Cards Row */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`pb-2`}>
                    <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-4 mr-3 flex-row items-center w-36`}>
                        <View style={tw`w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 mr-3`}>
                            <Feather name="users" size={18} color="#2563eb" />
                        </View>
                        <View>
                            <Text style={tw`text-gray-400 text-xs font-medium`}>Total Users</Text>
                            <Text style={tw`text-lg font-bold text-gray-900`}>{counts.total}</Text>
                        </View>
                    </View>
                    <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-4 mr-3 flex-row items-center w-32`}>
                        <View style={tw`w-10 h-10 rounded-lg flex items-center justify-center bg-green-50 mr-3`}>
                            <Feather name="check-circle" size={18} color="#16a34a" />
                        </View>
                        <View>
                            <Text style={tw`text-gray-400 text-xs font-medium`}>Active</Text>
                            <Text style={tw`text-lg font-bold text-gray-900`}>{counts.active}</Text>
                        </View>
                    </View>
                    <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-4 mr-3 flex-row items-center w-32`}>
                        <View style={tw`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 mr-3`}>
                            <Feather name="x-circle" size={18} color="#6b7280" />
                        </View>
                        <View>
                            <Text style={tw`text-gray-400 text-xs font-medium`}>Inactive</Text>
                            <Text style={tw`text-lg font-bold text-gray-900`}>{counts.inactive}</Text>
                        </View>
                    </View>
                    <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-4 mr-3 flex-row items-center w-32`}>
                        <View style={tw`w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-50 mr-3`}>
                            <Feather name="clock" size={18} color="#ca8a04" />
                        </View>
                        <View>
                            <Text style={tw`text-gray-400 text-xs font-medium`}>Pending</Text>
                            <Text style={tw`text-lg font-bold text-gray-900`}>{counts.pending}</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Search Bar */}
                <View style={tw`flex-row items-center mb-4 mt-2`}>
                    <View style={tw`flex-1 relative flex-row items-center border border-gray-200 rounded-xl bg-white`}>
                        <View style={tw`absolute left-3 z-10`}>
                            <Feather name="search" size={18} color="#9ca3af" />
                        </View>
                        <TextInput
                            placeholder="Search user..."
                            placeholderTextColor="#9ca3af"
                            value={search}
                            onChangeText={setSearch}
                            style={tw`flex-1 py-3 pl-10 pr-4 text-gray-800 text-sm`}
                        />
                    </View>
                    <TouchableOpacity style={tw`w-12 h-12 ml-3 bg-green-500 rounded-xl items-center justify-center shadow-sm`}>
                        <Feather name="user-plus" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={tw`pb-4`}>
                    {[
                        { id: "all", label: "All Status" },
                        { id: "active", label: "Active" },
                        { id: "inactive", label: "Inactive" },
                        { id: "pending", label: "Pending" },
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
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={renderUserCard}
                contentContainerStyle={tw`px-6 pb-20`}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={tw`py-10 items-center justify-center`}>
                        <Feather name="inbox" size={40} color="#d1d5db" style={tw`mb-3`} />
                        <Text style={tw`text-gray-400 text-sm`}>No users found matching your search.</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

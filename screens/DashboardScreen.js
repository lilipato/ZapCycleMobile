import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import StatCard from "../components/StatCard";
import { LineChart, PieChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const cyclesData = {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [{ data: [120, 185, 210, 175, 240, 310, 295] }]
};

const energyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: [42, 58, 35, 71, 63, 89, 54] }]
};

const statusData = [
    { name: "Active", population: 68, color: "#22c55e", legendFontColor: "#4b5563", legendFontSize: 12 },
    { name: "Idle", population: 20, color: "#facc15", legendFontColor: "#4b5563", legendFontSize: 12 },
    { name: "Maint.", population: 12, color: "#f87171", legendFontColor: "#4b5563", legendFontSize: 12 },
];

const recentActivity = [
    { id: "ZC-001", user: "Maria Santos", action: "Cycle Started", time: "2 min ago", status: "active" },
    { id: "ZC-002", user: "Juan Dela Cruz", action: "Cycle Completed", time: "8 min ago", status: "done" },
    { id: "ZC-003", user: "Ana Reyes", action: "Account Created", time: "15 min ago", status: "new" },
    { id: "ZC-004", user: "Carlo Mendoza", action: "Cycle Started", time: "22 min ago", status: "active" },
    { id: "ZC-005", user: "Liza Bautista", action: "Cycle Completed", time: "31 min ago", status: "done" },
];

export default function DashboardScreen({ navigation }) {
    const [dashboardView, setDashboardView] = useState("overview");

    const getBadgeStyle = (status) => {
        switch (status) {
            case "active": return tw`bg-green-100 text-green-700`;
            case "done": return tw`bg-blue-100 text-blue-700`;
            case "new": return tw`bg-purple-100 text-purple-700`;
            default: return tw`bg-gray-100 text-gray-600`;
        }
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
            <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
                {/* Top Bar */}
                <View style={tw`flex-row justify-between items-center mb-8`}>
                    <View>
                        <Text style={tw`text-2xl font-bold text-gray-900`}>Dashboard</Text>
                        <Text style={tw`text-sm text-gray-500 mt-1`}>Welcome back! Here's what's happening.</Text>
                    </View>
                    <TouchableOpacity style={tw`w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100`}>
                        <Feather name="bell" size={20} color="#4b5563" />
                    </TouchableOpacity>
                </View>

                {/* View Toggle */}
                <View style={tw`flex-row bg-gray-200 p-1 rounded-xl mb-6`}>
                    <TouchableOpacity
                        onPress={() => setDashboardView("overview")}
                        style={[tw`flex-1 py-2 rounded-lg items-center shadow-sm`, dashboardView === "overview" ? tw`bg-white` : tw`bg-transparent shadow-none`]}
                    >
                        <Text style={[tw`font-semibold text-sm`, dashboardView === "overview" ? tw`text-gray-900` : tw`text-gray-500`]}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setDashboardView("analytics")}
                        style={[tw`flex-1 py-2 rounded-lg items-center shadow-sm`, dashboardView === "analytics" ? tw`bg-white` : tw`bg-transparent shadow-none`]}
                    >
                        <Text style={[tw`font-semibold text-sm`, dashboardView === "analytics" ? tw`text-gray-900` : tw`text-gray-500`]}>Analytics</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Content Render Based on State */}
                {dashboardView === "overview" ? (
                    <>
                        {/* Stats */}
                        <View style={tw`mb-2`}>
                            <StatCard iconName="refresh-cw" label="Total Cycles" value="1,284" change="12%" positive colorClass="bg-green-500" />
                            <StatCard iconName="users" label="Active Users" value="348" change="8%" positive colorClass="bg-blue-500" />
                            <StatCard iconName="zap" label="Energy Saved (kWh)" value="9,420" change="5%" positive colorClass="bg-yellow-400" />
                            <StatCard iconName="trending-up" label="Revenue" value="₱84,500" change="3%" positive={false} colorClass="bg-purple-500" />
                        </View>

                        {/* Recent Activity */}
                        <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 mt-4`}>
                            <View style={tw`flex-row justify-between items-center mb-5`}>
                                <View>
                                    <Text style={tw`text-base font-bold text-gray-900`}>Recent Activity</Text>
                                    <Text style={tw`text-xs text-gray-400`}>Latest user actions</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={tw`text-sm font-semibold text-green-600`}>View All</Text>
                                </TouchableOpacity>
                            </View>

                            {recentActivity.map((item, index) => (
                                <View key={item.id} style={tw`flex-row items-center py-3.5 ${index !== recentActivity.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <View style={tw`w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-3 border border-gray-100`}>
                                        <Feather name="user" size={18} color="#6b7280" />
                                    </View>
                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-sm font-bold text-gray-800`}>{item.user}</Text>
                                        <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.action} • {item.id}</Text>
                                    </View>
                                    <View style={tw`items-end`}>
                                        <Text style={tw`text-xs text-gray-400 mb-1.5`}>{item.time}</Text>
                                        <View style={[tw`px-2.5 py-1 rounded-full`, getBadgeStyle(item.status)]}>
                                            <Text style={[
                                                tw`text-[10px] font-bold uppercase`,
                                                item.status === 'active' ? tw`text-green-700` : item.status === 'done' ? tw`text-blue-700` : tw`text-purple-700`
                                            ]}>
                                                {item.status}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </>
                ) : (
                    <>
                        {/* Line Chart */}
                        <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6`}>
                            <Text style={tw`text-base font-bold text-gray-900 mb-1`}>Cycles Over Time</Text>
                            <Text style={tw`text-xs text-gray-400 mb-4`}>Monthly cycle completions</Text>
                            <View style={tw`items-center`}>
                                <LineChart
                                    data={cyclesData}
                                    width={screenWidth - 88}
                                    height={220}
                                    chartConfig={chartConfig}
                                    bezier
                                    style={tw`rounded-xl`}
                                    withDots={false}
                                    withHorizontalLabels={true}
                                    withInnerLines={false}
                                />
                            </View>
                        </View>

                        {/* Pie Chart */}
                        <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6`}>
                            <Text style={tw`text-base font-bold text-gray-900 mb-1`}>Unit Status</Text>
                            <Text style={tw`text-xs text-gray-400 mb-4`}>Current fleet breakdown</Text>
                            <PieChart
                                data={statusData}
                                width={screenWidth - 88}
                                height={180}
                                chartConfig={chartConfig}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"15"}
                                center={[10, 0]}
                                absolute
                            />
                        </View>

                        {/* Bar Chart */}
                        <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6`}>
                            <Text style={tw`text-base font-bold text-gray-900 mb-1`}>Daily Energy (kWh)</Text>
                            <Text style={tw`text-xs text-gray-400 mb-4`}>This week's consumption</Text>
                            <View style={tw`items-center`}>
                                <BarChart
                                    data={energyData}
                                    width={screenWidth - 88}
                                    height={220}
                                    yAxisLabel=""
                                    yAxisSuffix=""
                                    chartConfig={chartConfig}
                                    style={tw`rounded-xl`}
                                    showBarTops={false}
                                    fromZero={true}
                                />
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

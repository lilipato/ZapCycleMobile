import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import tw from "twrnc";
import { Feather } from "@expo/vector-icons";
import StatCard from "../components/StatCard";
import { LineChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const requestTrendsData = {
    labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [{ data: [45, 120, 185, 240, 310, 425] }]
};

const categoryPieData = [
    { name: "Working", population: 35, color: "#37B26C", legendFontColor: "#4b5563", legendFontSize: 12 },
    { name: "Broken", population: 45, color: "#3b82f6", legendFontColor: "#4b5563", legendFontSize: 12 },
    { name: "Scrap", population: 20, color: "#ef4444", legendFontColor: "#4b5563", legendFontSize: 12 },
];

const platformActivity = [
    { id: "REQ-102", detail: "New Pickup Requested", user: "Maria Santos", time: "2 min ago", type: "new" },
    { id: "COL-045", detail: "Collector Verified", user: "EcoPick Ltd.", time: "15 min ago", type: "system" },
    { id: "REQ-098", detail: "Request Completed", user: "RecyclePros", time: "22 min ago", type: "done" },
    { id: "REQ-101", detail: "Pickup Accepted", user: "Metro Junkshops", time: "1 hr ago", type: "active" },
];

export default function DashboardScreen({ navigation }) {
    const [dashboardView, setDashboardView] = useState("overview");

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(55, 178, 108, ${opacity})`, // #37B26C
        strokeWidth: 3,
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-gray-50`}>
            <ScrollView contentContainerStyle={tw`p-6 pb-20`}>
                {/* Top Bar */}
                <View style={tw`flex-row justify-between items-center mb-8`}>
                    <View>
                        <Text style={tw`text-2xl font-bold text-gray-900`}>Platform Overview</Text>
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
                            <StatCard iconName="users" label="Total Users" value="1,482" change="+12%" positive={true} colorClass="bg-blue-500" />
                            <StatCard iconName="truck" label="Total Collectors" value="86" change="+5%" positive={true} colorClass="bg-green-500" />
                            <StatCard iconName="package" label="Active Requests" value="42" change="8 new" positive={true} colorClass="bg-yellow-500" />
                            <StatCard iconName="check-circle" label="Completed Pickups" value="894" change="+18%" positive={true} colorClass="bg-green-600" />
                        </View>

                        {/* Recent Activity */}
                        <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 mt-4`}>
                            <View style={tw`flex-row justify-between items-center mb-5`}>
                                <View>
                                    <Text style={tw`text-base font-bold text-gray-900`}>Recent Activity Feed</Text>
                                    <Text style={tw`text-xs text-gray-400`}>Latest platform actions</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={tw`text-sm font-semibold text-green-600`}>View All</Text>
                                </TouchableOpacity>
                            </View>

                            {platformActivity.map((item, index) => (
                                <View key={item.id} style={tw`flex-row items-center py-3.5 ${index !== platformActivity.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <View style={[tw`w-10 h-10 rounded-full items-center justify-center mr-3`,
                                    item.type === 'new' ? tw`bg-blue-50` :
                                        item.type === 'done' ? tw`bg-green-50` : tw`bg-gray-50`]}>
                                        <Feather
                                            name={item.type === 'new' ? 'clock' : item.type === 'done' ? 'check-circle' : 'refresh-cw'}
                                            size={18}
                                            color={item.type === 'new' ? '#2563eb' : item.type === 'done' ? '#16a34a' : '#4b5563'}
                                        />
                                    </View>
                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-sm font-bold text-gray-800`}>{item.detail}</Text>
                                        <Text style={tw`text-xs text-gray-500 mt-0.5`}>{item.user} • {item.time}</Text>
                                    </View>
                                    <View style={tw`items-end justify-center`}>
                                        <Text style={tw`text-[10px] font-mono font-bold text-gray-400`}>{item.id}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </>
                ) : (
                    <>
                        {/* Line Chart Configured as AreaChart to match web */}
                        <View style={tw`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6`}>
                            <Text style={tw`text-base font-bold text-gray-900 mb-6`}>Platform Growth (Requests)</Text>
                            <LineChart
                                data={requestTrendsData}
                                width={screenWidth - 85}
                                height={250}
                                chartConfig={{
                                    backgroundGradientFrom: "#ffffff",
                                    backgroundGradientTo: "#ffffff",
                                    fillShadowGradientFrom: "#37B26C",
                                    fillShadowGradientFromOpacity: 0.1,
                                    fillShadowGradientTo: "#37B26C",
                                    fillShadowGradientToOpacity: 0,
                                    color: (opacity = 1) => `rgba(55, 178, 108, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(156, 163, 175, 1)`,
                                    strokeWidth: 3,
                                    propsForBackgroundLines: {
                                        strokeDasharray: "3 3",
                                        stroke: "#f0f0f0"
                                    },
                                    propsForDots: { r: "0" }
                                }}
                                bezier
                                withDots={false}
                                withVerticalLines={false}
                                withInnerLines={true}
                                withOuterLines={false}
                                withShadow={true}
                                style={{ marginLeft: -15 }}
                            />
                        </View>

                        {/* Pie Chart mimicking Recharts Donut with horizontal legends */}
                        <View style={tw`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6`}>
                            <Text style={tw`text-base font-bold text-gray-900 mb-6`}>Requests by Category</Text>
                            <View style={tw`items-center justify-center`}>
                                <View style={tw`relative items-center justify-center`}>
                                    <PieChart
                                        data={categoryPieData}
                                        width={screenWidth - 60}
                                        height={200}
                                        chartConfig={{
                                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        }}
                                        accessor={"population"}
                                        backgroundColor={"transparent"}
                                        paddingLeft={((screenWidth - 60) / 4).toString()}
                                        hasLegend={false}
                                        absolute={false}
                                    />
                                    {/* White circle simulating innerRadius={60} Donut Chart */}
                                    <View style={[tw`absolute bg-white rounded-full`, { width: 100, height: 100 }]} />
                                </View>

                                {/* Custom Horizontal Legend mimicking layout="horizontal" verticalAlign="bottom" */}
                                <View style={tw`flex-row justify-center items-center mt-4 w-full flex-wrap`}>
                                    {categoryPieData.map((category, idx) => (
                                        <View key={idx} style={tw`flex-row items-center mx-3 mb-2`}>
                                            <View style={[tw`w-3 h-3 rounded-full mr-2`, { backgroundColor: category.color }]} />
                                            <Text style={tw`text-sm text-gray-500`}>{category.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

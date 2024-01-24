import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart, faStar, faHome, faSearch, faBook, faUser } from "@fortawesome/free-solid-svg-icons";

function Course() {
  return (
    <View
      className="border-2 border-solid border-gray-300 w-20 h-50   rounded"
      style={{ width: 100, height: 120 }}
    >
      <Image
        source={require("./component/image/cv-1_m.png")}
        style={{ width: 96, height: 54 }}
      />
      <Text style={{ fontSize: 10 }} className="text-center">
        Thành thạo Canvas trong 21 ngày
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Text style={{ fontSize: 10}}>298.000đ </Text>
      <Text style={{ fontSize: 10, color:'gray'}}>500.000đ</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
   <View style={{ flex: 1 }}> 
    <ScrollView>
    <View className="pt-6">
      <View className="flex-row justify-end pr-1">
        <FontAwesomeIcon icon={faShoppingCart} size={25} />
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require("./component/image/slideshow_1.jpg")}
          style={{ width: 256, height: 144 }}
        />
      </View>

      <Text className="font-bold pl-1">Top bán chạy</Text>

      <View className="p-1 pl-2 pr-2 justify-between flex-row">
        <Course />
        <Course />
        <Course />
      </View>

      <Text className="font-bold pl-1">Học nhiều</Text>

      <View className="p-1 pl-2 pr-2 justify-between flex-row">
        <Course />
        <Course />
        <Course />
      </View>

      <Text className="font-bold pl-1">Đang khuyến mãi</Text>

      <View className="p-1 pl-2 pr-2 justify-between flex-row">
        <Course />
        <Course />
        <Course />
      </View>

      <Text className="font-bold pl-1">Khác</Text>

      <View className="p-1 pl-2 pr-2 justify-between flex-row">
        <Course />
        <Course />
        <Course />
      </View>

      <StatusBar style="auto" />
    </View>
    
    </ScrollView>
    <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Home')}>
          <FontAwesomeIcon icon={faHome} size={25}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Home')}>
          <FontAwesomeIcon icon={faSearch}  size={25} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Home')}>
          <FontAwesomeIcon icon={faBook}  size={25}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Home')}>
          <FontAwesomeIcon icon={faUser}  size={25}/>
        </TouchableOpacity>

        
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  navBar: {
    height: 44,
    backgroundColor: '#ececec',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
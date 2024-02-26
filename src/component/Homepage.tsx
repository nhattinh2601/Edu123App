import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faShoppingCart,
  faStar,
  faHome,
  faSearch,
  faBook,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Course() {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 8,
        width: 160,
        height: 220,
        padding: 8,
        margin: 8,
      }}
    >
      <Image
        source={require("../image/web.jpg")}
        style={{ width: 144, height: 81, marginBottom: 8 }}
      />
      <Text style={{ fontSize: 12, textAlign: "center", marginBottom: 8 }}>
        Lập trình web
      </Text>
      <Text
        style={{
          fontSize: 12,
          marginTop: 4,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        GV: Trương Minh Hiếu
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <FontAwesomeIcon icon={faStar} color="#FFD700" size={12} />
        <FontAwesomeIcon icon={faStar} color="#FFD700" size={12} />
        <FontAwesomeIcon icon={faStar} color="#FFD700" size={12} />
        <FontAwesomeIcon icon={faStar} color="#FFD700" size={12} />
        <FontAwesomeIcon icon={faStar} color="#FFD700" size={12} />
      </View>

      <Text
        style={{
          fontSize: 12,
          color: "gray",
          textAlign: "center",
          textDecorationLine: "line-through",
          marginBottom: 4,
        }}
      >
        300.000đ
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}>
        199.000đ
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingTop: 6 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 1 }}>
            <FontAwesomeIcon icon={faShoppingCart} size={25} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../image/slideshow_1.jpg")}
              style={{ width: 256, height: 144 }}
            />
          </View>

          <Text style={{ fontWeight: "bold", paddingLeft: 1 }}>Top bán chạy</Text>

          <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
            <View style={{ padding: 1, paddingLeft: 2, paddingRight: 2, flexDirection: "row" }}>
              <Course />
              <Course />
              <Course />
              <Course />
            </View>
          </ScrollView>

          <Text style={{ fontWeight: "bold", paddingLeft: 1 }}>Học nhiều</Text>

          <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
            <View style={{ padding: 1, paddingLeft: 2, paddingRight: 2, flexDirection: "row" }}>
              <Course />
              <Course />
              <Course />
              <Course />
            </View>
          </ScrollView>

          <Text style={{ fontWeight: "bold", paddingLeft: 1 }}>Đang khuyến mãi</Text>

          <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
            <View style={{ padding: 1, paddingLeft: 2, paddingRight: 2, flexDirection: "row" }}>
              <Course />
              <Course />
              <Course />
              <Course />
            </View>
          </ScrollView>

          <Text style={{ fontWeight: "bold", paddingLeft: 1 }}>Khác</Text>

          <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
            <View style={{ padding: 1, paddingLeft: 2, paddingRight: 2, flexDirection: "row" }}>
              <Course />
              <Course />
              <Course />
              <Course />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log("Home")}
        >
          <FontAwesomeIcon icon={faHome} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log("Find Course")}
        >
          <FontAwesomeIcon icon={faSearch} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log("Course")}
        >
          <FontAwesomeIcon icon={faBook} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => console.log("Account management")}
        >
          <FontAwesomeIcon icon={faUser} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 44,
    backgroundColor: "#ececec",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});

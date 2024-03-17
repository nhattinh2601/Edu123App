import { Text, View, Image } from "react-native";
import MyImage from "../MyImage";
import myImage from "../../image/slideshow_1.jpg"
import { lazy } from "react";

export default function Study () {
        return(
                <View>
                        <Text>Study</Text>
                        <Image source={myImage}   />
                </View>
        );
}
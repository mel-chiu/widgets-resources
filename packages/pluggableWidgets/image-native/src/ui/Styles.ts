import { ViewStyle, ImageStyle } from "react-native";
import { Style } from "@mendix/piw-native-utils-internal";
import { GProps } from "react-native-svg";

export interface IconStyle {
    size?: number;
    color?: string;
}
export interface DefaultImageStyle extends Style {
    container: ViewStyle;
    image: ImageStyle | GProps | IconStyle;
    backdrop: ViewStyle;
}

export const defaultImageStyle: DefaultImageStyle = {
    container: {},
    image: {
        // backgroundColor: "#FFF",
        color: "black",
        size: 50
    },
    backdrop: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `rgba(0,0,0,0.8)`
    }
};

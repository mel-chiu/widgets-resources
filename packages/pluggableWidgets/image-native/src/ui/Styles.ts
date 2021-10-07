import { ViewStyle, ImageStyle } from "react-native";
import { Style } from "@mendix/piw-native-utils-internal";

export interface CustomImageStyle extends ImageStyle {
    size?: number;
    color?: string;
    fill?: string;
    // stroke?: string;
}

export interface DefaultImageStyle extends Style {
    container: ViewStyle;
    image: CustomImageStyle;
    backdrop: ViewStyle;
}

export const defaultImageStyle: DefaultImageStyle = {
    container: {},
    image: {
        backgroundColor: "#FFF",
        // stroke: "5",
        color: "red",
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

import { createElement, ReactNode, FunctionComponent, useState, useCallback } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { CustomImageObjectProps, onLayoutSetDimensions } from "../utils/imageUtils";
import { DimensionsType, ImageIconSVG } from "./ImageIconSVG";

export interface BackgroundImageProps {
    name?: string;
    source: CustomImageObjectProps;
    initialDimensions?: DimensionsType;
    children: ReactNode;
    styles: any; // FIXME: fix
}

export const BackgroundImage: FunctionComponent<BackgroundImageProps> = props => {
    const [dimensions, setDimensions] = useState<DimensionsType>();
    const { source, initialDimensions, children, styles, name } = props;

    const onLayoutSetDimensionsCallback = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) =>
            onLayoutSetDimensions(layout.width, layout.height, setDimensions, initialDimensions),
        [initialDimensions]
    );

    return (
        <View onLayout={onLayoutSetDimensionsCallback} style={styles.container}>
            <View
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <ImageIconSVG
                    {...source}
                    // name={name}
                    dimensions={dimensions}
                    initialDimensions={initialDimensions}
                    styles={styles.image}
                />
            </View>
            {children}
        </View>
    );
};

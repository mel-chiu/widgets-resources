import { createElement, FunctionComponent, Fragment } from "react";
import { SvgUri, SvgXml } from "react-native-svg";
import { extractStyles } from "@mendix/pluggable-widgets-tools";
import { NativeIcon, NativeImage } from "mendix";
import { Image } from "mendix/components/native/Image";
import { Icon } from "mendix/components/native/Icon";
import { CustomImageProps } from "../utils/imageUtils";
import { View } from "react-native";

export interface DimensionsType {
    width: number;
    height: number;
    aspectRatio?: number;
}

interface ImageIconSVGProps {
    type?: string;
    image?: CustomImageProps;
    name?: string;
    dimensions?: DimensionsType;
    initialDimensions?: DimensionsType;
    styles: any;
}

export const ImageIconSVG: FunctionComponent<ImageIconSVGProps> = props => {
    const { type, image, dimensions, initialDimensions, styles, name } = props;
    const [iconProps] = extractStyles(styles, ["size", "color"]);
    const [svgProps, svgStyles] = extractStyles(styles, ["width", "height", "color", "fill", "stroke"]);

    const updatedSvgProps = {
        ...svgProps,
        width: dimensions?.width ?? svgProps?.width ?? undefined,
        height: dimensions?.height ?? svgProps?.height ?? undefined,
        viewBox:
            initialDimensions?.width && initialDimensions?.height
                ? `0 0 ${initialDimensions.width} ${initialDimensions.height}`
                : undefined
    };

    const basicStyles = {
        aspectRatio: initialDimensions?.aspectRatio ? +initialDimensions.aspectRatio?.toFixed(2) : undefined,
        maxWidth: "100%",
        maxHeight: "100%"
    };

    if (image && (type === "staticImage" || type === "dynamicImage")) {
        return (
            <Image
                testID={`${name}$Image`}
                source={image as NativeImage}
                style={{
                    width: dimensions?.width,
                    height: dimensions?.height,
                    ...basicStyles,
                    ...styles
                }}
            />
        );
    }
    if (image && initialDimensions?.width && initialDimensions?.height) {
        if (type === "staticSVG") {
            return (
                <SvgXml
                    testID={`${name}$SvgXml`}
                    xml={image as string}
                    // preserveAspectRatio="xMidYMid slice"
                    {...updatedSvgProps}
                    style={[basicStyles, svgStyles]}
                />
            );
        } else if (type?.startsWith("dynamicSVG")) {
            return (
                <SvgUri
                    testID={`${name}$SvgUri`}
                    uri={image as string}
                    // preserveAspectRatio="xMidYMid slice"
                    {...updatedSvgProps}
                    style={[basicStyles, svgStyles]}
                />
            );
        }
    }
    if (image && type === "icon") {
        return (
            <View testID={`${name}$Icon`}>
                <Icon icon={image as NativeIcon} {...iconProps} />
            </View>
        );
    }

    return <Fragment />;
};

import { createElement, FunctionComponent, Fragment } from "react";
import { View } from "react-native";
import { SvgUri, SvgXml } from "react-native-svg";
import FastImageComponent, { Source } from "react-native-fast-image";
import { extractStyles } from "@mendix/pluggable-widgets-tools";
import { CustomImageProps, GlyphIcon } from "../utils/imageUtils";
import { GlyphIcon as GlyphIconComponent } from "./fonts/font";

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

const excludedImageStyles = [
    "color",
    "size",
    "fill",
    "fillOpacity",
    "fillRule",
    "stroke",
    "strokeWidth",
    "strokeOpacity",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeMiterlimit",
    "clipRule",
    "clipPath",
    "vectorEffect"
];

export const ImageIconSVG: FunctionComponent<ImageIconSVGProps> = props => {
    const { type, image, dimensions, initialDimensions, styles, name } = props;
    // const [iconProps] = extractStyles(styles, ["size", "color"]);
    const [svgProps, svgStyles] = extractStyles(styles, ["width", "height"]);
    const [, imageStyles] = extractStyles(styles, excludedImageStyles);
    svgStyles.fill = svgStyles.fill ?? svgStyles.color ?? undefined;

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
            <FastImageComponent
                testID={`${name}$Image`} // Broken because of https://github.com/DylanVann/react-native-fast-image/issues/221
                source={image as Source | number}
                style={{
                    width: dimensions?.width,
                    height: dimensions?.height,
                    ...basicStyles,
                    ...imageStyles
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
                <GlyphIconComponent
                    name={String((image as GlyphIcon).iconClass)}
                    color={styles?.color ?? "black"}
                    size={styles?.size ?? 20}
                />
            </View>
        );
    }

    return <Fragment />;
};

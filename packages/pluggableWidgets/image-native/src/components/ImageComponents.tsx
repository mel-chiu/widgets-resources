import { createElement, Dispatch, SetStateAction, FunctionComponent, useState, Fragment, useCallback } from "react";

import { Modal, Pressable, LayoutChangeEvent, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { OnClickTypeEnum } from "../../typings/ImageProps";
import { CustomImageObjectProps, onLayoutSetDimensions } from "../utils/imageUtils";
import { DimensionsType, ImageIconSVG } from "./ImageIconSVG";

interface ImageViewerBaseProps {
    name?: string;
    source: CustomImageObjectProps;
    initialDimensions: DimensionsType | undefined;
    styles?: any; // FIXME: fix
}

export interface ImageViewerProps extends ImageViewerBaseProps {
    onClick: () => void;
    onClickType: OnClickTypeEnum;
    setInitialDimensions?: Dispatch<SetStateAction<DimensionsType | undefined>>;
}
interface ImageSmallProps extends ImageViewerBaseProps {
    onClick: () => Dispatch<SetStateAction<boolean>> | void;
}
interface ImageEnlargedProps extends ImageViewerBaseProps {
    visible: boolean;
    setEnlarged: Dispatch<SetStateAction<boolean>>;
}
interface GetImageDimensionsComponentProps extends ImageViewerBaseProps {
    onLayoutSetInitialDimensions: ({ nativeEvent: { layout } }: LayoutChangeEvent) => void;
}

export const ImageViewer: FunctionComponent<ImageViewerProps> = props => {
    const [enlarged, setEnlarged] = useState(false);
    const { source, initialDimensions, setInitialDimensions, onClick, onClickType, styles, name } = props;

    const onLayoutSetInitialDimensions = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
            const { width, height } = layout;
            setInitialDimensions?.({
                width,
                height,
                aspectRatio: width && height ? width / height : undefined
            });
        },
        [setInitialDimensions]
    );

    return (
        <Fragment>
            <ImageSmall
                name={name}
                source={source}
                initialDimensions={initialDimensions}
                onClick={onClickType === "enlarge" ? () => setEnlarged(true) : onClick}
                styles={styles}
            />
            <GetImageDimensionsComponent
                name={name}
                source={source}
                initialDimensions={initialDimensions}
                onLayoutSetInitialDimensions={onLayoutSetInitialDimensions}
            />
            <ImageEnlarged
                name={name}
                visible={enlarged}
                setEnlarged={setEnlarged}
                source={source}
                initialDimensions={initialDimensions}
                styles={styles}
            />
        </Fragment>
    );
};

export const GetImageDimensionsComponent: FunctionComponent<GetImageDimensionsComponentProps> = props => {
    const { source, initialDimensions, onLayoutSetInitialDimensions, name } = props;

    /* Render dynamicSVG once to get initial dimensions */
    return source?.image &&
        source.type === "dynamicSVG" &&
        (!initialDimensions?.width || !initialDimensions?.height) ? (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0
            }}
            pointerEvents={"box-none"}
        >
            <SvgUri
                testID={`${name}$SvgUriTemporary`}
                uri={source.image as string}
                onLayout={onLayoutSetInitialDimensions}
                style={{
                    opacity: 0
                }}
                pointerEvents={"box-none"}
            />
        </View>
    ) : null;
};

export const ImageSmall: FunctionComponent<ImageSmallProps> = props => {
    const [dimensions, setDimensions] = useState<DimensionsType>();
    const { source, initialDimensions, onClick, styles, name } = props;

    const onLayoutSetDimensionsCallback = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) =>
            onLayoutSetDimensions(layout.width, layout.height, setDimensions, initialDimensions),
        [initialDimensions]
    );

    return (
        <Pressable
            onPress={onClick}
            onLayout={!dimensions?.width || !dimensions?.height ? onLayoutSetDimensionsCallback : undefined}
            style={styles.container}
        >
            <ImageIconSVG
                {...source}
                name={name}
                dimensions={dimensions}
                initialDimensions={initialDimensions}
                styles={styles.image}
            />
        </Pressable>
    );
};

export const ImageEnlarged: FunctionComponent<ImageEnlargedProps> = props => {
    const [dimensions, setDimensions] = useState<DimensionsType>();
    const { visible, setEnlarged, source, initialDimensions, styles, name } = props;

    const onLayoutSetDimensionsCallback = useCallback(
        ({ nativeEvent: { layout } }: LayoutChangeEvent) =>
            onLayoutSetDimensions(layout.width, layout.height, setDimensions, initialDimensions),
        [initialDimensions]
    );

    return (
        <Modal
            visible={visible}
            onRequestClose={() => setEnlarged(false)}
            onDismiss={() => setEnlarged(false)}
            transparent
            animationType="fade"
            supportedOrientations={[
                "portrait",
                "portrait-upside-down",
                "landscape",
                "landscape-left",
                "landscape-right"
            ]}
        >
            {initialDimensions?.width && initialDimensions?.height ? (
                <Pressable
                    onPress={() => setEnlarged(false)}
                    onLayout={!dimensions?.width || !dimensions?.height ? onLayoutSetDimensionsCallback : undefined}
                    style={styles.backdrop}
                >
                    <Pressable onPress={null}>
                        <ImageIconSVG
                            {...source}
                            name={name}
                            dimensions={dimensions}
                            initialDimensions={initialDimensions}
                            styles={styles.image}
                        />
                    </Pressable>
                </Pressable>
            ) : null}
        </Modal>
    );
};

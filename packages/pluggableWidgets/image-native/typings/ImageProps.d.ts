/**
 * This file was generated from Image.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, NativeIcon, NativeImage } from "mendix";

export type DatasourceEnum = "image" | "imageUrl" | "icon";

export type OnClickTypeEnum = "action" | "enlarge";

export interface ImageProps<Style> {
    name: string;
    style: Style[];
    datasource: DatasourceEnum;
    imageObject?: DynamicValue<NativeImage>;
    defaultImageDynamic?: DynamicValue<NativeImage>;
    imageUrl?: DynamicValue<string>;
    imageIcon?: DynamicValue<NativeIcon>;
    onClickType: OnClickTypeEnum;
    onClick?: ActionValue;
    isBackgroundImage: boolean;
    children?: ReactNode;
}

export interface ImagePreviewProps {
    class: string;
    style: string;
    datasource: DatasourceEnum;
    imageObject: { type: "static"; imageUrl: string } | { type: "dynamic"; entity: string } | null;
    defaultImageDynamic: { type: "static"; imageUrl: string } | { type: "dynamic"; entity: string } | null;
    imageUrl: string;
    imageIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    onClickType: OnClickTypeEnum;
    onClick: {} | null;
    isBackgroundImage: boolean;
    children: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}

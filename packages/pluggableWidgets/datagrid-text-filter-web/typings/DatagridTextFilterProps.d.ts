/**
 * This file was generated from DatagridTextFilter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

export type DefaultFilterEnum =
    | "contains"
    | "startsWith"
    | "endsWith"
    | "greater"
    | "greaterEqual"
    | "equal"
    | "notEqual"
    | "smaller"
    | "smallerEqual";

export interface DatagridTextFilterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    advanced: boolean;
    defaultValue?: DynamicValue<string>;
    defaultFilter: DefaultFilterEnum;
    placeholder?: DynamicValue<string>;
    adjustable: boolean;
    delay: number;
    valueAttribute?: EditableValue<string>;
    onChange?: ActionValue;
    screenReaderButtonCaption?: DynamicValue<string>;
    screenReaderInputCaption?: DynamicValue<string>;
}

export interface DatagridTextFilterPreviewProps {
    class: string;
    style: string;
    advanced: boolean;
    defaultValue: string;
    defaultFilter: DefaultFilterEnum;
    placeholder: string;
    adjustable: boolean;
    delay: number | null;
    valueAttribute: string;
    onChange: {} | null;
    screenReaderButtonCaption: string;
    screenReaderInputCaption: string;
}

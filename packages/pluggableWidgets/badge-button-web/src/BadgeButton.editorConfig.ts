import { BadgeButtonPreviewProps } from "../typings/BadgeButtonProps";
import { StructurePreviewProps } from "@widgets-resources/piw-utils";

export function getPreview(values: BadgeButtonPreviewProps): StructurePreviewProps {
    return {
        type: "RowLayout",
        columnSize: "grow",
        children: [
            {
                type: "RowLayout",
                columnSize: "grow",
                grow: 0,
                children: [
                    {
                        type: "Container",
                        children: [
                            {
                                type: "Text",
                                content: values.label,
                                fontColor: "#FFF",
                                bold: true,
                                fontSize: 8
                            }
                        ],
                        grow: 0,
                        padding: 12
                    },
                    {
                        type: "Container",
                        children: [
                            {
                                type: "Container",
                                children: [
                                    {
                                        type: "Text",
                                        content: values.value,
                                        fontColor: "#264AE5",
                                        bold: true,
                                        fontSize: 8
                                    }
                                ],
                                padding: values.value ? 4 : 8
                            }
                        ],
                        backgroundColor: "#FFF",
                        borderRadius: 16,
                        padding: 8
                    }
                ],
                backgroundColor: "#264AE5",
                borderRadius: 4
            },
            {
                type: "Container"
            }
        ]
    };
}

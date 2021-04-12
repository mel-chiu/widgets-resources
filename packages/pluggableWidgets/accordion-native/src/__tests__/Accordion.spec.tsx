import { createElement } from "react";
import { Pressable, Text } from "react-native";
import { fireEvent, render } from "react-native-testing-library";
import { dynamicValue } from "@mendix/piw-utils-internal";

import { Accordion } from "../Accordion";
import { AccordionProps } from "../../typings/AccordionProps";
import { AccordionStyle } from "../ui/Styles";

const defaultProps: AccordionProps<AccordionStyle> = {
    name: "groupBoxTest",
    style: [],
    showHeader: true,
    collapsible: "collapsibleYesExpanded",
    headerContent: <Text>Header</Text>,
    content: <Text>Content</Text>,
    iconCollapsed: dynamicValue({ type: "glyph", iconClass: "glyphicon-chevron-down" }),
    iconExpanded: dynamicValue({ type: "glyph", iconClass: "glyphicon-chevron-up" })
};

describe("Accordion", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("renders with default styles", () => {
        const component = render(<Accordion {...defaultProps} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders with custom styles", () => {
        const style: AccordionStyle[] = [
            {
                container: {},
                header: {
                    container: {},
                    content: {},
                    icon: {
                        size: 16,
                        color: "#000"
                    }
                },
                content: {}
            }
        ];

        const component = render(<Accordion {...defaultProps} style={style} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders without content", () => {
        const component = render(<Accordion {...defaultProps} content={null} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders without header", () => {
        const component = render(<Accordion {...defaultProps} showHeader={false} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders without header content", () => {
        const component = render(<Accordion {...defaultProps} headerContent={null} />);

        expect(component.toJSON()).toMatchSnapshot();
    });

    it("renders without being collapsible", () => {
        const component = render(<Accordion {...defaultProps} collapsible={"collapsibleNo"} />);
        component.findByTestId("header").then(header => {
            const json = component.toJSON();
            expect(json).toMatchSnapshot();
            fireEvent.press(header);
            expect(json).toMatchSnapshot();
        });
    });

    it("expands content when header is clicked", () => {
        const component = render(<Accordion {...defaultProps} collapsible={"collapsibleYesCollapsed"} />);
        component.findByTestId("header").then(header => {
            const json = component.toJSON();
            expect(json).toMatchSnapshot();
            fireEvent.press(header);
            expect(json).not.toMatchSnapshot();
        });
    });

    it("expands content when header is empty and is clicked", () => {
        const component = render(
            <Accordion {...defaultProps} headerContent={null} collapsible={"collapsibleYesCollapsed"} />
        );
        component.findByTestId("header").then(header => {
            const json = component.toJSON();
            expect(json).toMatchSnapshot();
            fireEvent.press(header);
            expect(json).not.toMatchSnapshot();
        });
    });

    it("does not expand content when a clickable component in the header is clicked", () => {
        const headerContent = <Pressable testID={"customHeaderButton"}>Button</Pressable>;
        const component = render(<Accordion {...defaultProps} headerContent={headerContent} />);
        component.findByTestId("customHeaderButton").then(button => {
            const json = component.toJSON();
            expect(json).toMatchSnapshot();
            fireEvent.press(button);
            expect(json).toMatchSnapshot();
        });
    });
});
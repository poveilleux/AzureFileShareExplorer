import 'react-lazylog';
import React from 'react';

declare module 'react-lazylog' {
    export interface LazyLogProps {
        url: string;
        fetchOptions?: RequestInit;
        stream?: boolean;
        height?: string | number;
        width?: string | number;
        follow?: boolean;
        scrollToLine?: number;
        highlight?: number | number[];
        selectableLines?: boolean;
        formatPart?: (text: string) => React.ReactNode;
        onLoad?: () => any;
        onError?: (error: any) => any;
        onHighlight?: (range: Range) => any;
        rowHeight?: number;
        overscanRowCount?: number;
        containerStyle?: React.CSSProperties;
        style?: React.CSSProperties;

        // additional properties
        enableSearch?: boolean;
        extraLines?: number;
    }

    export class LazyLog extends React.Component<LazyLogProps> {
        static defaultProps: Partial<LazyLogProps>;
    }

    export default LazyLog;
}

import React from "react";

export function Footer({ children }: { children?: React.ReactNode }) {
    const childCount = React.Children.count(children);
    const hasChildren = childCount > 0;

    return (
        <div className="footer light-text">
            <div className="footer-text">Task Manager App - React + TypeScript</div>
            {hasChildren && <>{children}</>}
        </div>
    );
}
import React from "react";

export function Header({ children }: { children?: React.ReactNode }) {
  const childCount = React.Children.count(children);
  const hasChildren = childCount > 0;

  return (
    <div className="header light-text">
      <div className="title">Task Manager</div>
      {hasChildren && <div className="controls">{children}</div>}
    </div>
  );
}

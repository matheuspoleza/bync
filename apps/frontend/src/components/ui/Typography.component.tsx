import React from "react";

export const H1: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    {children}
  </h1>
);

export const H2: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
    {children}
  </h2>
);

export const H3: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
    {children}
  </h3>
);

export const H4: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
    {children}
  </h4>
);

export const Paragraph: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="leading-7">{children}</p>
);

export const Blockquote: React.FC<React.PropsWithChildren> = ({ children }) => (
  <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
);

export const InlineCode: React.FC<React.PropsWithChildren> = ({ children }) => (
  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    {children}
  </code>
);

export const Lead: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="text-xl text-muted-foreground">{children}</p>
);

export const Large: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="text-lg font-semibold">{children}</div>
);

export const Small: React.FC<React.PropsWithChildren> = ({ children }) => (
  <small className="text-sm font-medium leading-none">{children}</small>
);

export const Caption: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p
    className="text-xs text-muted-foreground"
    style={{ fontSize: "10px", opacity: 0.6 }}
  >
    {children}
  </p>
);

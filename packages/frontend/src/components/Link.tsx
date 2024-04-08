import React from "react";
import { WithComponentOverride } from "../utils/type-utils.ts";

import { Link as TanstackLink } from "@tanstack/react-router";

type TanstackLinkProps = Parameters<typeof TanstackLink>[0];

const Link = <T extends React.ElementType>(
  props: WithComponentOverride<TanstackLinkProps, T>,
) => {
  const { component, style, ...rest } = props as any;
  return (
    <TanstackLink
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        ...style,
      }}
      _asChild={component}
      {...rest}
    />
  );
};

export default Link;

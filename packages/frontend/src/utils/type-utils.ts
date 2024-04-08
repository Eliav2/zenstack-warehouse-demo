import React from "react";
import { Simplify } from "type-fest";

export type WithComponentOverride<
  P,
  T extends React.ElementType,
> = Simplify<P> & {
  component?: T;
} & InferProps<T>;

export type InferProps<T extends React.ElementType> =
  T extends React.ComponentType<infer P> ? P : {};

import React from "react";

type Props = {
  condition: boolean;
  renderIf?: () => JSX.Element | null;
  renderElse?: () => JSX.Element | null;
};

export const Render = ({
  condition,
  renderIf = () => null,
  renderElse = () => null,
}: Props) => {
  return condition ? renderIf() : renderElse();
};

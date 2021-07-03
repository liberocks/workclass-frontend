import React from 'react';

import { ShowIfProps } from './type';

export const ShowIf: React.FC<ShowIfProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null
}
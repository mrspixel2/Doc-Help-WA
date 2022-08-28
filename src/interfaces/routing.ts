import {Component, ReactChild, ReactNode} from 'react';

export interface IRoute {
  path: string;
  component: any;
  exact?: boolean;
}

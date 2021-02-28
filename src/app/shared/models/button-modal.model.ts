export interface ButtonModalModel {
  action: () => void;
  label: string;
  enabled?: boolean;
}

export interface ActionOnCloseModalModel {
  action: () => void;
}

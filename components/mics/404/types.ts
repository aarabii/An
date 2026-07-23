import { IconType } from "react-icons";

export interface IconDefinition {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  bg: string;
}

export interface CardTile {
  instanceId: string;
  pairId: string;
  iconData: IconDefinition;
}

export interface ActiveTileMapping {
  digit: number;
  row: number;
  col: number;
  tileIndex: number;
}

import { DropdownProps, InputOnChangeData } from "semantic-ui-react";

export type onDropdownChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void
export type onInputChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void
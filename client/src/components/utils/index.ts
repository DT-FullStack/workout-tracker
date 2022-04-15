import React, { Component } from 'react'
import { InputOnChangeData } from "semantic-ui-react";

type InputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void

export abstract class FormComponent<Props, FormFields> extends Component<Props>{
  abstract state: FormFields

  update: InputOnChangeHandler = ({ target: { value } }, data) => {
    const name = data.name as keyof FormFields;
    const update: Partial<FormFields> = {};
    // @ts-ignore
    update[name] = value;
    this.setState(update);
  }
}


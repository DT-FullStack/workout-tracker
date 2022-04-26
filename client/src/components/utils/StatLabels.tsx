import React from 'react'
import { Label, LabelGroupProps, StrictLabelGroupProps } from 'semantic-ui-react'
import { HasStatistics } from './HasStatistics';

interface StatLabelsProps extends LabelGroupProps {
  stats: HasStatistics
}

const StatLabels = ({ stats, ...labelGroupProps }: StatLabelsProps) => {
  return (
    <Label.Group {...labelGroupProps}>
      {stats.renderStatLabels()}
    </Label.Group>
  )
}

export default StatLabels
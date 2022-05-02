import React from 'react'
import { Label, LabelGroupProps, StrictLabelGroupProps } from 'semantic-ui-react'
import { HasStatistics } from './HasStatistics';

interface StatLabelsProps extends LabelGroupProps {
  stats: HasStatistics
}

const StatLabels = ({ stats, ...labelGroupProps }: StatLabelsProps) => {
  const renderStatLabels = (): JSX.Element =>
    <React.Fragment>
      {stats.getStats().map((stat, s) =>
        typeof stat === 'string'
          ? <Label key={s} content={stat} />
          : <Label key={s} content={stat[0]} detail={stat[1]} />)}
    </React.Fragment>

  return (
    <Label.Group {...labelGroupProps}>
      {renderStatLabels()}
    </Label.Group>
  )
}

export default StatLabels
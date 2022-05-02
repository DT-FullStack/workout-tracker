
import ConfirmButton, { ConfirmButtonProps } from './ConfirmButton'

interface ConfirmDeleteProps extends ConfirmButtonProps {
}

const ConfirmDelete = ({ ...buttonProps }: ConfirmDeleteProps) => {
  return <ConfirmButton {...buttonProps} color="red" icon="trash" content="Delete" />

}

export default ConfirmDelete
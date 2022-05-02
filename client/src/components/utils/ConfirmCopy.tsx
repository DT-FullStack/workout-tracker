
import ConfirmButton, { ConfirmButtonProps } from './ConfirmButton'

const ConfirmCopy = ({ content = "Duplicate", ...buttonProps }: ConfirmButtonProps) => {
  return <ConfirmButton {...buttonProps} color="green" icon="copy" content={content} />
}

export default ConfirmCopy
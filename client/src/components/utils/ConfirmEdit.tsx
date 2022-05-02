
import ConfirmLink, { ConfirmLinkProps } from './ConfirmLink'

const ConfirmEdit = ({ content = "Edit?", ...buttonProps }: ConfirmLinkProps) => {
  return <ConfirmLink {...buttonProps} color="grey" icon="edit" content={content} />
}

export default ConfirmEdit
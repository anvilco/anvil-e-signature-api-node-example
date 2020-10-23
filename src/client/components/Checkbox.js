import Checkbox from 'antd/lib/checkbox'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox).withConfig({
  shouldForwardProp: (prop) => !['displayStyle'].includes(prop),
})`
  .ant-checkbox {
    margin-right: 10px;
  }
  &.ant-checkbox-wrapper {
    line-height: 1.2;
    display: block;
    margin-top: 10px;
    margin-bottom: 14px;

    ${({ displayStyle }) => displayStyle === 'compact' && `
      font-size: 14px;
      padding: 5px 0;
    `}
  }
`

export default StyledCheckbox

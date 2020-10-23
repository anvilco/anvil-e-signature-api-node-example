import Checkbox from 'antd/lib/checkbox'
import styled from 'styled-components'

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox {
    margin-right: 10px;
  }
  &.ant-checkbox-wrapper {
    line-height: 1.2;
    display: block;
    margin-top: 10px;
    margin-bottom: 14px;
  }
  .ant-checkbox-input {
    position: relative;
    top: 1px;
    margin: 0;
  }
`

export default StyledCheckbox

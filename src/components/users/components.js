import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { Text, View, Page } from '@react-pdf/renderer'

export const A4Sheet = styled(Page)`
    width:1000px;
    background: #ffff;
    position: absolute;
    margin: auto auto;
    padding:0.5in;
`

export const CompanyName = styled(Text)`
    font-weight: 700;
    font-size: 22px;
    padding: 0;
    margin: 0;
`

export const InvoiceText = styled(Text)`
    font-weight: 400;
    font-size: 20px;
    margin: 1px 15px;
`
export const RegularText = styled(Text)`
    font-size: 12px;
`

export const SmallText = styled(Text)`
    font-size: 12px;
    font-weight: 400;
    margin: 0;
`
export const SmallLabel = styled(Text)`
    font-size: 14px;
    font-weight: 700;
    margin: 0;
`

export const TotalText = styled(Text)` 
    font-size:16px;
    font-weight: 700;
    color: blue;
    margin-bottom: 20px;
`

export const FlexContainer = styled(View)`
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    margin: 10px 0;
`

export const Stack = styled(View)`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    
`
export const SpaceEvenly = styled(View)`
    display: flex;
    justify-content: space-evenly;

`
let components = {
    Stack,
    SpaceEvenly,
    FlexContainer,
    TotalText,
    SmallText,
    SmallLabel,
    RegularText,
    CompanyName,
    InvoiceText,
    A4Sheet,
}
export default components;


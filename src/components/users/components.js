import React from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const A4Sheet = styled(Paper)`
    hieght: 3508px;
    width: 2480px;
    background: #ffff;
    position: absolute;
    margin: auto auto;
    padding: 1in;
`

export const companyName = styled.h2`
    font-weight: 700;
    font-size: 22px;
`

export const Invoice = styled.h3`
    font-weight: 600;
    font-size: 20px;
`
export const RegularText = styled.span`
    font-size: 12px;
`

export const SmallText = styled.span`
    font-size: 11px;
    font-weight: 400;
`

export const TotalText = styled.span` 
    font-size:12px;
    font-weight: 700;
    color: blue;
`



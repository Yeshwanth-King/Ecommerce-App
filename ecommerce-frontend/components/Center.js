import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`

const Center = ({ children }) => {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}

export default Center

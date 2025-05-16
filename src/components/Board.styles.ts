import styled from '@emotion/styled'


export const MQ = {
  m: 600,
  l: 1024,
  xl: 1440
} as const

export const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    
    @media (max-width: ${MQ.l}px) {
        width: auto;
        flex-direction: column;
    }
`
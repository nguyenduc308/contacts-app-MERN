import styled from 'styled-components';

export const HeaderStyled = styled.header`
    background-color: #fff;
    box-shadow: 1px 1px 2px rgba(0,0,0,.3)
`
export const HeaderContainerStyled = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`
export const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const LogoStyle = styled.div`
    & h2 {
        margin: 0;
        text-decoration: underline;
        font-family: monospace;
        & span {
            border-bottom: 1px solid #333;
        }
    }
`

export const SearchStyled = styled.div`
    width: 320px;
    & input {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        outline: none;
        width: 100%;
    }
`
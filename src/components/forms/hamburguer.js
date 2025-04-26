import styled from 'styled-components'

const HamburguerStyled = styled.div`
    margin: 18px 0;
    span{
        position: relative;
        height: 3px;
        width: 25px;
        background-color: var(--white);
        display: block;
        margin-bottom: 5px;
        transition: all .3s;
    }
    span:nth-child(1){
        transform-origin: left;
    }
    span:nth-child(2){
        transform-origin: center;
    }
    span:nth-child(3){
        transform-origin: left;
    }
    &.active span:nth-child(1){
        transform: rotate(45deg);
        left: 2.5px;
    }
    &.active span:nth-child(2){
        transform: rotate(315deg);
        right: 2px;
    }
    &.active span:nth-child(3){
        transform: scale(0);
    }
`

function Hamburguer({className}) {
    return (
        <HamburguerStyled className={className}>
            <span></span>
            <span></span>
            <span></span>
        </HamburguerStyled>
    )
}

export default Hamburguer

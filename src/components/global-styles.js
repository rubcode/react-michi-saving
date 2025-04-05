import {createGlobalStyle} from 'styled-components'

const GlobalStylesStyled = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

    :root{
        --bg: #fff;
        --buttonBg: #202A3C;
        --primaryColor: #80E4E9;
        --lightPrimaryColor: #AEF6F6;
        --accentColor : #ffb0b6;
        --white : #ffffef;
        --colorFont: #ffffef;
        --containerColor: #fbf3f1;
        --grey: #fafafa ;
        --greyDarken: #eeeeee ;
        --black: #111111;
        --bodyRegular: 400 1rem Roboto;
        --bodyRegularSemiBold: 500 1.2rem Roboto;
        --titleFont: 2rem Roboto;

    }
    [data-theme="dark"] {
        --bg: #E9F5FF;
        --buttonBg: #ffffef;
        --colorFont: #111111;
    }
    body {
        background-color: #1c2431;
        color: var(--white);
        font: var(--bodyRegular);
        margin: 0;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    h1,h2{
        text-align: center;
    }
    .title{
        margin: 0;
        font-size: 2.3remm;
        font-family: Roboto;
        color: var(--white);
        letter-spacing: 2px;
        padding: 0.5rem 1rem;
        text-align: left;
        border-radius: 50px;
        text-align: center;
    }
    .subtitle{
        margin: 0;
        font-size: 2rem;
        font-family: Roboto;
        color: var(--primaryColor);
        letter-spacing: 2px;
        padding: 0.5rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 550px;
    }
    .logo{
        width: 180px;
    }

    @media (max-width: 600px) {
        .title{
            width: 100%;
            text-align: center;
            justify-content: center;
        }
    
    }
`



export default GlobalStylesStyled

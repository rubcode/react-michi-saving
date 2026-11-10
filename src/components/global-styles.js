import {createGlobalStyle} from 'styled-components'

const GlobalStylesStyled = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap');

    :root{
        --bg: #F4E9DC;
        --surface: #FFF8F1;
        --elevated: #FFF8F1;
        --border: #E7D5C4;

        --textPrimary: #5A4036;
        --textSecondary: #8B6253;

        --accent: #E98F82;
        --accentSoft: #E8A6B5;
        --accentTint: rgba(233, 143, 130, 0.16);
        --progress: #D97868;
        --onAccent: #5A4036;

        --warning: #C1502E;
        --danger: #D6483C;

        --shadow: 0 4px 20px rgba(90, 64, 54, 0.08);

        --radius-card: 22px;
        --radius-control: 14px;
        --radius-pill: 999px;

        --font: 'Plus Jakarta Sans', sans-serif;
        --bodyRegular: 400 1rem/1.5 var(--font);
        --bodyMedium: 500 1rem/1.5 var(--font);
        --bodySemiBold: 600 1rem/1.4 var(--font);
        --titleFont: 700 1.75rem/1.25 var(--font);
        --displayFont: 800 2.25rem/1.15 var(--font);
    }

    [data-theme="dark"] {
        --bg: #241C1A;
        --surface: #332623;
        --elevated: #41302B;
        --border: #57423A;

        --textPrimary: #F8EDE4;
        --textSecondary: #CDBBB0;

        --accentTint: rgba(233, 143, 130, 0.22);
        --shadow: none;
    }

    body {
        background-color: var(--bg);
        color: var(--textPrimary);
        font: var(--bodyRegular);
        margin: 0;
        transition: background-color .3s ease, color .3s ease;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :focus-visible{
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }
    ::selection{
        background: var(--accentSoft);
        color: var(--onAccent);
    }
    h1,h2,h3{
        font: var(--titleFont);
        color: var(--textPrimary);
    }
    .amount{
        font-variant-numeric: tabular-nums;
    }

    @media (max-width: 600px) {
        :root{
            --radius-card: 18px;
        }
    }
`

export default GlobalStylesStyled

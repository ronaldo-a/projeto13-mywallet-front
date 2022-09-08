import styled from "styled-components";
import { Link } from "react-router-dom"

export default function Registration() {
    return (
        <Body>
            <h1>MyWallet</h1>
            <form>
                <input type="Nome" placeholder="Nome"></input>
                <input type="E-mail" placeholder="Email"></input>
                <input type="Senha" placeholder="Password"></input>
                <input type="Confirme a senha" placeholder="Password"></input>
                <Link to="/home"><button>Cadastrar</button></Link>
            </form>
            <Link to="/"><p>Já tem uma conta? Entre agora</p></Link>
        </Body>
    )
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        font-weight: 400;
        line-height: 50px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }

    p {
        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        font-weight: 700;
        line-height: 18px;
        color: #FFFFFF;
        text-decoration-line: none;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        width: 326px;
        height: 58px;
        border-radius: 5px;
        border: none;
        margin-bottom: 13px;
        box-sizing: border-box;
        padding-left: 15px;

        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        color: #000000;
    }

    button {
        width: 326px;
        height: 46px;
        background-color: #A328D6;
        border-radius: 5px;
        border: none;
        margin-bottom: 36px;

        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 23px;
        color: #FFFFFF;
    }
`
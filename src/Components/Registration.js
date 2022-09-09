import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Registration() {

    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    async function registrate (e) {

        e.preventDefault();

        if (password !== password2) {
            alert("Senhas não são iguais");
            return;
        }

        const user = {name, email, password};
        
        try {
            await axios.post("localhost:5000/users", user)
            alert("Usuário criado com sucesso! Favor fazer login.");
            navigate("/");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Body>
            <h1>MyWallet</h1>
            <form onSubmit={registrate}>
                <input type="text" value={name} required placeholder="Nome" onChange={e => setName(e.target.value)}></input>
                <input type="email" value={email} required placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
                <input type="password" value={password} required placeholder="Password" onChange={e => setPassword(e.target.value)}></input>
                <input type="password" value={password2} required placeholder="Password" onChange={e => setPassword2(e.target.value)}></input>
                <button type="submit">Cadastrar</button>
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
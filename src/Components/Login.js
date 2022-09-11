import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login () {

    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    async function login (e) {
        e.preventDefault()
        const user = {email,  password}

        try {
            const loginIn = await axios.post("http://localhost:5000/signin", user);
            const {token, userName} = loginIn.data;
            if (token) {
                return navigate("/home", {state: {token, userName}});
            }

            alert(loginIn.response);
            
        } catch (error) {
            alert(error.response.data);
        }
    }

    return (
        <Body>
            <h1>MyWallet</h1>
            <form onSubmit={login}>
                <input type="email" value={email} placeholder="E-mail" required onChange={e => setEmail(e.target.value)}></input>
                <input type="password" value={password} placeholder="Senha" required onChange={e => setPassword(e.target.value)}></input>
                <button type="submit">Entrar</button>
            </form>
            <Link to="/registration"><p>Primeira vez? Cadastre-se</p></Link>
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
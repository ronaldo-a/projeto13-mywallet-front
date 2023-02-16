import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

export default function NewCredit() {

    let navigate = useNavigate();
    let location = useLocation();
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const {token, userName} = location.state

    if (!token) {
        alert("Acesso não permitido!");
        return navigate("/");
    }

    async function addCredit (e) {
        e.preventDefault();

        const date = dayjs().format("DD/MM");
        const type = "credit";
        const config = {headers: {"Authorization": `Bearer ${token}`}};

        let value = parseFloat(amount).toFixed(2);
        value = parseFloat(value);

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/transactions`, {date, description, value, type}, config);
            navigate("/home", {state: {token, userName}});
        } catch (error) {
            alert(error.response.data);
        }
    }

    return (
        <Body>
            <h1>Nova Entrada</h1>
            <form onSubmit={addCredit}>
                <input type="number" value={amount} required placeholder="Valor" onChange={e => setAmount(e.target.value)}></input>
                <input type="text" value={description} required placeholder="Descrição" onChange={e => setDescription(e.target.value)}></input>
                <button type="submit">Salvar entrada</button>
            </form>
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
        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-weight: 700;
        line-height: 30px;
        color: #FFFFFF;
        margin-bottom: 40px;
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
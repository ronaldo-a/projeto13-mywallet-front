import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Transactions from "./Transactions";
import axios from "axios";

export default function Home() {   

    let navigate = useNavigate();
    const location = useLocation();

    if (location.state === null) {
        alert("Acesso não permitido!");
        return navigate("/");
    }

    const {token, userName} = location.state;

    if (!token) {
        alert("Acesso não permitido!");
       return navigate("/");
    }

    async function logOut () {
        const config = {headers: {"Authorization": `Bearer ${token}`}};

        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/logout`, config);
            alert("Usuário deslogado com sucesso!");
            return navigate("/");
        } catch (error) {
            alert(error.response.data);
        }
    }
    
    function addCredit() {
        navigate("/newcredit", {state: {token, userName}});
    }

    function addDebit() {
        navigate("/newdebit", {state: {token, userName}});
    }

    //UI
    return (
        <Body>
            <Top>
                <h1>Olá, {userName}</h1>
                <ion-icon name="exit-outline" onClick={logOut} ></ion-icon>
            </Top>
            <Transactions token={token} logOut={logOut}/>
            <Footer>
                <AddTransaction onClick={addCredit}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p>Nova Entrada</p>
                </AddTransaction>
                <AddTransaction onClick={addDebit}>
                    <ion-icon name="remove-circle-outline"></ion-icon>
                    <p>Nova Saída</p>
                </AddTransaction>
            </Footer>
        </Body>
    )
}

//STYLED COMPONENTS
const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Top = styled.div`
    width: 326px;
    display: flex;
    justify-content: space-between;

    h1 {
        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-weight: 700;
        line-height: 30px;
        color: #FFFFFF;
        margin-bottom: 22px;
    }

    ion-icon {
        font-size: 30px;
        color: #FFFFFF;
    }
`
const Footer = styled.div`
    width: 326px;
    display: flex;
    justify-content: space-between;
`
const AddTransaction = styled.div`
    width: 155px;
    height: 114px;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 9px;
    background-color: #A328D6;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;  

    ion-icon {
        width: 22px;
        height: 22px;
        color: #FFFFFF;
    }

    p {
        font-family: 'Raleway', sans-serif;
        font-size: 17px;
        font-weight: 700;
        line-height: 20px;
        color: #FFFFFF;
    }
`
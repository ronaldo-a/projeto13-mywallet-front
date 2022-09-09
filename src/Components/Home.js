import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Transactions from "./Transactions";

export default function Home() {
    const location = useLocation();

    return (
        <Body>
            <Top>
                <h1>Olá, USER</h1>
                <ion-icon name="exit-outline"></ion-icon>
            </Top>
            <Transactions />
            <Footer>
                <Link to="/newcredit">
                    <AddTransaction>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <p>Nova Entrada</p>
                    </AddTransaction>
                </Link>
                <Link to="/newdebit">
                    <AddTransaction>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <p>Nova Saída</p>
                    </AddTransaction>
                </Link>
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
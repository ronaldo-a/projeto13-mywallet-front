import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Transactions ({token}) {

    let saldo;
    let balance;
    const [historic, setHistoric] = useState([]);

    useEffect(() => {

        async function getTransactions () {
            try {
                const config = { headers: { "Authorization": `Bearer ${token}`}};
                let transactions = await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions`, config);

                setHistoric(transactions.data.reverse());
            } catch (error) {
                alert(error.response.data);
            }
        }

        getTransactions();   
    }, [])

    if (historic.length !== 0) {
        const values = historic.map((transaction) => {
            if (transaction.type === "debit") {
                return (Number(transaction.value) * -1);
            } else {
                return Number(transaction.value);
            }
        })
    
    
        saldo = values.reduce((total, current) => total + current);
        saldo = parseFloat(saldo.toFixed(2));    
        if (saldo < 1) {
            saldo = saldo * -1;
            balance = "negative";
        } else {
            balance = "positive";
        }

    }


    //UI
    if (historic.length === 0) {
        return (
            <HistoricEmpty>
                <p>Não há registros de entrada ou saída</p>
            </HistoricEmpty>
        )
    } else {
        return (
            <>
                <Historic>
                    <Scroll>
                        {historic.map((historic, index) => <Transaction 
                        date={historic.date} 
                        description={historic.description} 
                        value={historic.value} 
                        type={historic.type}
                        key={index}/>)}
                    </Scroll>
                    <Footer balance={balance}>
                        <h4>Saldo</h4>
                        <h3>{saldo}</h3>
                    </Footer>
                </Historic>
            </>
        )
    }
}


function Transaction ({date, description, value, type}) {
    return (
        <TransactionContainer type={type}>
            <TransactionStart>
                <p>{date}</p>
                <h5>{description}</h5>
            </TransactionStart>
            <h6>{value}</h6>
        </TransactionContainer>
    )
}

const HistoricEmpty = styled.div`
    width: 326px;
    height: 446px;
    box-sizing: border-box;
    padding: 23px 12px 10px 12px;
    background-color: #FFFFFF;
    display: flex; 
    align-items: center;
    
    margin: 0 auto 13px auto;
    border-radius: 5px;

    p {
        font-family: 'Raleway', sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }
`
const Historic = styled.div`
    width: 326px;
    height: 446px;
    box-sizing: border-box;
    padding: 23px 12px 10px 12px;
    background-color: #FFFFFF;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    
    margin: 0 auto 13px auto;
    border-radius: 5px;
`
const Scroll = styled.div`
    overflow-y: scroll;
`
const Footer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-self: flex-end;

    h4 {
        font-family: 'Raleway', sans-serif;
        font-size: 17px;
        font-weight: 700;
        line-height: 20px;
        text-align: center;
        color: #000000;
    }

    h3 {
        font-family: 'Raleway', sans-serif;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
        color: ${props => {if (props.balance === "positive") {return "#03AC00"} else {return "#CB1414"}}};
    }
`
const TransactionContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    p {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        color: #C6C6C6;
        margin-right: 10px;
    }

    h5 {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        color: #000000;
    }

    h6 {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        color: ${props => {if (props.type === "credit") {return "#03AC00"} else {return "#C70000"}}};
        justify-self: right;
    }
`
const TransactionStart = styled.div`
    display: flex;
`
import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Transactions ({token, logOut}) {

    let saldo;
    let balance;
    const [historic, setHistoric] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rerender, setRerender] = useState(true);

    useEffect(() => {

        async function getTransactions () {
            try {
                const config = { headers: { "Authorization": `Bearer ${token}`}};
                let transactions = await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions`, config);
                setHistoric(transactions.data.reverse());
                setLoading(false);
            } catch (error) {
                alert("Algo de errado aconteceu. Favor tentar mais tarde.")
                console.log(error);
                logOut();
            }
        }

        getTransactions();   
    }, [rerender])

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
    return(
        <>
        {
            loading === true ?
            <Historic>
                <h4>Carregando...</h4>
            </Historic>
            :
            historic.length === 0 ? 
            <HistoricEmpty><p>Não há registros de entrada ou saída</p></HistoricEmpty>
            :
            <>
                <Historic>
                    <Scroll>
                        {historic.map((historic, index) => <Transaction 
                        id={historic._id}
                        date={historic.date} 
                        description={historic.description} 
                        value={historic.value} 
                        type={historic.type}
                        token={token}
                        setRerender={setRerender}
                        rerender={rerender}
                        key={index}/>)}
                    </Scroll>
                    <Footer balance={balance}>
                        <h4>Saldo</h4>
                        <h3>{saldo}</h3>
                    </Footer>
                </Historic>
            </>
        }
        </>
    )
}


function Transaction ({id, date, description, value, type, token, setRerender, rerender}) {

    async function deleteTransaction() {
        const config = { headers: { "Authorization": `Bearer ${token}`}};
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/transactions/${id}`, config);
        setRerender(!rerender)
    }

    return (
        <TransactionContainer type={type}>
            <TransactionStart>
                <p>{date}</p>
                <h5>{description}</h5>
            </TransactionStart>
            <TransactionEnd>
                <h6>{value}</h6>
                <ion-icon name="trash-outline" onClick={deleteTransaction}></ion-icon>
            </TransactionEnd>
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

    ion-icon {
        width: 20px;
        height: 20px;
        color: black;
        margin-left: 10px;
    }
`
const TransactionStart = styled.div`
    display: flex;
`
const TransactionEnd = styled.div`
    display: flex;
`

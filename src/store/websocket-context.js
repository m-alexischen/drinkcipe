import React, { useState, useEffect } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { getSingleRecipe } from '../components/lib/api';

const SOCKET_URL = 'http://localhost:8080/ws';

const WebSocketContext = React.createContext({
    isConnect: false,
    connect: () => {},
    disconnect: () => {},
    send: () => {},
    subscribeHandler: () => {},
    unSubscribeHandler: () => {}
});

let stompClient;
let subscribeFns = [];

export const WebSocketContextProvider = (props) =>{
    const [isConnect, setIsConnect] = useState(false);
    // const [stompClient, setStompClient] = useState(undefined);

    const connect = ()=>{
        let Sock = new SockJS(SOCKET_URL);
        stompClient = over(Sock);
        // stompClient.debug = null
        stompClient.connect({"Authorization": 'Bearer '+localStorage.getItem('token')}, onConnected, onError);
    };
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const onConnected = () => {
        stompClient.subscribe('/user/topic/notification', onMessageReceived);
        setIsConnect(true);
        setTimeout(send({}), 10000);
    }

    const onError = (err) => {
        console.log(err);   
    }

    const subscribeHandler = (fn) =>{
        let isFound = false;
        for(let f of subscribeFns){
            if(f.callback === fn){
                isFound = true;
            }
        }
        if(!isFound){
            subscribeFns.push({callback : fn});
        }
    }

    const unSubscribeHandler = (fn) =>{
        for(let i = 0 ; i < subscribeFns.length ; i++){
            let f = subscribeFns[i];
            if(f.callback === fn){
                subscribeFns.splice( i, 1 );
            }
        }
    }

    const onMessageReceived = (payload)=>{
        for(let f of subscribeFns){
            f.callback(JSON.parse(payload.body));
        }
    }

    const send = (data) => {
        stompClient.send("/message/client", {"Authorization": 'Bearer '+localStorage.getItem('token')}, data);
    }

    const disconnect = () =>{
        stompClient.disconnect(() => {
            console.log('User log out');
        })
        setIsConnect(false);
    }

    useEffect(() => {
        if (!isConnect){
            let con = localStorage.getItem('token');
            
            if(con !== 'undefined' && con !== null){
                setIsConnect(con);
                connect();
            }
        }
    },[isConnect]);

    const contextValue = {
        isConnect: isConnect,
        connect: connect,
        disconnect: disconnect,
        send: send,
        subscribeHandler: subscribeHandler,
        unSubscribeHandler: unSubscribeHandler
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {props.children}
        </WebSocketContext.Provider>
    );
}

export default WebSocketContext;
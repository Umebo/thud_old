import { messageCallbackType, Stomp } from "@stomp/stompjs";
import SockJS from 'sockjs-client';

let stompClient: any

const connect = (onMessage: messageCallbackType, onJoin:messageCallbackType) => {
    const socket = new SockJS('/movement');
    stompClient = Stomp.over(socket);
    
    stompClient.connect({}, function(frame: any) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/mss', onMessage);
        stompClient.subscribe('/topic/join', onJoin);
    });
}

const sendMoveInfo = (moveData: string) => {
    stompClient.send('/app/message', {}, moveData);
}

export { sendMoveInfo };
export default connect;
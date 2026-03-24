import { useEffect, useState, useRef } from 'react';
import { websocketService } from '@/services/websocket.service';

export const useWebSocket = (onMessage?: (message: any) => void) => {
    const [connected, setConnected] = useState(false);
    const subscriptionRef = useRef<any>(null);
    const onMessageRef = useRef(onMessage);

    // Update ref khi callback thay đổi
    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        websocketService.connect(token, () => {
            setConnected(true);

            subscriptionRef.current = websocketService.subscribe(
                '/user/queue/messages',
                (message) => onMessageRef.current?.(message)
            );
        });

        return () => {
            subscriptionRef.current?.unsubscribe();
            websocketService.disconnect();
            setConnected(false);
        };
    }, []); // Chỉ chạy 1 lần

    return { connected };
};
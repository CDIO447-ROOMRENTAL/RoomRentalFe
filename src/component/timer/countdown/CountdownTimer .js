import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ seconds }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(seconds);
    const [color, setColor] = useState("black");

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingSeconds(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(timer);
                    // Thực hiện hành động khi đếm ngược kết thúc, ví dụ: hiển thị thông báo, gọi hàm callback, vv.
                    return 0;
                }
                if (prevSeconds <= (21)) {
                    setColor("red")
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    const formatTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <p style={{ color: color }}>{formatTime(remainingSeconds)}</p>
    );
};

export default CountdownTimer;

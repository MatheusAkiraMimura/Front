// useTokenExpiration.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useTokenExpiration = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const tokenTime = localStorage.getItem('tokenTime');
            const idUser = localStorage.getItem('idUser');
            if (!idUser || !tokenTime || Date.now() - parseInt(tokenTime, 10) > 10800000) { // 3 horas
                localStorage.removeItem('token');
                localStorage.removeItem('tokenTime');
                localStorage.removeItem('idUser');
                localStorage.removeItem('userName');
                if (tokenTime) {
                    navigate("/");
                    window.location.reload();
                }
            }

            if (!tokenTime) {
                navigate("/");
                window.location.reload();
            }
        }, 60000); // Verifica a cada 1 minutos

        return () => clearInterval(intervalId);
    }, [navigate]);
};

export default useTokenExpiration;

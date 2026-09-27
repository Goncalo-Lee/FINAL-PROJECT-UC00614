"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function TwoFactorManager() {
    const [isEnabling, setIsEnabling] = useState(false);
    const [qrCodeUri, setQrCodeUri] = useState("");
    const [passcode, setPasscode] = useState("");

    const handleEnableClick = async () => {
        // É aqui que a mágica vai acontecer!
        setIsEnabling(true);
        const response = await authClient.twoFactor.generate();

        if (response.data) {
            setQrCodeUri(response.data.totpURI);
        }
    };

    const check2FA = async () => {
        authClient.twoFactor.verify({passcode: passcode}).then((response) => {})
    }

    return (
        <div className="p-4 border rounded-md">
            <h2 className="text-xl font-bold mb-4">Autenticação de Dois Fatores (2FA)</h2>

            {!isEnabling ? (
                <button
                    onClick={handleEnableClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Ativar 2FA
                </button>
            ) : (
                <div>
                    {qrCodeUri === "" ? (
                        <p>Carregando QR Code...</p>
                    ) : (
                        <>
                            <QRCodeSVG value={qrCodeUri} />
                            <input
                                type="text"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                className="border p-2 rounded"
                            />
                            <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={() => {check2FA}}>
                                Verificar Código
                            </button>
                        </>
                    )}
                    {/* Aqui vai entrar o QR Code e o input para o usuário digitar os 6 dígitos depois */}
                    <p>Preparando o 2FA...</p>
                </div>
            )}
        </div>
    );
}
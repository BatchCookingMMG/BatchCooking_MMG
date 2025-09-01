export async function logToBack(level: "INFO" | "WARN" | "ERROR", message: string, error?: Error) {
    const payload = {
        level,
        message,
        stackTrace: error?.stack ?? null,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
    };

    try {
        const API_URL = import.meta.env.VITE_API_URL;
        await fetch(`${API_URL}/api/logs/event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch {
        console.warn("Impossible d'envoyer le log au back");
    }
}
export async function logInfo(message: string, context?: string) {
    const fullMessage = context ? `[${context}] ${message}` : message;
    await logToBack("INFO", fullMessage);
}

export async function logWarn(message: string, error?: Error) {
    return logToBack("WARN", message, error);
}

export async function logError(message: string, error?: Error) {
    return logToBack("ERROR", message, error);
}

export async function logToBack(level: "INFO" | "WARN" | "ERROR", message: string, error?: Error) {
    const payload = {
        level,
        message,
        stackTrace: error?.stack ?? null,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
    };

    try {
        await fetch("/api/logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch {
        console.warn("Impossible d'envoyer le log au back");
    }
}
export async function logInfo(message: string) {
    return logToBack("INFO", message);
}

export async function logWarn(message: string, error?: Error) {
    return logToBack("WARN", message, error);
}

export async function logError(message: string, error?: Error) {
    return logToBack("ERROR", message, error);
}

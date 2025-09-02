import logging
import requests
import sys

class BackendLogHandler(logging.Handler):
    """Handler qui envoie les logs au backend via HTTP POST."""

    def __init__(self, backend_url: str):
        super().__init__()
        self.backend_url = backend_url

    def emit(self, record):
        log_entry = self.format(record)
        payload = {"message": log_entry, "level": record.levelname.lower()}
        try:
            requests.post(self.backend_url, json=payload, timeout=3)
        except Exception as e:
            # On loggue localement si l’envoi échoue
            print(f"[WARN] Impossible d'envoyer le log au backend : {e}", file=sys.stderr)


def get_logger(name: str, backend_url: str):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

    # Backend handler
    backend_handler = BackendLogHandler(backend_url)
    backend_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

    logger.addHandler(console_handler)
    logger.addHandler(backend_handler)

    return logger

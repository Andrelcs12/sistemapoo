from flask import Flask
from flask_cors import CORS
from controllers.user_controller import user_controller
import logging

app = Flask(__name__)
CORS(app)

app.register_blueprint(user_controller)

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S"
)

@app.before_request
def log_requisicao():
    app.logger.debug(" Nova requisição recebida")

@app.route("/")
def home():
    app.logger.info(" Rota / acessada")
    return {"msg": "API Flask rodando"}


if __name__ == "__main__":
    app.logger.info(" Servidor Flask iniciado")
    app.run(debug=True)

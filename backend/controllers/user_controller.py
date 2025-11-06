from flask import Blueprint, jsonify, request

user_controller = Blueprint('user_controller', __name__)

class User:
    def __init__(self, user_id, nome, email):
        self.id = user_id
        self.nome = nome
        self.email = email

    def to_dict(self):
        return {"id": self.id, "nome": self.nome, "email": self.email}



usuarios = []
contador = 1

@user_controller.route("/usuarios", methods=["GET"])
def listar_usuarios():
    return jsonify([u.to_dict() for u in usuarios])


@user_controller.route("/usuarios", methods=["POST"])
def criar_usuario():
    global contador
    data = request.json
    novo = User(contador, data["nome"], data["email"])
    usuarios.append(novo)
    contador += 1
    return jsonify(novo.to_dict()), 201


@user_controller.route("/usuarios/<int:user_id>", methods=["PUT"])
def atualizar_usuario(user_id):
    data = request.json
    for u in usuarios:
        if u.id == user_id:
            u.nome = data["nome"]
            u.email = data["email"]
            return jsonify(u.to_dict())
    return jsonify({"erro": "Usuário não encontrado"}), 404


@user_controller.route("/usuarios/<int:user_id>", methods=["DELETE"])
def deletar_usuario(user_id):
    global usuarios
    usuarios = [u for u in usuarios if u.id != user_id]
    return jsonify({"msg": "Usuário deletado"})

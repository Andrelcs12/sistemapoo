from flask import Blueprint, jsonify, request

reserva_controller = Blueprint('reserva_controller', __name__)

class Reserva:
    def __init__(self, reserva_id, aluno_nome, atividade, data, horario, status="Reservado"):
        self.id = reserva_id
        self.aluno_nome = aluno_nome
        self.atividade = atividade
        self.data = data
        self.horario = horario
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "aluno_nome": self.aluno_nome,
            "atividade": self.atividade,
            "data": self.data,
            "horario": self.horario,
            "status": self.status
        }

# Lista em memória para armazenar reservas
reservas = []
contador = 1

# --- Rotas ---

@reserva_controller.route("/reservas", methods=["GET"])
def listar_reservas():
    """Listar todas as reservas"""
    return jsonify([r.to_dict() for r in reservas])


@reserva_controller.route("/reservas", methods=["POST"])
def criar_reserva():
    """Criar nova reserva"""
    global contador
    data = request.json
    nova = Reserva(
        reserva_id=contador,
        aluno_nome=data["aluno_nome"],
        atividade=data["atividade"],
        data=data["data"],
        horario=data["horario"],
        status=data.get("status", "Reservado")
    )
    reservas.append(nova)
    contador += 1
    return jsonify(nova.to_dict()), 201


@reserva_controller.route("/reservas/<int:reserva_id>", methods=["PUT"])
def atualizar_reserva(reserva_id):
    """Atualizar dados de uma reserva"""
    data = request.json
    for r in reservas:
        if r.id == reserva_id:
            r.aluno_nome = data.get("aluno_nome", r.aluno_nome)
            r.atividade = data.get("atividade", r.atividade)
            r.data = data.get("data", r.data)
            r.horario = data.get("horario", r.horario)
            r.status = data.get("status", r.status)
            return jsonify(r.to_dict())
    return jsonify({"erro": "Reserva não encontrada"}), 404


@reserva_controller.route("/reservas/<int:reserva_id>", methods=["DELETE"])
def deletar_reserva(reserva_id):
    """Deletar uma reserva pelo ID"""
    global reservas
    reservas = [r for r in reservas if r.id != reserva_id]
    return jsonify({"msg": "Reserva deletada"})

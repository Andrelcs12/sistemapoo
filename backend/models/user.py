class User:
    def __init__(self, plano, nome, email, cpf,idade ):
        self.cpf = cpf
        self.nome = nome
        self.email = email
        self.plano = plano
        self.idade = idade
        self.reservas = [] # reserva do usuario

    def adicionar_reserva(self, reserva):
        self.reservas.append(reserva)

    def to_dict(self):
        return {"Nome": self.nome,
                "idade": self.idade,
                "CPF:": self.cpf,
                "Email:": self.email, 
                "Plano:": self.plano,
                "Reservas:": [r.to_dict() for r in self.reservas]} # cria uma lista convertendo cada reserva do usuário usando o método to_dict()
    
class Reserva:
    def __init__(self, atividade, data, horario, status="Reservado"):
        self.atividade = atividade
        self.data = data
        self.horario = horario
        self.status = status

    def to_reserv(self):
        return {"Atividade:": self.atividade,
                "Data:": self.data,
                "Horario:": self.horario,
                "Status:": self.status}
    

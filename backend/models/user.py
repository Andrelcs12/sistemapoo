class User:
    def __init__(self, plano, nome, email, CPF,idade ):
        self.CPF = CPF
        self.nome = nome
        self.email = email
        self.plano = plano
        self.idade = idade

    def to_dict(self):
        return {"Nome": self.nome, "idade": self.idade, "CPF:": self.CPF, "Email:": self.email, "Plano:": self.plano }
    
class Reserva:
    def __init__(self, atividade, data, horario, status):
        self.atividade = atividade
        self.data = data
        self.horario = horario
        self.status = status

    def to_reserv(self):
        return {"Atividade:": self.atividade,"Data:": self.data, "Horario:": self.horario, "Status:": self.status}
from user import User
from user import Reserva

class SistemaAcademia:
    def __init__(self):
        self.usuarios = {} # Usar CPF como chave

    def cadastrar_usuarios(self, plano, nome, email, cpf, idade):
        if cpf in self.usuarios:
            return None # Usuario existe cabeção
        
        user = User(plano, nome, email, cpf, idade)
        self.usuarios[cpf] = user
        return user 
    
    def criar_reserva(self, cpf, atividade, data, horario, status="Reservado"):
        user = self.usuarios.get(cpf)
        if not user: 
            return None # Validação 
        
        reserva = Reserva(atividade, data, horario, status)
        user.adicionar_reserva(reserva) # Vai jogar todas as reserva desse user para uma lista no fim
        return reserva
    
    def listar_usuarios(self, ):
        return [user.to_dict() for user in self.usuarios.values()]
    def listar_reservas(self,cpf):
        user = self.usuarios.get(cpf)
        if not user:
            return None
        return [r.to_dict() for r in user.reservas]
    
    def atualizar_reserva(self, cpf, index_reserva, novo_status):
        user = self.usuarios.get(cpf)
        if not user:
            return None
        try:
            reserva = user.reservas[index_reserva]
            reserva.status = novo_status
            return reserva.to_dict()
        except IndexError:
            return None

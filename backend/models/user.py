class User:
    def __init__(self, user_id, nome, email):
        self.id = user_id
        self.nome = nome
        self.email = email

    def to_dict(self):
        return {"id": self.id, "nome": self.nome, "email": self.email}

class Engine:
    def __init__(self, id, name, manufacture_date):
        self.id = id
        self.name = name
        self.manufacture_date = manufacture_date
        
class EngineDatabase:
    def __init__(self):
        self.filename = 'engines.txt'
        self.engines = self.load_engines_from_file(self.filename)

    def get_engines(self):
        return self.engines

    def update_engine(self, id, manufacture_date):
        for engine in self.engines:
            if engine.id == id:
                engine.manufacture_date = manufacture_date
                self.save_engines_to_file(self.filename, self.engines)
                return True
        return False


    def load_engines_from_file(self, filename):
        engines = []
        with open(filename, 'r') as file:
            for line in file:
                id, name, manufacture_date = line.strip().split(',')
                engines.append(Engine(int(id), name, manufacture_date))
        return engines

    def save_engines_to_file(self, filename, engines):
        with open(filename, 'w') as file:
            for engine in engines:
                file.write(f'{engine.id},{engine.name},{engine.manufacture_date}\n')
        return 
                

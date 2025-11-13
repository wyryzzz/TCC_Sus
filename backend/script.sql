drop database if exists saudedb;

create database saudedb;

use saudedb;

select * from usuario;

create table funcionarios (
    id int primary key auto_increment,
    nome varchar(255) not null,
    cpf varchar(14),
    departamento varchar(100),
    salario decimal(10,2),
    cargo varchar(100),
    email varchar(255) unique,
    telefone varchar(20),
    endereco varchar(255),
    funcionario_ativo boolean,
    data_admissao date
);

create table especialidades (
    id int auto_increment primary key,
    nome varchar(50) not null,
    valor int not null,
    cor varchar(10)
);

create table medicos (
    id int primary key auto_increment,
    id_funcionario int not null,
    nome varchar(100) not null,
    email varchar(100) not null unique,
    telefone varchar(20),
    salario decimal(10,2),
    crm varchar(50) not null unique,
    id_especialidade int,
    foreign key (id_funcionario) references funcionarios(id)
        on delete cascade on update cascade,
    foreign key (id_especialidade) references especialidades(id)
        on delete set null on update cascade
);

create table pacientes (
    id int auto_increment primary key,
    nome varchar(255) not null,
    cpf varchar(14) unique,
    cartao_sus varchar(30) unique,
    data_nascimento date,
    telefone varchar(20),
    email varchar(100),
    endereco varchar(255),
    tipo_sanguineo varchar(5),
    alergias varchar(255),
    contato_emergencia varchar(100),
    status enum('ativo','inativo') default 'ativo'
);

create table unidades_saude (
    id int primary key auto_increment,
    nome varchar(255) not null,
    endereco varchar(255)
);

create table consultas (
    id int auto_increment primary key,
    paciente_id int not null,
    funcionario_id int not null,
    data_hora datetime not null,
    tipo_consulta varchar(100),
    unidade varchar(100),
    status enum('Agendada','Confirmada','Em Andamento','Concluída') default 'Agendada',
    foreign key (paciente_id) references pacientes(id) on delete cascade,
    foreign key (funcionario_id) references funcionarios(id) on delete cascade
);

select * from medicos;

create table medicamentos (
    id int auto_increment primary key,
    nome varchar(255) not null,
    principio_ativo varchar(255),
    dosagem_forma varchar(100),
    estoque int default 0,
    fornecedor varchar(255),
    validade date,
    status enum('disponível','indisponível') default 'disponível'
);

create table prescricoes (
    id int auto_increment primary key,
    paciente_id int not null,
    medicamento varchar(255) not null,
    dosagem varchar(100),
    frequencia varchar(100),
    inicio date,
    fim date,
    observacoes varchar(500),
    medico_nome varchar(100),
    foreign key (paciente_id) references pacientes(id) on delete cascade
);

create table usuario (
    id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(255) unique,
    senha varchar(255) not null,
    tipo_usuario enum('admin','paciente','medico','user') default 'user'
);

create table consultas_por_mes (
    id int auto_increment primary key,
    mes varchar(10) not null,
    consultas int not null,
    pacientes int not null
);

create table medicamentos_consumo (
    id int auto_increment primary key,
    medicamento varchar(50) not null,
    consumo int not null,
    estoque int not null
);


create table pacientes_por_idade (
    id int auto_increment primary key,
    faixa_etaria varchar(10) not null,
    quantidade int not null
);

INSERT INTO funcionarios (nome, cpf, departamento, salario, cargo, email, telefone, endereco, funcionario_ativo, data_admissao) VALUES
('Dr. João Silva', '123.456.789-01', 'Medicina', 15000.00, 'Médico Clínico', 'joao.silva@saude.com', '(11) 98765-4321', 'Rua das Flores, 123 - São Paulo/SP', TRUE, '2020-01-15'),
('Dra. Maria Santos', '234.567.890-12', 'Medicina', 18000.00, 'Médica Cardiologista', 'maria.santos@saude.com', '(11) 98765-4322', 'Av. Paulista, 1000 - São Paulo/SP', TRUE, '2019-03-20'),
('Dr. Pedro Oliveira', '345.678.901-23', 'Medicina', 16000.00, 'Médico Ortopedista', 'pedro.oliveira@saude.com', '(11) 98765-4323', 'Rua Augusta, 500 - São Paulo/SP', TRUE, '2021-06-10'),
('Dra. Ana Costa', '456.789.012-34', 'Medicina', 17000.00, 'Médica Pediatra', 'ana.costa@saude.com', '(11) 98765-4324', 'Rua Consolação, 800 - São Paulo/SP', TRUE, '2020-08-05'),
('Dr. Carlos Mendes', '567.890.123-45', 'Medicina', 19000.00, 'Médico Neurologista', 'carlos.mendes@saude.com', '(11) 98765-4325', 'Av. Rebouças, 1200 - São Paulo/SP', TRUE, '2018-11-12'),
('Dra. Juliana Lima', '678.901.234-56', 'Medicina', 15500.00, 'Médica Dermatologista', 'juliana.lima@saude.com', '(11) 98765-4326', 'Rua Vergueiro, 600 - São Paulo/SP', TRUE, '2021-02-28'),
('Dr. Roberto Alves', '789.012.345-67', 'Medicina', 16500.00, 'Médico Psiquiatra', 'roberto.alves@saude.com', '(11) 98765-4327', 'Rua da Mooca, 300 - São Paulo/SP', TRUE, '2019-09-15'),
('Dra. Fernanda Rocha', '890.123.456-78', 'Medicina', 17500.00, 'Médica Ginecologista', 'fernanda.rocha@saude.com', '(11) 98765-4328', 'Av. Ipiranga, 700 - São Paulo/SP', TRUE, '2020-04-22'),
('Paula Souza', '123.456.789-02', 'Enfermagem', 4500.00, 'Enfermeira', 'paula.souza@saude.com', '(11) 98765-4331', 'Rua Barão de Itapetininga, 200 - São Paulo/SP', TRUE, '2020-05-12'),
('Ricardo Gomes', '234.567.890-13', 'Enfermagem', 4200.00, 'Enfermeiro', 'ricardo.gomes@saude.com', '(11) 98765-4332', 'Av. São João, 400 - São Paulo/SP', TRUE, '2021-03-08'),
('Tatiana Barros', '345.678.901-24', 'Enfermagem', 4800.00, 'Enfermeira Chefe', 'tatiana.barros@saude.com', '(11) 98765-4333', 'Rua Boa Vista, 150 - São Paulo/SP', TRUE, '2018-10-25'),
('Marcos Ribeiro', '456.789.012-35', 'Enfermagem', 4300.00, 'Enfermeiro', 'marcos.ribeiro@saude.com', '(11) 98765-4334', 'Av. Brigadeiro, 300 - São Paulo/SP', TRUE, '2022-02-14'),
('Bruno Pereira', '678.901.234-57', 'Administração', 5500.00, 'Gerente Administrativo', 'bruno.pereira@saude.com', '(11) 98765-4336', 'Rua Liberdade, 250 - São Paulo/SP', TRUE, '2019-04-17'),
('Gabriela Nunes', '789.012.345-68', 'Administração', 3800.00, 'Assistente Administrativo', 'gabriela.nunes@saude.com', '(11) 98765-4337', 'Av. Ibirapuera, 500 - São Paulo/SP', TRUE, '2021-08-22'),
('Mariana Dias', '901.234.567-80', 'Recepção', 2800.00, 'Recepcionista', 'mariana.dias@saude.com', '(11) 98765-4339', 'Rua Pinheiros, 100 - São Paulo/SP', TRUE, '2022-03-05'),
('Felipe Teixeira', '012.345.678-91', 'Recepção', 2900.00, 'Recepcionista', 'felipe.teixeira@saude.com', '(11) 98765-4340', 'Av. Faria Lima, 800 - São Paulo/SP', TRUE, '2021-09-12'),
('Amanda Moreira', '123.456.789-03', 'Farmácia', 3500.00, 'Farmacêutica', 'amanda.moreira@saude.com', '(11) 98765-4341', 'Rua Tatuapé, 350 - São Paulo/SP', TRUE, '2020-07-28'),
('Vanessa Correia', '345.678.901-25', 'Laboratório', 4500.00, 'Biomédica', 'vanessa.correia@saude.com', '(11) 98765-4343', 'Av. Santo Amaro, 600 - São Paulo/SP', TRUE, '2019-05-20'),
('Rodrigo Cunha', '890.123.456-70', 'TI', 6000.00, 'Analista de Sistemas', 'rodrigo.cunha@saude.com', '(11) 98765-4348', 'Rua Vila Mariana, 450 - São Paulo/SP', TRUE, '2020-12-03'),
('Isabela Freitas', '901.234.567-81', 'RH', 4500.00, 'Analista de RH', 'isabela.freitas@saude.com', '(11) 98765-4349', 'Av. Jabaquara, 200 - São Paulo/SP', FALSE, '2021-07-09');

INSERT INTO Medicamentos (nome, principio_ativo, dosagem_forma, estoque, fornecedor, validade, status) VALUES
('Paracetamol', 'Paracetamol', '500mg - Comprimido', 5000, 'FarmaLab', '2026-12-31', 'disponível'),
('Ibuprofeno', 'Ibuprofeno', '600mg - Comprimido', 3500, 'MediPharm', '2026-11-30', 'indisponível'),
('Amoxicilina', 'Amoxicilina', '500mg - Cápsula', 2800, 'BioMed', '2026-10-15', 'disponível'),
('Dipirona', 'Dipirona Sódica', '500mg - Comprimido', 4200, 'FarmaLab', '2027-01-20', 'disponível'),
('Omeprazol', 'Omeprazol', '20mg - Cápsula', 3100, 'GenericoPro', '2026-09-30', 'disponível'),
('Losartana', 'Losartana Potássica', '50mg - Comprimido', 2600, 'CardioMed', '2026-08-25', 'disponível'),
('Metformina', 'Metformina HCl', '850mg - Comprimido', 3800, 'DiabetCare', '2027-02-28', 'disponível'),
('Atenolol', 'Atenolol', '25mg - Comprimido', 2200, 'CardioMed', '2026-07-14', 'disponível'),
('Sinvastatina', 'Sinvastatina', '20mg - Comprimido', 2900, 'LipidControl', '2026-12-10', 'disponível'),
('Azitromicina', 'Azitromicina', '500mg - Comprimido', 1800, 'AntiBio', '2026-06-30', 'disponível'),
('Clonazepam', 'Clonazepam', '2mg - Comprimido', 1200, 'NeuroCare', '2026-05-18', 'disponível'),
('Fluoxetina', 'Fluoxetina HCl', '20mg - Cápsula', 2700, 'MentalHealth', '2026-10-25', 'disponível'),
('Hidroclorotiazida', 'Hidroclorotiazida', '25mg - Comprimido', 3200, 'DiuretPro', '2026-12-28', 'disponível'),
('Levotiroxina', 'Levotiroxina Sódica', '50mcg - Comprimido', 2500, 'ThyroidCare', '2026-08-19', 'disponível'),
('Salbutamol', 'Salbutamol', '100mcg - Aerossol', 1900, 'RespiraBem', '2026-11-08', 'disponível'),
('Vitamina D', 'Colecalciferol', '1000UI - Cápsula', 4500, 'VitaSaúde', '2027-06-30', 'disponível'),
('Vitamina C', 'Ácido Ascórbico', '500mg - Comprimido', 5200, 'VitaSaúde', '2027-05-15', 'disponível'),
('Loratadina', 'Loratadina', '10mg - Comprimido', 3700, 'AlergiZero', '2026-10-23', 'disponível'),
('Atorvastatina', 'Atorvastatina Cálcica', '20mg - Comprimido', 2900, 'LipidControl', '2026-09-20', 'disponível'),
('Captopril', 'Captopril', '25mg - Comprimido', 3300, 'PressãoFlex', '2027-03-15', 'disponível');

INSERT INTO usuario (nome, email, senha, tipo_usuario) VALUES
('Admin Sistema', 'admin@saude.com', MD5('admin123hash'), 'admin'),
('João Silva', 'joao.silva@saude.com', MD5('senha123hash'), 'medico'),
('Maria Santos', 'maria.santos@saude.com', MD5('senha123hash'), 'medico'),
('Pedro Oliveira', 'pedro.oliveira@saude.com', MD5('senha123hash'), 'medico'),
('Ana Costa', 'ana.costa@saude.com', MD5('senha123hash'), 'medico'),
('Carlos Mendes', 'carlos.mendes@saude.com', MD5('senha123hash'), 'medico'),
('Juliana Lima', 'juliana.lima@saude.com', MD5('senha123hash'), 'medico'),
('Roberto Alves', 'roberto.alves@saude.com', MD5('senha123hash'), 'medico'),
('Fernanda Rocha', 'fernanda.rocha@saude.com', MD5('senha123hash'), 'medico'),
('Paula Souza', 'paula.souza@saude.com', MD5('senha123hash'), 'user'),
('Ricardo Gomes', 'ricardo.gomes@saude.com', MD5('senha123hash'), 'user'),
('Bruno Pereira', 'bruno.pereira@saude.com', MD5('senha123hash'), 'admin'),
('Mariana Dias', 'mariana.dias@saude.com', MD5('senha123hash'), 'user'),
('José Santos Silva', 'jose.santos@email.com', MD5('paciente123hash'), 'paciente'),
('Maria Oliveira', 'maria.oliveira@email.com', MD5('paciente123hash'), 'paciente'),
('Antonio Souza', 'antonio.souza@email.com', MD5('paciente123hash'), 'paciente'),
('Francisca Lima', 'francisca.lima@email.com', MD5('paciente123hash'), 'paciente'),
('Paulo Alves', 'paulo.alves@email.com', MD5('paciente123hash'), 'paciente'),
('Rodrigo Cunha', 'rodrigo.cunha@saude.com', MD5('senha123hash'), 'admin'),
('Isabela Freitas', 'isabela.freitas@saude.com', MD5('senha123hash'), 'user');

INSERT INTO especialidades (nome, valor, cor) VALUES
('Cardiologia', 850, '#FF6B6B'),
('Ortopedia', 720, '#4ECDC4'),
('Pediatria', 680, '#FFD93D'),
('Neurologia', 920, '#95E1D3'),
('Dermatologia', 650, '#F38181'),
('Psiquiatria', 780, '#AA96DA'),
('Ginecologia', 750, '#FCBAD3'),
('Clínica Geral', 580, '#A8E6CF'),
('Endocrinologia', 800, '#FECA57'),
('Oftalmologia', 690, '#48C9B0'),
('Urologia', 760, '#74B9FF'),
('Pneumologia', 810, '#A29BFE'),
('Gastroenterologia', 790, '#FD79A8'),
('Reumatologia', 770, '#6C5CE7'),
('Oncologia', 950, '#E17055');

INSERT INTO medicos (id_funcionario, nome, email, telefone, salario, crm, id_especialidade) VALUES
(1, 'Dr. João Silva', 'joao.silva@saude.com', '(11) 98765-4321', 15000.00, 'CRM/SP 123456', 8),
(2, 'Dra. Maria Santos', 'maria.santos@saude.com', '(11) 98765-4322', 18000.00, 'CRM/SP 234567', 1),
(3, 'Dr. Pedro Oliveira', 'pedro.oliveira@saude.com', '(11) 98765-4323', 16000.00, 'CRM/SP 345678', 2),
(4, 'Dra. Ana Costa', 'ana.costa@saude.com', '(11) 98765-4324', 17000.00, 'CRM/SP 456789', 3),
(5, 'Dr. Carlos Mendes', 'carlos.mendes@saude.com', '(11) 98765-4325', 19000.00, 'CRM/SP 567890', 4),
(6, 'Dra. Juliana Lima', 'juliana.lima@saude.com', '(11) 98765-4326', 15500.00, 'CRM/SP 678901', 5),
(7, 'Dr. Roberto Alves', 'roberto.alves@saude.com', '(11) 98765-4327', 16500.00, 'CRM/SP 789012', 6),
(8, 'Dra. Fernanda Rocha', 'fernanda.rocha@saude.com', '(11) 98765-4328', 17500.00, 'CRM/SP 890123', 7),
(1, 'Dr. Alberto Mendes', 'alberto.mendes@saude.com', '(11) 98765-5001', 16200.00, 'CRM/SP 131415', 1),
(2, 'Dra. Beatriz Lemos', 'beatriz.lemos@saude.com', '(11) 98765-5002', 15900.00, 'CRM/SP 141516', 3),
(3, 'Dr. Ricardo Borges', 'ricardo.borges@saude.com', '(11) 98765-5003', 17800.00, 'CRM/SP 151617', 11),
(4, 'Dra. Sandra Reis', 'sandra.reis@saude.com', '(11) 98765-5004', 16400.00, 'CRM/SP 161718', 7),
(5, 'Dr. Marcelo Tavares', 'marcelo.tavares@saude.com', '(11) 98765-5005', 18200.00, 'CRM/SP 171819', 9),
(6, 'Dra. Luciana Pires', 'luciana.pires@saude.com', '(11) 98765-5006', 15700.00, 'CRM/SP 181920', 10),
(7, 'Dr. Thiago Novaes', 'thiago.novaes@saude.com', '(11) 98765-5007', 16900.00, 'CRM/SP 192021', 12),
(8, 'Dra. Camila Dias', 'camila.dias@saude.com', '(11) 98765-5008', 17300.00, 'CRM/SP 202122', 13),
(1, 'Dr. Rafael Porto', 'rafael.porto@saude.com', '(11) 98765-5009', 19100.00, 'CRM/SP 212223', 15),
(2, 'Dra. Patricia Lins', 'patricia.lins@saude.com', '(11) 98765-5010', 15400.00, 'CRM/SP 222324', 8),
(3, 'Dr. Gustavo Matos', 'gustavo.matos@saude.com', '(11) 98765-5011', 16700.00, 'CRM/SP 232425', 14),
(4, 'Dra. Vanessa Cruz', 'vanessa.cruz@saude.com', '(11) 98765-5012', 17600.00, 'CRM/SP 242526', 4);

INSERT INTO pacientes (nome, cpf, cartao_sus, data_nascimento, telefone, email, endereco, tipo_sanguineo, alergias, contato_emergencia, status) VALUES
('José Santos Silva', '111.222.333-44', '123456789012345', '1965-03-15', '(11) 91234-5678', 'jose.santos@email.com', 'Rua das Flores, 123 - São Paulo/SP', 'O+', 'Nenhuma', '(11) 91234-5679', 'Inativo'),
('Maria Aparecida Oliveira', '222.333.444-55', '234567890123456', '1972-08-22', '(11) 92345-6789', 'maria.oliveira@email.com', 'Av. Paulista, 456 - São Paulo/SP', 'A+', 'Penicilina', '(11) 92345-6790', 'Ativo'),
('Antonio Carlos Souza', '333.444.555-66', '345678901234567', '1958-11-10', '(11) 93456-7890', 'antonio.souza@email.com', 'Rua Augusta, 789 - São Paulo/SP', 'B+', 'Dipirona', '(11) 93456-7891', 'Ativo'),
('Francisca Lima', '444.555.666-77', '456789012345678', '1980-05-18', '(11) 94567-8901', 'francisca.lima@email.com', 'Rua Consolação, 321 - São Paulo/SP', 'AB+', 'Nenhuma', '(11) 94567-8902', 'Ativo'),
('Paulo Roberto Alves', '555.666.777-88', '567890123456789', '1963-12-25', '(11) 95678-9012', 'paulo.alves@email.com', 'Av. Rebouças, 654 - São Paulo/SP', 'O-', 'Lactose', '(11) 95678-9013', 'Ativo'),
('Ana Paula Costa', '666.777.888-99', '678901234567890', '1990-07-08', '(11) 96789-0123', 'ana.costa@email.com', 'Rua Vergueiro, 987 - São Paulo/SP', 'A-', 'Nenhuma', '(11) 96789-0124', 'Ativo'),
('Carlos Eduardo Martins', '777.888.999-00', '789012345678901', '1975-02-14', '(11) 97890-1234', 'carlos.martins@email.com', 'Rua da Mooca, 147 - São Paulo/SP', 'B-', 'AAS', '(11) 97890-1235', 'Ativo'),
('Mariana Silva Santos', '888.999.000-11', '890123456789012', '1988-09-30', '(11) 98901-2345', 'mariana.santos@email.com', 'Av. Ipiranga, 258 - São Paulo/SP', 'AB-', 'Nenhuma', '(11) 98901-2346', 'Ativo'),
('Roberto Ferreira Lima', '999.000.111-22', '901234567890123', '1955-04-12', '(11) 99012-3456', 'roberto.lima@email.com', 'Rua Barão de Itapetininga, 369 - São Paulo/SP', 'O+', 'Iodo', '(11) 99012-3457', 'Ativo'),
('Juliana Rodrigues', '000.111.222-33', '012345678901234', '1995-06-20', '(11) 90123-4567', 'juliana.rodrigues@email.com', 'Av. São João, 741 - São Paulo/SP', 'A+', 'Nenhuma', '(11) 90123-4568', 'Ativo'),
('Fernando Oliveira', '111.222.333-45', '123456789012346', '1968-01-30', '(11) 91234-5680', 'fernando.oliveira@email.com', 'Rua Boa Vista, 852 - São Paulo/SP', 'B+', 'Nenhuma', '(11) 91234-5681', 'Ativo'),
('Sandra Pereira', '222.333.444-56', '234567890123457', '1983-10-05', '(11) 92345-6791', 'sandra.pereira@email.com', 'Av. Brigadeiro, 963 - São Paulo/SP', 'O+', 'Glúten', '(11) 92345-6792', 'Ativo'),
('Ricardo Mendes', '333.444.555-67', '345678901234568', '1970-07-19', '(11) 93456-7892', 'ricardo.mendes@email.com', 'Rua Liberdade, 159 - São Paulo/SP', 'A-', 'Nenhuma', '(11) 93456-7893', 'Ativo'),
('Patrícia Almeida', '444.555.666-78', '456789012345679', '1992-04-27', '(11) 94567-8903', 'patricia.almeida@email.com', 'Av. Ibirapuera, 753 - São Paulo/SP', 'AB+', 'Frutos do mar', '(11) 94567-8904', 'Ativo'),
('Marcos Vieira', '555.666.777-89', '567890123456780', '1960-11-16', '(11) 95678-9014', 'marcos.vieira@email.com', 'Rua Pinheiros, 357 - São Paulo/SP', 'O-', 'Nenhuma', '(11) 95678-9015', 'Ativo'),
('Luciana Campos', '666.777.888-90', '678901234567891', '1986-03-08', '(11) 96789-0125', 'luciana.campos@email.com', 'Av. Faria Lima, 951 - São Paulo/SP', 'B+', 'Dipirona', '(11) 96789-0126', 'Ativo'),
('Diego Souza', '777.888.999-01', '789012345678902', '1978-12-23', '(11) 97890-1236', 'diego.souza@email.com', 'Rua Tatuapé, 456 - São Paulo/SP', 'A+', 'Nenhuma', '(11) 97890-1237', 'Ativo'),
('Camila Ribeiro', '888.999.000-12', '890123456789013', '1993-08-14', '(11) 98901-2347', 'camila.ribeiro@email.com', 'Av. Santo Amaro, 789 - São Paulo/SP', 'AB-', 'Penicilina', '(11) 98901-2348', 'Ativo'),
('Rafael Costa', '999.000.111-23', '901234567890124', '1967-05-29', '(11) 99012-3458', 'rafael.costa@email.com', 'Rua Vila Mariana, 321 - São Paulo/SP', 'O+', 'Nenhuma', '(11) 99012-3459', 'Ativo'),
('Beatriz Martins', '000.111.222-34', '012345678901235', '1985-02-11', '(11) 90123-4569', 'beatriz.martins@email.com', 'Av. Jabaquara, 654 - São Paulo/SP', 'B-', 'Lactose', '(11) 90123-4570', 'Ativo');

INSERT INTO unidades_saude (nome, endereco) VALUES
('UBS Central', 'Av. Paulista, 1000 - São Paulo/SP'),
('UBS Vila Mariana', 'Rua Domingos de Morais, 500 - São Paulo/SP'),
('UBS Mooca', 'Rua da Mooca, 200 - São Paulo/SP'),
('UBS Pinheiros', 'Av. Rebouças, 800 - São Paulo/SP'),
('UBS Ipiranga', 'Av. Nazaré, 300 - São Paulo/SP'),
('UBS Butantã', 'Av. Vital Brasil, 150 - São Paulo/SP'),
('UBS Tatuapé', 'Rua Tuiuti, 600 - São Paulo/SP'),
('UBS Santana', 'Av. Cruzeiro do Sul, 400 - São Paulo/SP'),
('UBS Lapa', 'Rua Guaicurus, 250 - São Paulo/SP'),
('UBS Santo Amaro', 'Av. Santo Amaro, 900 - São Paulo/SP');

INSERT INTO consultas (paciente_id, funcionario_id, data_hora, tipo_consulta, unidade, status) VALUES
(1, 1, '2025-10-15 09:00:00', 'Consulta Geral', 'UBS Central', 'Agendada'),
(2, 2, '2025-10-15 10:00:00', 'Consulta Especializada', 'UBS Vila Mariana', 'Agendada'),
(3, 3, '2025-10-16 14:00:00', 'Consulta Especializada', 'UBS Mooca', 'Agendada'),
(4, 4, '2025-10-17 11:00:00', 'Consulta Especializada', 'UBS Pinheiros', 'Agendada'),
(5, 5, '2025-10-18 15:00:00', 'Consulta Especializada', 'UBS Ipiranga', 'Agendada'),
(6, 1, '2025-10-20 08:30:00', 'Retorno', 'UBS Central', 'Agendada'),
(7, 6, '2025-10-21 13:00:00', 'Consulta Especializada', 'UBS Butantã', 'Agendada'),
(8, 7, '2025-10-22 16:00:00', 'Consulta Especializada', 'UBS Tatuapé', 'Agendada'),
(9, 8, '2025-10-23 09:30:00', 'Consulta Especializada', 'UBS Santana', 'Agendada'),
(10, 1, '2025-10-24 10:30:00', 'Consulta Geral', 'UBS Lapa', 'Agendada'),
(11, 2, '2025-09-10 09:00:00', 'Consulta Especializada', 'UBS Central', 'Concluída'),
(12, 3, '2025-09-12 14:00:00', 'Consulta Especializada', 'UBS Vila Mariana', 'Concluída'),
(13, 4, '2025-09-15 11:00:00', 'Consulta Especializada', 'UBS Mooca', 'Concluída'),
(14, 5, '2025-09-18 15:30:00', 'Consulta Especializada', 'UBS Pinheiros', 'Concluída'),
(15, 1, '2025-09-20 08:00:00', 'Consulta Geral', 'UBS Ipiranga', 'Concluída'),
(16, 6, '2025-09-22 13:30:00', 'Consulta Especializada', 'UBS Butantã', 'Concluída'),
(17, 7, '2025-09-25 16:00:00', 'Consulta Especializada', 'UBS Tatuapé', 'Cancelada'),
(18, 8, '2025-09-28 09:00:00', 'Consulta Especializada', 'UBS Santana', 'Concluída'),
(19, 2, '2025-10-01 10:00:00', 'Consulta Especializada', 'UBS Lapa', 'Concluída'),
(20, 1, '2025-10-05 14:30:00', 'Retorno', 'UBS Santo Amaro', 'Concluída');

INSERT INTO prescricoes (paciente_id, medicamento, dosagem, frequencia, inicio, fim, observacoes, medico_nome) VALUES
(1, 'Losartana', '50mg', '1x ao dia', '2025-09-10', '2025-12-10', 'Tomar em jejum', 'Dr. João Silva'),
(2, 'Atenolol', '25mg', '2x ao dia', '2025-09-12', '2025-12-12', 'Após as refeições', 'Dra. Maria Santos'),
(3, 'Ibuprofeno', '600mg', '3x ao dia', '2025-09-15', '2025-09-25', 'Tomar com alimento', 'Dr. Pedro Oliveira'),
(4, 'Paracetamol', '500mg', '4x ao dia', '2025-09-18', '2025-09-23', 'Em caso de febre', 'Dra. Ana Costa'),
(5, 'Fluoxetina', '20mg', '1x ao dia', '2025-09-20', '2026-03-20', 'Tomar pela manhã', 'Dr. Carlos Mendes'),
(6, 'Omeprazol', '20mg', '1x ao dia', '2025-09-22', '2025-12-22', 'Em jejum', 'Dr. João Silva'),
(7, 'Hidroclorotiazida', '25mg', '1x ao dia', '2025-09-25', '2026-03-25', 'Tomar pela manhã', 'Dra. Juliana Lima'),
(8, 'Clonazepam', '2mg', '1x ao dia', '2025-09-28', '2025-12-28', 'Antes de dormir', 'Dr. Roberto Alves'),
(9, 'Ácido Fólico', '5mg', '1x ao dia', '2025-10-01', '2026-04-01', 'Durante gestação', 'Dra. Fernanda Rocha'),
(10, 'Metformina', '850mg', '2x ao dia', '2025-10-05', '2026-04-05', 'Após refeições', 'Dr. João Silva'),
(11, 'Sinvastatina', '20mg', '1x ao dia', '2025-09-10', '2026-03-10', 'À noite', 'Dra. Maria Santos'),
(12, 'Amoxicilina', '500mg', '3x ao dia', '2025-09-12', '2025-09-22', 'Completar tratamento', 'Dr. Pedro Oliveira'),
(13, 'Salbutamol', '100mcg', '2 puffs 4x ao dia', '2025-09-15', '2026-03-15', 'Em caso de falta de ar', 'Dra. Ana Costa'),
(14, 'Levotiroxina', '50mcg', '1x ao dia', '2025-09-18', '2026-09-18', 'Em jejum', 'Dr. Carlos Mendes'),
(15, 'Dipirona', '500mg', '3x ao dia', '2025-09-20', '2025-09-27', 'Em caso de dor', 'Dr. João Silva'),
(16, 'Azitromicina', '500mg', '1x ao dia', '2025-09-22', '2025-09-27', 'Jejum de 1h antes', 'Dra. Juliana Lima'),
(17, 'Loratadina', '10mg', '1x ao dia', '2025-09-25', '2025-10-25', 'Antes de dormir', 'Dr. Roberto Alves'),
(18, 'Vitamina D', '1000UI', '1x ao dia', '2025-09-28', '2026-03-28', 'Com refeição', 'Dra. Fernanda Rocha'),
(19, 'Captopril', '25mg', '2x ao dia', '2025-10-01', '2026-04-01', 'Em jejum', 'Dra. Maria Santos'),
(20, 'Atorvastatina', '20mg', '1x ao dia', '2025-10-05', '2026-04-05', 'À noite', 'Dr. João Silva');

INSERT INTO consultas_por_mes (mes, consultas, pacientes) VALUES
('Jan/25', 320, 280),
('Fev/25', 305, 265),
('Mar/25', 340, 295),
('Abr/25', 315, 275),
('Mai/25', 330, 285),
('Jun/25', 295, 250),
('Jul/25', 310, 270),
('Ago/25', 325, 290),
('Set/25', 345, 300),
('Out/25', 280, 240),
('Nov/24', 290, 255),
('Dez/24', 275, 245);

INSERT INTO medicamentos_consumo (medicamento, consumo, estoque) VALUES
('Paracetamol', 850, 5000),
('Dipirona', 720, 4200),
('Ibuprofeno', 620, 3500),
('Amoxicilina', 480, 2800),
('Omeprazol', 540, 3100),
('Losartana', 410, 2600),
('Metformina', 590, 3800),
('Atenolol', 350, 2200),
('Sinvastatina', 430, 2900),
('Captopril', 470, 3300),
('Azitromicina', 290, 1800),
('Clonazepam', 220, 1200),
('Fluoxetina', 380, 2700),
('Hidroclorotiazida', 450, 3200),
('Levotiroxina', 360, 2500),
('Salbutamol', 310, 1900),
('Vitamina D', 680, 4500),
('Vitamina C', 750, 5200),
('Loratadina', 520, 3700),
('Atorvastatina', 440, 2900);

INSERT INTO pacientes_por_idade (faixa_etaria, quantidade) VALUES
('0-10', 145),
('11-20', 178),
('21-30', 256),
('31-40', 312),
('41-50', 289),
('51-60', 267),
('60+', 423);

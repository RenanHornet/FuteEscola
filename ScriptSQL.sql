CREATE DATABASE FuteEscola;
USE FuteEscola;

CREATE TABLE Cadastros (
ID_Cadastro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
Usuario VARCHAR(280) NOT NULL UNIQUE,
Email VARCHAR(280) NOT NULL UNIQUE,
Senha VARCHAR(300) NOT NULL,
Ativo BOOLEAN NOT NULL DEFAULT TRUE,
Data_Cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP

);

-- -----------------------------------------------------
-- Tabela para o Sistema de Save Game (MVP)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS saves_campeonatos (
    id_save INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nome_torneio VARCHAR(150) NOT NULL,
    dados_json LONGTEXT NOT NULL,
    data_save DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- UNIQUE para garantir que cada usuário tenha apenas um "slot" de save ativo por vez
    -- Se ele salvar um novo, o PHP fará o UPDATE no mesmo registro.
    UNIQUE KEY (id_usuario), 
    
    -- Relaciona o save ao usuário logado
    CONSTRAINT fk_save_usuario 
    FOREIGN KEY (id_usuario) 
    REFERENCES Cadastros (ID_Cadastro) 
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE campeonatos (
    id_campeonato INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_escola INT,
    FOREIGN KEY (id_escola) REFERENCES escolas(id_escola)
);


CREATE TABLE times (
    id_time INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_campeonato INT NOT NULL,
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato)
);


CREATE TABLE jogadores (
    id_jogador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_time INT NOT NULL,
    FOREIGN KEY (id_time) REFERENCES times(id_time)
);


CREATE TABLE partidas (
    id_partida INT AUTO_INCREMENT PRIMARY KEY,
    id_campeonato INT NOT NULL,
    time_casa INT NOT NULL,
    time_fora INT NOT NULL,
    gols_casa INT DEFAULT 0,
    gols_fora INT DEFAULT 0,
    data_partida DATETIME NOT NULL,
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato),
    FOREIGN KEY (time_casa) REFERENCES times(id_time),
    FOREIGN KEY (time_fora) REFERENCES times(id_time)
);


CREATE TABLE chaveamentos (
    id_chaveamento INT AUTO_INCREMENT PRIMARY KEY,
    id_campeonato INT NOT NULL,
    fase ENUM('oitavas', 'quartas', 'semifinal', 'final') NOT NULL,
    id_partida INT NOT NULL,
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato),
    FOREIGN KEY (id_partida) REFERENCES partidas(id_partida)
);


CREATE TABLE ranking (
    id_ranking INT AUTO_INCREMENT PRIMARY KEY,
    id_campeonato INT NOT NULL,
    id_time INT NOT NULL,
    pontos INT DEFAULT 0,
    vitorias INT DEFAULT 0,
    empates INT DEFAULT 0,
    derrotas INT DEFAULT 0,
    FOREIGN KEY (id_campeonato) REFERENCES campeonatos(id_campeonato),
    FOREIGN KEY (id_time) REFERENCES times(id_time)
);



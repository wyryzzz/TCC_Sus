-- Script para inserir pacientes na tabela pacientes para todos os usuários do tipo 'paciente' que ainda não estão lá

INSERT INTO pacientes (nome, email, status)
SELECT u.nome, u.email, 'ativo'
FROM usuario u
LEFT JOIN pacientes p ON u.email = p.email
WHERE u.tipo_usuario = 'paciente'
AND p.id IS NULL;

-- Verificar quantos foram inseridos
SELECT 'Pacientes inseridos:' as info, COUNT(*) as quantidade
FROM usuario u
LEFT JOIN pacientes p ON u.email = p.email
WHERE u.tipo_usuario = 'paciente'
AND p.id IS NULL;

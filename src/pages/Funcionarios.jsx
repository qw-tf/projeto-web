import React, { useState, useEffect } from 'react';
    import { funcionarioService } from '../services/api';
    export default function Funcionarios() {
        const [funcionarios, setFuncionario] = useState([]);
        const [nome, setNome] = useState('');
        const [cargo, setCargo] = useState('');
        useEffect(() => {
            carregarFuncionario();
        }, []);
        const carregarFuncionario = async () => {
            try {
                const response = await funcionarioService.listar();
                setFuncionario(response);
            } catch (error) {
                console.error("Erro ao buscar Funcionario", error);
            }
        };
        const cadastrar = async () => {
            if (!nome || !cargo) return alert("Preencha todos os campos!");
            try {
                await funcionarioService.criar({ nome, cargo});
                setNome('');
                setCargo('');
                carregarFuncionario(); // Atualiza a lista após cadastrar
            } catch (error) {
                console.error("Erro ao cadastrar", error);
            }
        };
        return (
            <div>
                <h2>Cadastro de Funcionarios</h2>
    
                <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
    
                    <h3>Novo Funcionario</h3>
    
                    <input type="text" placeholder="Nome do Funcionário" value={nome}
                        onChange={(f) => setNome(f.target.value)} style={{ marginRight: '10px' }} />
                    <input type="text" placeholder="Cargo (Ex: Auxiliar de produção)" value={cargo}
                        onChange={(f) => setCargo(f.target.value)} style={{ marginRight: '10px' }} />
                    <button onClick={cadastrar}>Cadastrar</button>
                </div>
    
                <h3>Funcionários Cadastrados</h3>
                <ul>
                    {funcionarios.map(f => (
                        <li key={f.id}><strong>{f.nome}</strong> - cargo: {f.cargo}</li>
                    ))}
                </ul>
            </div>
        );
    }
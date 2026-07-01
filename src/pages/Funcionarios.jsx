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
                const { data, error } = await funcionarioService.listar();
        
                if (error) {
                    console.error("Erro ao buscar Funcionários:", error);
                    return;
                }
        
                setFuncionario(data);
            } catch (error) {
                console.error("Erro ao buscar Funcionários:", error);
            }
        };
        const cadastrar = async () => {
            if (!nome || !cargo) {
                alert("Preencha todos os campos!");
                return;
            }
        
            try {
                const { error } = await funcionarioService.criar({ nome, cargo });
        
                if (error) {
                    console.error("Erro ao cadastrar:", error);
                    return;
                }
        
                setNome("");
                setCargo("");
                carregarFuncionario();
            } catch (error) {
                console.error("Erro ao cadastrar:", error);
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
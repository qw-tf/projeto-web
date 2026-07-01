import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';
export default function Cidade() {
    const [cidade, setCidade] = useState([]);
    const [nome, setNome] = useState('');
    const [estado, setEstado] = useState('');
    useEffect(() => {
        carregarCidades();
    }, []);
    const carregarCidades = async () => {
        try {
            const { data, error } = await cidadeService.listar();
    
            if (error) {
                console.error(error);
                return;
            }
    
            setCidade(data);
        } catch (error) {
            console.error(error);
        }
    };
    const cadastrar = async () => {
        if (!nome || !estado) {
            alert("Preencha todos os campos!");
            return;
        }
    
        try {
            const { error } = await cidadeService.criar({ nome, estado });
    
            if (error) {
                console.error(error);
                return;
            }
    
            setNome("");
            setEstado("");
            carregarCidades();
        } catch (error) {
            console.error("Erro ao cadastrar", error);
        }
    };
    return (
        <div>
            <h2>Gestão de Cidade</h2>

            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Nova Cidade</h3>
                <input type="text" placeholder="Nome da cidade" value={nome}
                    onChange={(c) => setNome(c.target.value)} style={{ marginRight: '10px' }} />
                <input type="text" placeholder="estado (Ex: Goias)" value={estado}
                    onChange={(c) => setEstado(c.target.value)} style={{ marginRight: '10px' }} />
                <button onClick={cadastrar}>Cadastrar</button>
            </div>
            <h3>Cidade Cadastrados</h3>
            <ul>
                {cidade.map(c => (
                    <li key={c.id}><strong>{c.nome}</strong> - estado: {c.estado}</li>
                ))}
            </ul>
        </div>
    );
}

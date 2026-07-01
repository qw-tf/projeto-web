import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';
export default function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [data_servico, setData_servico] = useState('');
    useEffect(() => {
        carregarServicos();
    }, []);
    const carregarServicos = async () => {
        try {
            const { data, error } = await servicoService.listar();
    
            if (error) {
                console.error("Erro ao buscar serviços:", error);
                return;
            }
    
            setServicos(data);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    };
    const cadastrar = async () => {
        if (!descricao || !data_servico) {
            alert("Preencha todos os campos!");
            return;
        }
    
        try {
            const { error } = await servicoService.criar({
                descricao,
                data_servico,
            });
    
            if (error) {
                console.error("Erro ao cadastrar:", error);
                return;
            }
    
            setDescricao("");
            setData_servico("");
            carregarServicos();
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
        }
    };
    return (
        <div>
            <h2>Gestão de servicos</h2>

            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Novo servico</h3>
                <input type="text" placeholder="descricao do servico" value={descricao}
                    onChange={(s) => setDescricao(s.target.value)} style={{ marginRight: '10px' }} />
                <input
                    type="date"
                    value={data_servico}
                    onChange={(s) => setData_servico(s.target.value)}
                />
                <button onClick={cadastrar}>Cadastrar</button>
            </div>
            <h3>servicos Cadastrados</h3>
            <ul>
                {servicos.map(s => (
                    <li key={s.id}><strong>{s.descricao}</strong> - data_servico: {s.data_servico}</li>
                ))}
            </ul>
        </div>
    );
}

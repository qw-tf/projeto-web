import supabase from "./supabase";

export const equipamentoService = {
  listar: () => supabase.from("equipamentos").select("*"),
  criar: (dados) => supabase.from("equipamentos").insert([dados]),
};

export const cidadeService = {
  listar: () => supabase.from("cidades").select("*"),
  criar: (dados) => supabase.from("cidades").insert([dados]),
};

export const funcionarioService = {
  listar: () => supabase.from("funcionarios").select("*"),
  criar: (dados) => supabase.from("funcionarios").insert([dados]),
};

export const servicoService = {
  listar: () => supabase.from("servicos").select("*"),
  criar: (dados) => supabase.from("servicos").insert([dados]),
};
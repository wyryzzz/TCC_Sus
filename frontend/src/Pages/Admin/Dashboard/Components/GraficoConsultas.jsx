import "../Styles/GraficosConsultas.scss";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function GraficoConsultas({ pacientesPorIdade = [] }) {
  return (
    <div className="grafico-simples grafico">
      <h3 className="titulo-grafico">Consultas por Idade</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={pacientesPorIdade}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faixa" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="quantidade" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

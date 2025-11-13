import { BarChart3 } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../Styles/GraficoConsultas.scss";

export default function GraficoConsultas({ data }) {
  return (
    <div className="grafico grafico-consultas">
      <div className="titulo-grafico">
        <h3>Consultas por Mês</h3>
        <BarChart3 size={24} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="consultas" stroke="#3B82F6" strokeWidth={3} />
          <Line type="monotone" dataKey="pacientes" stroke="#60A5FA" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

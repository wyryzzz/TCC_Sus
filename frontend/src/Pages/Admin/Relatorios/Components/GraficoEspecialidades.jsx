import { Pill } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../Styles/GraficoEspecialidades.scss";

export default function GraficoEspecialidades({ data }) {
  return (
    <div className="grafico grafico-especialidades">
      <div className="titulo-grafico">
        <h3>Distribuição por Especialidade</h3>
        <Pill size={24} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} dataKey="value">
            {data.map((dados, i) => (
              <Cell key={i} fill={dados.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

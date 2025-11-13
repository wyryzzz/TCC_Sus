import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../Styles/GraficosMedicamentos.scss";
export default function GraficoMedicamentos({ data }) {
  return (
    <div className="grafico grafico-medicamentos">
      <div className="titulo-grafico">
        <h3>Consumo de Medicamentos</h3>
        <TrendingUp size={24} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="medicamento" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumo" fill="#3B82F6" name="Consumo" />
          <Bar dataKey="estoque" fill="#E0E7FF" name="Estoque" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

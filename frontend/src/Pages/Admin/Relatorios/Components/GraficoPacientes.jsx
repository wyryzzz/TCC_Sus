import { Users } from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../Styles/GraficoPacientes.scss";
export default function GraficoPacientes({ data }) {
  return (
    <div className="grafico grafico-pacientes">
      <div className="titulo-grafico">
        <h3>Pacientes por Faixa Etária</h3>
        <Users size={24} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faixa" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="quantidade" stroke="#3B82F6" fill="#DBEAFE" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

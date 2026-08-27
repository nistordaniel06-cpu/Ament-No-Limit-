"use client";

import {
  Vault,
  PiggyBank,
  CalendarDays,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { day: "Lun", value: 8 },
  { day: "Mar", value: 12 },
  { day: "Mie", value: 7 },
  { day: "Joi", value: 18 },
  { day: "Vin", value: 14 },
  { day: "Sâm", value: 22 },
  { day: "Dum", value: 32 },
];

const metrics = [
  {
    label: "Împrumuturi active",
    value: "32",
    change: "+12%",
    positive: true,
    Icon: Vault,
  },
  {
    label: "Valoare totală",
    value: "78.450 lei",
    change: "+8%",
    positive: true,
    Icon: PiggyBank,
  },
  {
    label: "Scadențe azi",
    value: "5",
    change: "-2%",
    positive: false,
    Icon: CalendarDays,
  },
  {
    label: "Plăți azi",
    value: "12.680 lei",
    change: "+15%",
    positive: true,
    Icon: TrendingUp,
  },
];

const tasks = [
  { label: "Verifică 3 evaluări noi", count: 3 },
  { label: "Confirmă 2 plăți", count: 2 },
  { label: "Sună clienți cu scadențe azi", count: 5 },
  { label: "Actualizează prețuri produse", count: 8 },
];

export default function AdminPanel() {
  return (
    <section className="bg-[#121417] rounded-2xl p-6 space-y-6 text-white">
      <h2 className="text-xl font-bold">Admin — Panou de control</h2>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ label, value, change, positive, Icon }) => (
          <div key={label} className="bg-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <Icon size={20} className="text-[#C89D3C]" />
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  positive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {change}
              </span>
            </div>
            <p className="text-xl font-bold">{value}</p>
            <p className="text-xs text-gray-400 leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* 2-column split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">
            Sarcini de făcut
          </h3>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.label}
                className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C89D3C] text-black text-xs font-bold flex items-center justify-center">
                    {task.count}
                  </span>
                  <span className="text-sm text-gray-200">{task.label}</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-[#C89D3C] hover:text-[#B3892F] font-medium transition-colors">
                  Deschide <ChevronRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">
            Împrumuturi pe ultimele 7 zile
          </h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C89D3C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C89D3C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1F2937", border: "none", borderRadius: 8, color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#C89D3C"
                  strokeWidth={2.5}
                  fill="url(#goldGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <button className="w-full text-center text-sm text-[#C89D3C] hover:text-[#B3892F] font-medium transition-colors border border-[#C89D3C]/30 rounded-xl py-2">
            Vezi raport detaliat
          </button>
        </div>
      </div>
    </section>
  );
}

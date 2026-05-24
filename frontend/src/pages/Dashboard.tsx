import { useEffect, useState } from "react";
import { Briefcase, Users, FileText, TrendingUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { LottieAnimation } from "../components/LottieAnimation";
import { api } from "../lib/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.dashboard.get().then(setData).catch(() => {});
  }, []);

  const stats = user?.role === "site_creator"
    ? [
        { label: "Empresas Cadastradas", value: "—", icon: Briefcase, change: "" },
        { label: "Usuários Ativos", value: "—", icon: Users, change: "" },
        { label: "Currículos Analisados", value: data?.analyzedResumes ?? "—", icon: FileText, change: "" },
        { label: "Taxa de Aprovação", value: "—", icon: TrendingUp, change: "" },
      ]
    : [
        { label: "Vagas Ativas", value: data?.openJobs ?? "—", icon: Briefcase, change: "" },
        { label: "Candidatos", value: data?.totalResumes ?? "—", icon: Users, change: "" },
        { label: "Currículos Analisados", value: data?.analyzedResumes ?? "—", icon: FileText, change: "" },
        { label: "Total de Vagas", value: data?.totalJobs ?? "—", icon: TrendingUp, change: "" },
      ];

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Olá, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {user?.role === "site_creator" ? "Visão geral da plataforma" : `Painel da ${user?.companyName}`}
          </p>
        </div>
        <LottieAnimation src="../../animation/computer.lottie" className="w-20 h-20 -mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5 hover:shadow-elevated transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</span>
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            {s.change && <p className="text-xs text-success mt-1">{s.change}</p>}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border p-6">
        <h2 className="text-base font-semibold mb-5" style={{ fontFamily: "'Manrope', sans-serif" }}>Vagas Recentes</h2>
        {data?.recentJobs?.length > 0 ? (
          <div className="space-y-0">
            {data.recentJobs.map((job: any) => (
              <div key={job.id} className="flex items-center gap-3 py-3.5 border-b border-border last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <p className="text-sm flex-1">{job.title}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{job.department}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhuma vaga criada ainda.</p>
        )}
      </div>
    </div>
  );
}

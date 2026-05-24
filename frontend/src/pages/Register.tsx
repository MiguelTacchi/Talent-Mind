import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { useToast } from "../hooks/use-toast";
import { LottieAnimation } from "../components/LottieAnimation";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", companyName: "" });
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) {
      toast({ title: "Cadastro realizado!", description: "Sua empresa foi registrada com sucesso." });
      navigate("/dashboard");
    } else {
      toast({ title: "Erro", description: "Erro ao cadastrar. Verifique os dados ou tente outro e-mail.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background relative">
        <ThemeToggle className="absolute top-4 right-4" />
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-10 justify-center">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-bold">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Talent<span className="text-primary">Mind</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Manrope', sans-serif" }}>Cadastre sua empresa</h1>
          <p className="text-muted-foreground text-sm mb-8">Preencha os dados para criar sua conta</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nome da Empresa</Label>
              <Input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="Sua Empresa Ltda" required className="mt-2 h-11 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Seu Nome</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nome completo" required className="mt-2 h-11 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@empresa.com" required className="mt-2 h-11 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Senha</Label>
              <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Mínimo 6 caracteres" required minLength={6} className="mt-2 h-11 rounded-xl" />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl bg-foreground text-background hover:bg-foreground/90">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Cadastrar Empresa
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 bg-foreground items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="relative z-10 flex flex-col items-center">
          <LottieAnimation src="/animation/computer.lottie" className="w-80 h-80" />
          <h2 className="text-3xl font-bold text-background mt-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Talent<span className="text-primary">Mind</span>
          </h2>
          <p className="text-background/50 mt-2 text-center max-w-sm">
            Crie sua conta e transforme seu recrutamento com IA de última geração.
          </p>
        </div>
      </div>
    </div>
  );
}

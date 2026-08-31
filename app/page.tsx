"use client";

import { useEffect, useMemo, useState } from "react";

type Day = {
  day: number;
  week: 1 | 2;
  kicker: string;
  title: string;
  time: string;
  summary: string;
  remember: string[];
  agenda: { time: string; label: string }[];
  tasks: string[];
  video: { title: string; duration: string; url: string };
  tip: string;
};

type StudyDay = Omit<Day, "week"> & { sourceTitles: string[] };

const days: Day[] = [
  {
    day: 1, week: 1, kicker: "Comece pelo mapa", title: "Prova + diagnóstico", time: "1h15",
    summary: "Antes de acelerar, entenda o caminho. Veja o formato da prova do seu estado, organize o material e faça um diagnóstico sem consultar respostas.",
    remember: ["A prova mistura legislação, sinalização, direção defensiva, primeiros socorros, meio ambiente e mecânica.", "Anote o motivo de cada erro — o caderno de erros será seu melhor resumo."],
    agenda: [{ time: "15 min", label: "Conheça o edital e as regras do seu DETRAN" }, { time: "25 min", label: "Assista à introdução de legislação" }, { time: "25 min", label: "Faça 15 questões sem consulta" }, { time: "10 min", label: "Classifique seus erros por tema" }],
    tasks: ["Conferi as regras do meu estado", "Fiz 15 questões de diagnóstico", "Criei meu caderno de erros"],
    video: { title: "Revisão de legislação de trânsito", duration: "aula completa", url: "https://www.youtube.com/watch?v=p56owmvfkTQ" },
    tip: "Hoje a nota não importa. O diagnóstico só serve para mostrar onde investir energia.",
  },
  {
    day: 2, week: 1, kicker: "Placas sem decoreba", title: "Sinalização vertical", time: "1h30",
    summary: "Agrupe as placas por família. Regulamentação impõe obrigações ou restrições; advertência alerta riscos; indicação orienta o caminho e os serviços.",
    remember: ["Círculo costuma regulamentar; losango amarelo costuma advertir.", "PARE e DÊ A PREFERÊNCIA fogem do formato circular — por isso aparecem muito em prova."],
    agenda: [{ time: "30 min", label: "Veja a aula e desenhe as três famílias" }, { time: "25 min", label: "Estude regulamentação" }, { time: "20 min", label: "Estude advertência e indicação" }, { time: "15 min", label: "Resolva 20 questões" }],
    tasks: ["Reconheço as três famílias", "Criei 10 flashcards de placas", "Resolvi 20 questões"],
    video: { title: "Classificação e tipos de sinalização", duration: "revisão visual", url: "https://www.youtube.com/watch?v=Fe4-WGsRH_M" },
    tip: "Primeiro leia forma e cor; só depois tente lembrar o desenho. Isso reduz a quantidade de coisas para decorar.",
  },
  {
    day: 3, week: 1, kicker: "Leia a rua", title: "Faixas, gestos e semáforos", time: "1h25",
    summary: "Sinalização horizontal organiza fluxos no pavimento. Some a ela semáforos, gestos do agente e sinais sonoros, lembrando que a ordem do agente prevalece.",
    remember: ["Linha amarela separa fluxos opostos; branca separa fluxos no mesmo sentido.", "Linha contínua restringe transposição; seccionada permite quando a manobra for segura."],
    agenda: [{ time: "25 min", label: "Revise marcas viárias e cores" }, { time: "20 min", label: "Estude semáforos, gestos e silvos" }, { time: "25 min", label: "Faça um mapa visual da hierarquia" }, { time: "15 min", label: "Resolva 15 questões" }],
    tasks: ["Diferencio linhas brancas e amarelas", "Memorizei a ordem de prevalência", "Resolvi 15 questões"],
    video: { title: "Sinalização: classificação e prevalência", duration: "revisão", url: "https://www.youtube.com/watch?v=Fe4-WGsRH_M" },
    tip: "Imagine o cruzamento visto de cima. Transformar a regra em cena é mais forte do que reler uma frase.",
  },
  {
    day: 4, week: 1, kicker: "Quem vai primeiro?", title: "Circulação e conduta", time: "1h35",
    summary: "Domine preferência, conversões, ultrapassagem, mudança de faixa, parada e estacionamento. A regra central é previsibilidade com segurança.",
    remember: ["Sinalize antes de mudar direção ou faixa e verifique se a manobra é segura.", "Em cruzamento não sinalizado, a regra geral considera quem vem pela direita, com exceções previstas no CTB."],
    agenda: [{ time: "30 min", label: "Estude preferência e cruzamentos" }, { time: "25 min", label: "Revise ultrapassagem e conversões" }, { time: "20 min", label: "Pare x estacione: compare situações" }, { time: "20 min", label: "Resolva 20 questões situacionais" }],
    tasks: ["Revisei preferência", "Comparei parada e estacionamento", "Resolvi 20 questões"],
    video: { title: "Legislação: regras de circulação", duration: "aula completa", url: "https://www.youtube.com/watch?v=p56owmvfkTQ" },
    tip: "Em questão de cena, desenhe setas. Quinze segundos de rascunho podem evitar uma resposta por impulso.",
  },
  {
    day: 5, week: 1, kicker: "Entenda a consequência", title: "Infrações e penalidades", time: "1h40",
    summary: "Separe infração da penalidade e da medida administrativa. Estude gravidade, pontuação, documentos e condutas recorrentes sem tentar decorar o CTB inteiro.",
    remember: ["Inflação leve, média, grave e gravíssima: associe a gravidade ao risco da conduta.", "Multa, suspensão e cassação são exemplos de penalidades; retenção e remoção aparecem como medidas administrativas."],
    agenda: [{ time: "30 min", label: "Monte a tabela gravidade x pontos" }, { time: "25 min", label: "Compare penalidades e medidas" }, { time: "20 min", label: "Revise documentos e responsabilidade" }, { time: "25 min", label: "Resolva 25 questões" }],
    tasks: ["Montei a tabela de gravidade", "Sei diferenciar penalidade e medida", "Resolvi 25 questões"],
    video: { title: "Revisão completa de legislação", duration: "use os capítulos", url: "https://www.youtube.com/watch?v=p56owmvfkTQ" },
    tip: "Quando errar uma penalidade, registre a conduta, a consequência e a palavra que enganou você.",
  },
  {
    day: 6, week: 1, kicker: "Antecipe o risco", title: "Direção defensiva", time: "1h30",
    summary: "Condução defensiva é prever perigos e agir antes que virem emergência. Revise condições adversas, distância, pontos cegos e comportamento seguro.",
    remember: ["Negligência é falta de cuidado; imprudência é assumir risco; imperícia é falta de habilidade técnica.", "Aumente distância e reduza velocidade quando visibilidade, aderência ou atenção piorarem."],
    agenda: [{ time: "30 min", label: "Assista à revisão de direção defensiva" }, { time: "20 min", label: "Compare negligência, imprudência e imperícia" }, { time: "20 min", label: "Estude distância e pontos cegos" }, { time: "20 min", label: "Resolva 20 questões" }],
    tasks: ["Entendi os três tipos de falha", "Revisei distância segura", "Resolvi 20 questões"],
    video: { title: "Direção defensiva: o que cai", duration: "revisão focada", url: "https://www.youtube.com/watch?v=gOEW6o7h9HE" },
    tip: "A resposta defensiva quase sempre reduz risco sem criar outro. Desconfie de alternativas agressivas ou absolutas.",
  },
  {
    day: 7, week: 1, kicker: "Feche a primeira volta", title: "Condições adversas + revisão", time: "1h30",
    summary: "Aplique direção defensiva a chuva, neblina, noite, aquaplanagem e fadiga. Termine revisando somente o que errou nos seis primeiros dias.",
    remember: ["Na aquaplanagem, reduza a aceleração suavemente, mantenha o volante firme e evite frenagem brusca.", "Cansaço não se resolve com janela aberta: pare em local seguro e descanse."],
    agenda: [{ time: "25 min", label: "Revise clima, via, veículo e condutor" }, { time: "20 min", label: "Resuma reações seguras" }, { time: "30 min", label: "Refaça as questões erradas" }, { time: "15 min", label: "Atualize seus flashcards" }],
    tasks: ["Revisei condições adversas", "Refiz meus erros da semana", "Atualizei os flashcards"],
    video: { title: "Revisão completa de direção defensiva", duration: "aula de reforço", url: "https://www.youtube.com/watch?v=SHI81BBMEbI" },
    tip: "Revisão boa não é reler tudo; é tentar lembrar sem olhar e depois corrigir as lacunas.",
  },
  {
    day: 8, week: 2, kicker: "Proteja sem piorar", title: "Primeiros socorros", time: "1h25",
    summary: "A prioridade é sinalizar, chamar ajuda e preservar a vítima. Saiba o que fazer — e, principalmente, quais atitudes podem agravar lesões.",
    remember: ["Proteja o local e acione o atendimento adequado, informando localização, quantidade de vítimas e riscos.", "Não movimente a vítima nem ofereça alimentos, bebidas ou medicamentos sem necessidade imediata e orientação especializada."],
    agenda: [{ time: "25 min", label: "Assista à revisão" }, { time: "20 min", label: "Decore a sequência proteger, alertar, socorrer" }, { time: "20 min", label: "Liste condutas proibidas" }, { time: "20 min", label: "Resolva 20 questões" }],
    tasks: ["Sei a sequência inicial", "Listei o que não fazer", "Resolvi 20 questões"],
    video: { title: "Primeiros socorros no trânsito", duration: "resumo completo", url: "https://www.youtube.com/watch?v=VntsLzxTLYw" },
    tip: "Em primeiros socorros, a prova valoriza prudência. Aja dentro do que você sabe e preserve a segurança da cena.",
  },
  {
    day: 9, week: 2, kicker: "Trânsito é convivência", title: "Meio ambiente e cidadania", time: "1h15",
    summary: "Conduzir bem também significa reduzir poluição, ruído e conflitos. Revise manutenção preventiva, respeito aos mais vulneráveis e responsabilidade social.",
    remember: ["Manutenção, aceleração suave e pneus calibrados ajudam a reduzir consumo e emissões.", "Pedestres, ciclistas e pessoas com mobilidade reduzida exigem atenção e espaço extra."],
    agenda: [{ time: "20 min", label: "Veja a revisão de meio ambiente" }, { time: "20 min", label: "Conecte veículo, poluição e manutenção" }, { time: "20 min", label: "Revise cidadania e convívio" }, { time: "15 min", label: "Resolva 15 questões" }],
    tasks: ["Revisei poluição e emissões", "Estudei usuários vulneráveis", "Resolvi 15 questões"],
    video: { title: "Meio ambiente e cidadania", duration: "revisão", url: "https://www.youtube.com/watch?v=EMUyaBJWi98" },
    tip: "Pense no trânsito como um espaço coletivo. A resposta mais cidadã costuma proteger o mais vulnerável.",
  },
  {
    day: 10, week: 2, kicker: "O básico que evita problema", title: "Mecânica e manutenção", time: "1h25",
    summary: "Você não precisa virar mecânico. Entenda painéis, pneus, freios, fluidos, bateria e os sinais de que o veículo não está seguro para circular.",
    remember: ["Luzes do painel comunicam sistemas e falhas; alerta vermelho costuma exigir atenção imediata.", "Pneus, freios, iluminação e limpadores afetam diretamente a segurança e devem ser verificados."],
    agenda: [{ time: "25 min", label: "Assista à revisão de mecânica" }, { time: "20 min", label: "Revise painel e sistemas" }, { time: "20 min", label: "Monte um checklist de manutenção" }, { time: "20 min", label: "Resolva 20 questões" }],
    tasks: ["Reconheço alertas básicos", "Montei o checklist do veículo", "Resolvi 20 questões"],
    video: { title: "Mecânica básica para a prova", duration: "revisão completa", url: "https://www.youtube.com/watch?v=E97hx7sQ5Js" },
    tip: "Associe cada sistema à sua função e ao risco de falha. Isso resolve mais questões do que decorar peças isoladas.",
  },
  {
    day: 11, week: 2, kicker: "Primeiro simulado focado", title: "Sinalização em questões", time: "1h40",
    summary: "Teste o bloco que mais exige reconhecimento visual. Responda com tempo marcado, corrija com calma e transforme cada erro em uma regra curta.",
    remember: ["Não conte acertos por sorte: marque também as respostas em que ficou entre duas opções.", "Uma boa correção deve explicar por que a certa é certa e por que a sua escolha estava errada."],
    agenda: [{ time: "15 min", label: "Revisão ativa de placas e faixas" }, { time: "40 min", label: "Simulado focado com 30 questões" }, { time: "30 min", label: "Correção e caderno de erros" }, { time: "15 min", label: "Flashcards dos erros" }],
    tasks: ["Fiz 30 questões cronometradas", "Corrigi sem pressa", "Transformei erros em flashcards"],
    video: { title: "30 questões resolvidas e comentadas", duration: "simulado em vídeo", url: "https://www.youtube.com/watch?v=Ru1w2OA8cEk" },
    tip: "Meta de hoje: entender seus erros. A nota só vira meta nos dois últimos simulados.",
  },
  {
    day: 12, week: 2, kicker: "Misture os assuntos", title: "Legislação + defensiva", time: "1h40",
    summary: "Alterne regras e situações de risco como acontece na prova. Use eliminação de alternativas e mantenha um ritmo constante.",
    remember: ["Leia primeiro o comando: correta, incorreta, exceto e não mudam tudo.", "Elimine alternativas claramente perigosas ou incompatíveis com a sinalização antes de comparar as restantes."],
    agenda: [{ time: "20 min", label: "Revise seus 10 erros mais repetidos" }, { time: "45 min", label: "Faça 30 questões mistas" }, { time: "25 min", label: "Corrija e conte temas fracos" }, { time: "10 min", label: "Explique 3 respostas em voz alta" }],
    tasks: ["Revisei meus 10 erros principais", "Fiz 30 questões mistas", "Expliquei 3 respostas sem olhar"],
    video: { title: "Simulado comentado da prova teórica", duration: "30 questões", url: "https://www.youtube.com/watch?v=Ru1w2OA8cEk" },
    tip: "Se você consegue explicar uma regra em linguagem simples, ela já está muito mais perto de ficar na memória.",
  },
  {
    day: 13, week: 2, kicker: "Valendo como prova", title: "Simulado completo", time: "1h45",
    summary: "Reproduza as condições reais: sem consulta, sem interrupções e dentro do tempo do seu estado. Depois, faça a última correção profunda.",
    remember: ["Prepare ambiente, água e cronômetro antes de começar.", "Use o resultado para revisar temas, não para alimentar ansiedade. Um erro hoje é uma chance de acerto amanhã."],
    agenda: [{ time: "10 min", label: "Prepare o ambiente e respire" }, { time: "50 min", label: "Faça um simulado completo" }, { time: "35 min", label: "Corrija e revise os erros" }, { time: "10 min", label: "Leia sua folha-resumo" }],
    tasks: ["Simulei as condições reais", "Concluí dentro do tempo", "Corrigi todos os erros"],
    video: { title: "Simulado com 40 questões comentadas", duration: "treino final", url: "https://www.youtube.com/watch?v=E_drZ3DkpSc" },
    tip: "Use o simulado do DETRAN do seu estado sempre que existir; quantidade de questões e critério de aprovação podem variar.",
  },
  {
    day: 14, week: 2, kicker: "Confiança, não maratona", title: "Revisão leve + prova", time: "1h10",
    summary: "Hoje não é dia de aprender um universo novo. Revise sua folha única, refaça poucos erros e organize a chegada para a prova.",
    remember: ["Durma bem, confira documento, horário e local com antecedência.", "Na prova, leia cada palavra, pule a questão travada e volte depois. Não troque resposta sem um motivo concreto."],
    agenda: [{ time: "20 min", label: "Leia a folha-resumo sem pressa" }, { time: "20 min", label: "Refaça 10 erros importantes" }, { time: "15 min", label: "Revise placas que confundem" }, { time: "15 min", label: "Organize documentos e descanse" }],
    tasks: ["Revisei minha folha única", "Refiz 10 erros importantes", "Organizei tudo para a prova"],
    video: { title: "Revisão geral de legislação", duration: "assista só aos pontos fracos", url: "https://www.youtube.com/watch?v=p56owmvfkTQ" },
    tip: "Encerre o estudo com antecedência. Cérebro descansado interpreta melhor do que cérebro saturado.",
  },
];

const quickTips = [
  { mark: "20/5", title: "Foco em blocos", text: "Estude 20 minutos e respire 5. Repita três vezes antes de uma pausa maior." },
  { mark: "?", title: "Pergunte antes de olhar", text: "Tente lembrar a regra primeiro. Recuperar a informação fortalece mais que reler." },
  { mark: "1×", title: "Um caderno só", text: "Centralize erros, pegadinhas e dúvidas. Nada de dez arquivos espalhados." },
  { mark: "24h", title: "Volte amanhã", text: "Comece cada sessão tentando recordar três ideias do dia anterior." },
];

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h${String(rest).padStart(2, "0")}` : `${hours}h`;
}

function makeAgenda(minutes: number, titles: string[], reviewOnly = false) {
  const recall = Math.max(5, Math.round((minutes * .15) / 5) * 5);
  const learn = Math.max(10, Math.round((minutes * .38) / 5) * 5);
  const practice = Math.max(10, Math.round((minutes * .32) / 5) * 5);
  const register = Math.max(5, minutes - recall - learn - practice);
  const overflow = recall + learn + practice + register - minutes;
  const adjustedLearn = Math.max(10, learn - overflow);
  const focus = titles.join(" e ");

  return reviewOnly
    ? [
        { time: formatMinutes(recall + adjustedLearn), label: `Recupere de memória: ${focus}` },
        { time: formatMinutes(practice), label: "Refaça as questões que errou" },
        { time: formatMinutes(register), label: "Atualize flashcards e folha-resumo" },
      ]
    : [
        { time: formatMinutes(recall), label: "Relembre o estudo anterior sem consultar" },
        { time: formatMinutes(adjustedLearn), label: `Aprenda o foco do dia: ${focus}` },
        { time: formatMinutes(practice), label: "Pratique com questões e exemplos" },
        { time: formatMinutes(register), label: "Registre erros e uma regra-chave" },
      ];
}

function buildPlan(totalDays: number, dailyMinutes: number): StudyDay[] {
  const assignments: Day[][] = Array.from({ length: totalDays }, () => []);

  days.forEach((module, index) => {
    const position = totalDays <= days.length
      ? Math.min(totalDays - 1, Math.floor((index * totalDays) / days.length))
      : Math.round((index * (totalDays - 1)) / (days.length - 1));
    assignments[position].push(module);
  });

  return assignments.map((modules, index) => {
    if (modules.length) {
      const primary = modules[0];
      const titles = modules.map((module) => module.title);
      const combined = modules.length > 1;
      return {
        ...primary,
        day: index + 1,
        time: formatMinutes(dailyMinutes),
        kicker: combined ? "Dia de conexão" : primary.kicker,
        title: titles.join(" + "),
        summary: combined
          ? `Hoje você conecta ${titles.join(" com ").toLowerCase()}. Priorize as ideias centrais, faça um resumo único e leve as dúvidas para as questões.`
          : primary.summary,
        remember: Array.from(new Set(modules.flatMap((module) => module.remember))).slice(0, 3),
        agenda: makeAgenda(dailyMinutes, titles),
        tasks: combined
          ? [`Estudei ${titles.join(" e ")}`, "Assisti ao vídeo e fiz um resumo", "Pratiquei e registrei meus erros"]
          : primary.tasks,
        sourceTitles: titles,
      };
    }

    const previousModules = assignments.slice(0, index).flat().slice(-2);
    const nextModule = assignments.slice(index + 1).flat()[0];
    const reviewModules = previousModules.length ? previousModules : nextModule ? [nextModule] : [days[0]];
    const titles = reviewModules.map((module) => module.title);
    const reference = reviewModules[reviewModules.length - 1];
    return {
      ...reference,
      day: index + 1,
      time: formatMinutes(dailyMinutes),
      kicker: "Pausa que fixa",
      title: `Revisão ativa: ${titles.join(" + ")}`,
      summary: "Este dia extra existe para consolidar, não para adicionar conteúdo. Tente lembrar antes de olhar e concentre a prática nas questões que ainda causam dúvida.",
      remember: ["Recuperar a informação sem consultar fortalece a memória.", "Erros repetidos indicam exatamente o que deve voltar para a sua folha-resumo."],
      agenda: makeAgenda(dailyMinutes, titles, true),
      tasks: ["Revisei sem consultar", "Refiz questões erradas", "Atualizei meu resumo"],
      tip: "Não transforme o dia de revisão em uma aula nova. Feche lacunas e preserve energia.",
      sourceTitles: titles,
    };
  });
}

function ExploreLink({ href, label, direction = "up" }: { href: string; label: string; direction?: "up" | "down" }) {
  return (
    <a className={`explore-button ${direction}`} href={href}>
      <span>{label}</span>
      <svg className="explore-icon" viewBox="0 0 16 19" aria-hidden="true">
        <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
      </svg>
    </a>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="ios-checkbox green">
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={label} />
      <span className="checkbox-wrapper" aria-hidden="true">
        <span className="checkbox-bg" />
        <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none">
          <path className="check-path" d="M4 12L10 18L20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  );
}

export default function Home() {
  const [done, setDone] = useState<string[]>([]);
  const [filter, setFilter] = useState<"all" | "first" | "final">("all");
  const [openDay, setOpenDay] = useState<number>(1);
  const [studyDays, setStudyDays] = useState(14);
  const [dailyMinutes, setDailyMinutes] = useState(90);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rota-aprovacao-progress");
      if (saved) {
        const parsed: string[] = JSON.parse(saved);
        setDone(parsed.map((id) => /^\d+-\d+$/.test(id) ? `14-90-${id}` : id));
      }
      const savedSettings = localStorage.getItem("rota-aprovacao-settings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (Number.isInteger(settings.studyDays) && settings.studyDays >= 7 && settings.studyDays <= 28) setStudyDays(settings.studyDays);
        if ([30, 45, 60, 90, 120].includes(settings.dailyMinutes)) setDailyMinutes(settings.dailyMinutes);
      }
    } catch { /* dispositivo sem armazenamento disponível */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("rota-aprovacao-progress", JSON.stringify(done)); } catch { /* progresso segue na sessão */ }
  }, [done, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("rota-aprovacao-settings", JSON.stringify({ studyDays, dailyMinutes })); } catch { /* preferências seguem na sessão */ }
    setFilter("all");
    setOpenDay(1);
  }, [studyDays, dailyMinutes, hydrated]);

  const plan = useMemo(() => buildPlan(studyDays, dailyMinutes), [studyDays, dailyMinutes]);
  const planKey = `${studyDays}-${dailyMinutes}`;
  const currentDone = done.filter((id) => id.startsWith(`${planKey}-`));
  const totalTasks = plan.reduce((sum, day) => sum + day.tasks.length, 0);
  const progress = Math.round((currentDone.length / totalTasks) * 100);
  const completedDays = plan.filter((day) => day.tasks.every((_, index) => done.includes(`${planKey}-${day.day}-${index}`))).length;
  const splitAt = Math.ceil(plan.length / 2);
  const visibleDays = useMemo(() => {
    if (filter === "first") return plan.slice(0, splitAt);
    if (filter === "final") return plan.slice(splitAt);
    return plan;
  }, [filter, plan, splitAt]);
  const estimatedHours = Math.round((studyDays * dailyMinutes / 60) * 10) / 10;
  const toggle = (id: string) => setDone((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const reset = () => { if (window.confirm("Zerar o progresso deste plano?")) setDone((current) => current.filter((id) => !id.startsWith(`${planKey}-`))); };

  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="#inicio" aria-label="Rota CNH — início"><img className="brand-logo" src="/rota-cnh-logo.png" width="42" height="42" alt="" /><span>Rota CNH</span></a>
        <div className="nav-actions"><span>{completedDays}/{studyDays} dias</span><ExploreLink href="#plano" label="Ver plano" direction="down" /></div>
      </nav>

      <section className="hero" id="inicio">
        <div className="eyebrow"><span /> Sua rota, no seu tempo</div>
        <h1>
          <span className="hero-title-line">Sua carteira</span>
          <span className="hero-title-line">começa com um bom</span>
          <em>plano.</em>
        </h1>
        <p className="hero-copy">Escolha quantos dias você tem e quanto cabe na sua rotina. O roteiro se reorganiza para você estudar sem atropelar o aprendizado.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#personalizar">Começar meu plano <span aria-hidden="true">→</span></a>
          <div className="stat"><strong>{studyDays}</strong><span>dias</span></div>
          <div className="stat"><strong>{formatMinutes(dailyMinutes)}</strong><span>por dia</span></div>
        </div>
        <aside className="progress-card" aria-label={`Progresso do plano: ${progress}%`}>
          <div className="progress-top"><span>Seu progresso</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <p>{currentDone.length === 0 ? "Tudo pronto. Marque cada etapa conforme avançar." : `${currentDone.length} de ${totalTasks} etapas concluídas. Seu progresso fica salvo aqui.`}</p>
        </aside>
      </section>

      <section className="planner" id="personalizar" aria-labelledby="planner-title">
        <div className="planner-copy">
          <span className="section-number">MONTE SUA ROTA</span>
          <h2 id="planner-title">Quanto tempo<br /><em>você tem?</em></h2>
          <p>O conteúdo continua completo. O que muda é a distribuição: menos dias conectam temas; mais dias ganham revisões extras.</p>
          <div className="plan-result" aria-live="polite"><strong>{studyDays} dias × {formatMinutes(dailyMinutes)}</strong><span>aproximadamente {String(estimatedHours).replace(".", ",")} horas no total</span></div>
        </div>
        <div className="planner-controls">
          <div className="control-card">
            <div className="control-label"><span>01</span><div><strong>Em quantos dias?</strong><small>De 7 a 28 dias</small></div></div>
            <div className="day-stepper">
              <button onClick={() => setStudyDays((value) => Math.max(7, value - 1))} aria-label="Diminuir um dia">−</button>
              <output aria-label={`${studyDays} dias`}>{studyDays}<small>dias</small></output>
              <button onClick={() => setStudyDays((value) => Math.min(28, value + 1))} aria-label="Aumentar um dia">+</button>
            </div>
            <input className="days-range" type="range" min="7" max="28" value={studyDays} onChange={(event) => setStudyDays(Number(event.target.value))} aria-label="Quantidade de dias para estudar" />
            <div className="range-ends"><span>7</span><span>28</span></div>
          </div>
          <div className="control-card">
            <div className="control-label"><span>02</span><div><strong>Quanto tempo por dia?</strong><small>Escolha o ritmo realista</small></div></div>
            <div className="time-options" role="group" aria-label="Tempo de estudo por dia">
              {[30, 45, 60, 90, 120].map((minutes) => <button key={minutes} className={dailyMinutes === minutes ? "active" : ""} onClick={() => setDailyMinutes(minutes)}><strong>{formatMinutes(minutes)}</strong><small>{minutes <= 45 ? "leve" : minutes <= 60 ? "equilibrado" : minutes <= 90 ? "intenso" : "imersão"}</small></button>)}
            </div>
          </div>
        </div>
      </section>

      <section className="rhythm" aria-labelledby="ritmo-title">
        <div><span className="section-number">ANTES DE COMEÇAR</span><h2 id="ritmo-title">Seu ritual diário</h2></div>
        <div className="rhythm-line">
          <div><strong>01</strong><span>Relembrar</span><small>{plan[0].agenda[0].time}</small></div><i />
          <div><strong>02</strong><span>Aprender</span><small>{plan[0].agenda[1].time}</small></div><i />
          <div><strong>03</strong><span>Praticar</span><small>{plan[0].agenda[2].time}</small></div><i />
          <div><strong>04</strong><span>Registrar</span><small>{plan[0].agenda[3]?.time ?? "5 min"}</small></div>
        </div>
        <p className="rhythm-note">Se tiver só uma hora, preserve a prática. Se tiver duas, aumente as questões — não o tempo de vídeo.</p>
      </section>

      <section className="plan-head" id="plano">
        <div><span className="section-number">01 — O PLANO</span><h2>Um passo por vez.<br />Todos os dias.</h2></div>
        <div className="plan-intro">
          <p>Seu plano tem {studyDays} dias de {formatMinutes(dailyMinutes)}. Abra o cartão, siga o roteiro recalculado e marque as etapas.</p>
          <div className="filters" role="group" aria-label="Filtrar dias">
            {([['all', 'Todos'], ['first', 'Primeira metade'], ['final', 'Reta final']] as const).map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}
          </div>
        </div>
      </section>

      <section className="days-grid" aria-label={`Plano de estudo de ${studyDays} dias`}>
        {visibleDays.map((item) => {
          const isOpen = openDay === item.day;
          const finished = item.tasks.every((_, index) => done.includes(`${planKey}-${item.day}-${index}`));
          return (
            <article className={`day-card ${isOpen ? "open" : ""} ${finished ? "finished" : ""}`} key={item.day} id={`dia-${item.day}`}>
              <button className="day-summary" onClick={() => setOpenDay(isOpen ? 0 : item.day)} aria-expanded={isOpen} aria-controls={`detalhes-${item.day}`}>
                <span className="day-number">{String(item.day).padStart(2, "0")}</span>
                <span className="day-title"><small>{item.kicker}</small><strong>{item.title}</strong></span>
                <span className="day-time">{finished ? "Concluído" : item.time}</span>
                <span className="expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className="day-details" id={`detalhes-${item.day}`}>
                <div className="day-main">
                  <p className="day-description">{item.summary}</p>
                  <div className="remember-box"><span>GRUDE NA MEMÓRIA</span><ul>{item.remember.map((text) => <li key={text}>{text}</li>)}</ul></div>
                  <a className="video-card" href={item.video.url} target="_blank" rel="noreferrer">
                    <span className="play" aria-hidden="true">▶</span><span><small>VÍDEO DO DIA · {item.video.duration}</small><strong>{item.video.title}</strong></span><b aria-hidden="true">↗</b>
                  </a>
                </div>
                <div className="day-side">
                  <div className="agenda"><span>ROTEIRO · {item.time}</span>{item.agenda.map((step) => <div key={step.time + step.label}><strong>{step.time}</strong><p>{step.label}</p></div>)}</div>
                  <div className="task-list">
                    <span>CHECK DO DIA</span>
                    {item.tasks.map((task, index) => {
                      const id = `${planKey}-${item.day}-${index}`;
                      return <div className={`task ${done.includes(id) ? "completed" : ""}`} key={task}><Check checked={done.includes(id)} onChange={() => toggle(id)} label={`Marcar como concluído: ${task}`} /><span>{task}</span></div>;
                    })}
                  </div>
                </div>
                <div className="day-tip"><span aria-hidden="true">✶</span><p><strong>Dica de pista:</strong> {item.tip}</p></div>
              </div>}
            </article>
          );
        })}
      </section>

      <section className="tips-section">
        <div className="tips-heading"><span className="section-number">02 — COMO ESTUDAR</span><h2>Menos releitura.<br /><em>Mais memória.</em></h2></div>
        <div className="tips-grid">{quickTips.map((tip) => <article key={tip.title}><span>{tip.mark}</span><h3>{tip.title}</h3><p>{tip.text}</p></article>)}</div>
      </section>

      <section className="exam-section">
        <div className="exam-card">
          <div className="exam-copy"><span className="section-number">03 — NA HORA DA PROVA</span><h2>Calma também<br />marca ponto.</h2><p>Você não precisa correr. Precisa ler exatamente o que a questão pede.</p></div>
          <div className="exam-rules">
            <div><b>01</b><p>Procure palavras-armadilha: <strong>incorreta, exceto, nunca, sempre.</strong></p></div>
            <div><b>02</b><p>Resolva primeiro as fáceis e marque as duvidosas para voltar.</p></div>
            <div><b>03</b><p>Entre duas respostas, prefira a conduta legal, segura e preventiva.</p></div>
            <div><b>04</b><p>Só troque uma resposta se encontrar um motivo objetivo.</p></div>
          </div>
        </div>
      </section>

      <section className="resources">
        <div><span className="section-number">MATERIAL CONFIÁVEL</span><h2>Para ir direto à fonte.</h2></div>
        <div className="resource-links">
          <a href="https://www.gov.br/transportes/pt-br/assuntos/transito/senatran/manuais-brasileiros-de-sinalizacao-de-transito" target="_blank" rel="noreferrer"><span>Manuais oficiais de sinalização</span><small>SENATRAN ↗</small></a>
          <a href="https://www.detraneduca.pr.gov.br/Pagina/Materiais-Educativos" target="_blank" rel="noreferrer"><span>Cartilhas de direção defensiva e primeiros socorros</span><small>DETRAN-PR ↗</small></a>
          <a href="https://www.detran.pe.gov.br/images/educacao/apostila-direcao-defensiva-prevencao-sinistros-versao-detranpe2024-compactado.pdf" target="_blank" rel="noreferrer"><span>Apostila de direção defensiva</span><small>DETRAN-PE ↗</small></a>
        </div>
        <p className="disclaimer">O conteúdo e o formato da prova podem variar por estado. Use este plano como roteiro e confirme regras, quantidade de questões, tempo e nota mínima no site do DETRAN onde você fará o exame.</p>
      </section>

      <section className="finish-section">
        <span>{progress === 100 ? "Você fechou a rota." : "Sua próxima conquista está logo ali."}</span>
        <h2>{progress === 100 ? "Plano concluído!" : "Continue. Você está chegando."}</h2>
        <div className="finish-progress"><span style={{ width: `${progress}%` }} /></div>
        <p>{completedDays} de {studyDays} dias concluídos · {progress}% do plano</p>
        {currentDone.length > 0 && <button className="reset-button" onClick={reset}>Zerar progresso</button>}
      </section>

      <footer><a className="brand" href="#inicio" aria-label="Rota CNH — início"><img className="brand-logo" src="/rota-cnh-logo.png" width="42" height="42" alt="" /><span>Rota CNH</span></a><p>Feito para estudar com leveza. Boa prova!</p><ExploreLink href="#inicio" label="Voltar ao topo" /></footer>
    </main>
  );
}

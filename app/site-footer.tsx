import type { ReactNode } from "react";

export default function SiteFooter({ backToTop }: { backToTop: ReactNode }) {
  return (
    <footer className="site-footer" aria-label="Rodapé Rota CNH">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-about">
            <a className="footer-brand" href="#inicio" aria-label="Rota CNH — início">
              <span className="footer-logo"><img src="/rota-cnh-logo.png" width="64" height="64" alt="" loading="lazy" /></span>
              <span>Rota CNH<small>Sua rota, no seu tempo.</small></span>
            </a>
            <p>Organize seus estudos, acompanhe cada conquista e dê o próximo passo com mais confiança.</p>
            <span className="footer-signoff">Um dia de cada vez. Uma conquista à frente.</span>
          </div>

          <nav className="footer-navigation" aria-labelledby="footer-nav-title">
            <h2 id="footer-nav-title">Explore sua rota</h2>
            <ul>
              <li><a href="#personalizar">Personalizar meu plano</a></li>
              <li><a href="#plano">Plano de estudos</a></li>
              <li><a href="#dicas">Dicas de estudo</a></li>
              <li><a href="#materiais">Materiais de apoio</a></li>
            </ul>
          </nav>

          <div className="footer-creator">
            <h2>Por trás do projeto</h2>
            <span className="footer-caption">Criado e desenvolvido por</span>
            <a className="footer-author" href="https://github.com/MarkossCod" target="_blank" rel="noopener noreferrer">MarkossCod <span aria-hidden="true">↗</span><span className="footer-sr-only"> (abre em nova aba)</span></a>
            <p>Um projeto para deixar a preparação para a CNH mais organizada e acessível.</p>
            <a className="footer-project" href="https://github.com/MarkossCod/ROTA_CNH" target="_blank" rel="noopener noreferrer">Conheça o projeto no GitHub <span aria-hidden="true">↗</span><span className="footer-sr-only"> (abre em nova aba)</span></a>
          </div>
        </div>

        <div className="footer-information">
          <p><strong>Estudo com responsabilidade.</strong> O Rota CNH é um projeto independente, sem vínculo com o DETRAN. O plano complementa sua preparação e não garante aprovação. Confirme as orientações do exame no órgão do seu estado.</p>
          <details className="footer-privacy">
            <summary>Sobre seu progresso e privacidade <span aria-hidden="true">+</span></summary>
            <p>Seu plano e suas marcações ficam salvos no armazenamento local deste navegador, sem cadastro. Eles não são sincronizados entre dispositivos e podem ser apagados ao limpar os dados do navegador. Links externos levam a serviços com suas próprias políticas de privacidade.</p>
          </details>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Rota CNH <span aria-hidden="true">·</span> Código sob <a href="https://github.com/MarkossCod/ROTA_CNH/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">licença MIT<span className="footer-sr-only"> (abre em nova aba)</span></a>.</p>
          {backToTop}
        </div>
      </div>
    </footer>
  );
}

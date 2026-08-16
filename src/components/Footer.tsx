import { Bee } from './Bee';

export function Footer() {
  return (
    <footer className="bg-brown-dark text-cream py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <span className="text-2xl">🐝</span>
              <span className="font-display font-extrabold text-2xl">Doce Angélica</span>
            </div>
            <p className="font-body text-cream/60 text-sm max-w-xs">
              Cookies artesanais recheados, feitos com carinho e ingredientes selecionados. 💛
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Bee className="w-16 h-14" />
            <div className="flex gap-6">
              <a href="#products" className="font-body text-cream/70 hover:text-honey transition-colors font-semibold text-sm">
                Sabores
              </a>
              <a href="#showcase" className="font-body text-cream/70 hover:text-honey transition-colors font-semibold text-sm">
                Recheio
              </a>
              <a href="#story" className="font-body text-cream/70 hover:text-honey transition-colors font-semibold text-sm">
                Carinho
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="font-body text-cream/50 text-sm">
              Feito com 🍪 e muito carinho.
            </p>
            <p className="font-body text-cream/40 text-xs mt-2">
              © 2026 Doce Angélica. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

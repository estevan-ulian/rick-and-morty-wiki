class LocationEntity {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Array<string>;
  url: string;
  created: string;

  constructor(location: LocationEntity) {
    this.id = location.id;
    this.name = location.name;
    this.type = location.type;
    this.dimension = location.dimension;
    this.residents = location.residents;
    this.url = location.url;
    this.created = location.created;
  }

  get getType(): string {
    const type = this.type.toLowerCase();
    switch (type) {
      case "planet":
        return "Planeta";
      case "game":
        return "Jogo";
      case "customs":
        return "Alfândega";
      case "space station":
        return "Estação Espacial";
      case "spacecraft":
        return "Nave Espacial";
      case "dimension":
        return "Dimensão";
      case "microverse":
        return "Microverso";
      case "miniverse":
        return "Miniverso";
      case "unknown":
        return "Desconhecido";
      case "menagerie":
        return "Zoológico";
      case "fantasy town":
        return "Cidade da Fantasia";
      case "dream":
        return "Sonho";
      case "teenyverse":
        return "Cidade dos Adolescentes";
      case "daycare":
        return "Creche";
      case "box":
        return "Caixa";
      case "machine":
        return "Máquina";
      case "arcade":
        return "Fliperama";
      case "quadrant":
        return "Quadrante";
      case "mount":
        return "Montanha";
      case "liquid":
        return "Líquido";
      case "convention":
        return "Convenção";
      case "woods":
        return "Floresta";
      case "nightmare":
        return "Pesadelo";
      case "asteroid":
        return "Asteroide";
      case "diegesis":
        return "Diegese";
      case "acid plant":
        return "Planta ácida";
      case "reality":
        return "Realidade";
      case "death star":
        return "Estrela da morte";
      case "quasar":
        return "Quasar - Núcleo Galáctico Ativo";
      case "elemental rings":
        return "Anéis elementais";
      case "human":
        return "Humano";
      case "space":
        return "Espaço";
      case "hell":
        return "Inferno";
      case "memory":
        return "Memória";
      case "country":
        return "País";
      case "consciousness":
        return "Consciência";
      case "police department":
        return "Departamento de polícia";
      case "non-diegetic alternative reality":
        return "Realidade alternativa não diegética";
      case "artificially generated world":
        return "Mundo gerado artificialmente";
      case "dwarf planet (celestial dwarf)":
        return "Planeta anão (anão celestial)";
      default:
        return this.type;
    }
  }

  get getDimension(): string {
    const dimension = this.dimension.toLowerCase();
    switch (dimension) {
      case "unknown":
        return "Desconhecida";
      case "fantasy dimension":
        return "Fantasia";
      case "conenberg dimension":
        return "Cronenberg";
      case "replacement dimension":
        return "Substituição";
      case "unknown dimension":
        return "Desconhecida";
      case "giant telepathic spiders dimension":
        return "Aranhas telepáticas gigantes";
      case "testicle monster dimension":
        return "Monstro dos testículos";
      case "cromulon dimension":
        return "Cromulon";
      case "evil rick's target dimension":
        return "Alvo do Rick maligno";
      case "eric stoltz mask dimension":
        return "Máscara Eric Stoltz";
      case "post-apocalyptic dimension":
        return "Pós-apocalíptica";
      case "chair dimension":
        return "Cadeira";
      case "facist dimension":
        return "Facista";
      case "facist shrimp dimension":
        return "Camarão facista";
      case "pizza dimension":
        return "Pizza";
      case "phone dimension":
        return "Telefone";
      case "wasp dimension":
        return "Vespa";
      case "tusk dimension":
        return "Bolota";
      case "magic dimension":
        return "Mágica";
      case "merged dimension":
        return "Fundida";
      case "facist teddy bear dimension":
        return "Urso de pelúcia facista";
      default:
        return this.dimension;
    }
  }
}

export default LocationEntity;

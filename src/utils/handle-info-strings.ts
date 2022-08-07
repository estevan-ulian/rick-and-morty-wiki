export function handleGender(genders) {
    const gender = genders.toLowerCase();
    if(gender === 'male') return 'masculino';
    if(gender === 'female') return 'feminino';
    if(gender === 'genderless') return 'indefinido';
    if(gender === 'unknown') return 'desconhecido';
  }

export function handleSpecies(species) {
    const specie = species.toLowerCase();
    if(specie === 'human') return 'humano';
    if(specie === 'alien') return 'alienígena';
    if(specie === 'humanoid') return 'humanóide';
    if(specie === 'unknown') return 'desconhecida';
    if(specie === 'mythological creature') return 'criatura mitológica';
    if(specie === 'disease') return 'doença';
    if(specie === 'robot') return 'robô';
    if(specie === 'poopybutthole') return 'bumbunzinho';
    if(specie === 'cronenberg') return 'cronenberg';
    if(specie) return specie;
  }

export function handleStatus(statusCharacter) {
  const status = statusCharacter.toLowerCase();
  if(status === 'alive') return 'vivo';
  if(status === 'dead') return 'morto';
  if(status === 'unknown') return 'desconhecido';
}

export function handleDimension(dimensions) {
  const dimension = dimensions.toLowerCase();  
  if(dimension === 'unknown') return 'desconhecida';  
  if(dimension === 'fantasy dimension') return 'fantasia';  
  if(dimension === 'conenberg dimension') return 'cronenberg';  
  if(dimension === 'replacement dimension') return 'substituição';  
  if(dimension === 'unknown dimension') return 'desconhecida';  
  if(dimension === 'giant telepathic spiders dimension') return 'aranhas telepáticas gigantes';  
  if(dimension === 'testicle monster dimension') return 'monstro dos testículos';  
  if(dimension === 'cromulon dimension') return 'cromulon';  
  if(dimension === "evil rick's target dimension") return 'alvo do Rick maligno';  
  if(dimension === "eric stoltz mask dimension") return 'máscara Eric Stoltz'; 
  if(dimension === "post-apocalyptic dimension") return 'pós-apocalíptica';   
  if(dimension === 'chair dimension') return 'cadeira';
  if(dimension === 'fascist dimension') return 'facista';
  if(dimension === 'fascist shrimp dimension') return 'camarão facista';
  if(dimension === 'pizza dimension') return 'pizza';
  if(dimension === 'phone dimension') return 'telefone';
  if(dimension === 'wasp dimension') return 'vespa';  
  if(dimension === 'tusk dimension') return 'bolota';
  if(dimension === 'magic dimension') return 'mágica';
  if(dimension === 'merged dimension') return 'fundida';
  if(dimension === 'fascist teddy bear dimension') return 'urso de pelúcia facista';
  if(dimension.split('dimension')) return dimension.split('dimension').join('');
  if(dimension) return dimension;
  
}

export function handleType(types) {
  if(types === null) return;
  const type = types.toLowerCase();
  if(type === 'planet') return 'planeta';
  if(type === 'game') return 'jogo';
  if(type === 'customs') return 'alfândega';
  if(type === 'space station') return 'estação espacial';
  if(type === 'spacecraft') return 'nave espacial';
  if(type === 'dimension') return 'dimensão';
  if(type === 'microverse') return 'microverso';
  if(type === 'miniverse') return 'miniverso';
  if(type === 'unknown') return 'desconhecido';
  if(type === 'menagerie') return 'zoológico';
  if(type === 'fantasy town') return 'cidade da fantasia';
  if(type === 'dream') return 'sonho';
  if(type === 'teenyverse') return 'cidade dos adolescentes';
  if(type === 'daycare') return 'creche';
  if(type === 'box') return 'caixa';
  if(type === 'machine') return 'máquina';
  if(type === 'arcade') return 'fliperama';
  if(type === 'quadrant') return 'quadrante';
  if(type === 'mount') return 'montanha';
  if(type === 'liquid') return 'líquido';
  if(type === 'convention') return 'convenção';
  if(type === 'woods') return 'madeira';
  if(type === 'nightmare') return 'pesadelo';
  if(type === 'asteroid') return 'asteróide';
  if(type === 'diegesis') return 'diegese';
  if(type === 'acid plant') return 'planta ácida';
  if(type === 'reality') return 'realidade';
  if(type === 'death star') return 'estrela da morte';
  if(type === 'quasar') return 'quasar - núcleo galáctico ativo';
  if(type === 'elemental rings') return 'anéis elementais';
  if(type === 'human') return 'humano';
  if(type === 'space') return 'espaço';
  if(type === 'hell') return 'inferno';
  if(type === 'memory') return 'memória';
  if(type === 'country') return 'país';
  if(type === 'consciousness') return 'consciência';
  if(type === 'police department') return 'departamento de polícia';
  if(type === 'non-diegetic alternative reality') return 'Realidade alternativa não diegética';
  if(type === 'artificially generated world') return 'mundo gerado artificialmente';
  if(type === 'dwarf planet (celestial dwarf)') return 'planeta anão (anão celestial)';
  if(type) return type;
}

export function handleOrigin(origins) {
  const origin = origins.toLowerCase();
  if(origin === '') return 'desconhecida';
  if(origin === 'unknown') return 'desconhecida';
  if(origin) return origin;
}

export function handleLocation(locations) {
  const location = locations.toLowerCase();
  if(location === '') return 'desconhecido';
  if(location === 'unknown') return 'desconhecido';
  if(location) return location;
}
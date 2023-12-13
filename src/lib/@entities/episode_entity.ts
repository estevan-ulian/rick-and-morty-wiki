// filters => name(string), episode(code)

class EpisodeEntity {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
  url: string;
  created: string;

  constructor(episode: EpisodeEntity) {
    this.id = episode.id;
    this.name = episode.name;
    this.air_date = episode.air_date;
    this.episode = episode.episode;
    this.characters = episode.characters;
    this.url = episode.url;
    this.created = episode.created;
  }
}

export default EpisodeEntity;

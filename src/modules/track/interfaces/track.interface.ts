import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';

export interface ITrack {
  id: string;
  name: string;
  artist: ArtistEntity | null;
  album: AlbumEntity | null;
  duration: number;
}

export interface ITrackRequest {
  name: string;
  duration: number;
}

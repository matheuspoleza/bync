import { ImageLibrary as ImageLibraryComponent } from './ImageLibrary.component';
import { ImageTile } from './ImageTile';

export type { IImageLibrary } from './ImageLibrary.interface';

export const ImageLibrary = Object.assign(ImageLibraryComponent, {
  Tile: ImageTile,
});

export interface BaseImage {
  id: string;
  url: string;
  name: string;
}

export interface IImageLibrary<Image extends BaseImage> {
  images: Image[];
  testID?: string;
  onImageSelect?: (image: Image) => void;
  onImageRemove?: (image: Image) => void;
}

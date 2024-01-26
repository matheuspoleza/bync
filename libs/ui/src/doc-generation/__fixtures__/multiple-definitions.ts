export interface IBaseImage {
  id: string;
  url: string;
  name: string;
}

export interface IImageLibrary<Image extends IBaseImage> {
  images: Image[];
  testID?: string;
  onImageSelect?: (image: Image) => void;
  onImageRemove?: (image: Image) => void;
}

export interface ITest {
  howdy: 'folks';
}

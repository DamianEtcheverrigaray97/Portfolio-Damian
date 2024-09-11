import React from 'react';
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Carousel from './carroucel';

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  // Obtén el arreglo de imágenes desde slice.primary.image_group
  const images = slice.primary.image_group
    .filter((item) => item.image.url) // Filtra elementos con URL válida
    .map((item) => ({
      image: {
        url: item.image.url || '', // Asegúrate de que siempre sea una cadena
      },
    }));

  return (
    <div>
      <PrismicRichText field={slice.primary.text} />
      
      {images.length > 0 && <Carousel items={images} />}
    </div>
  );
};

export default TextBlock;

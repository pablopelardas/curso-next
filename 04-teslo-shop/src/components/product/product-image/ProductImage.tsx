import Image from "next/image";

interface Props{
    src?: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
    onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
    alt: string;
    width: number;
    height: number;
}

export const ProductImage = ({src, className, width, height, alt, style, onMouseEnter = () => {}, onMouseLeave = () => {}}: Props) => {

    const localSrc = src 
    ? src.startsWith('http')
        ? src
        : `/products/${src}` 
    : '/imgs/placeholder.jpg';

  return <Image src={localSrc} alt={alt} width={width} height={height} style={style} className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
}

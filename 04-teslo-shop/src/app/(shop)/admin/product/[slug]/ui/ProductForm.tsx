"use client";

import { createUpdateProduct } from "@/actions";
import {  Category, Product, Size } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product>;
  categories : Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs{
  title: string;
  slug: string;
  description: string;
  price: number
  inStock: number;
  sizes: string[];
  tags: string // camisa, t-shirt, ... => set
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
  images: {
    url: string;
    id: number;
  }[]
  //todo: images
}

export const ProductForm = ({ product, categories }: Props) => {

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      inStock: product.inStock,
      sizes: product.sizes ?? [],
      tags: product.tags?.join(", ") ?? "",
      images: product.images ?? [],
      // todo: images
    }
  });

  watch('sizes');

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from(sizes))
  }

  const onSubmit = async( data: FormInputs ) => {
    console.log('onSubmit', data)
    const formData = new FormData();

    const {...productToSave} = data;

    if (product.id){
      formData.append('id', product.id ?? '')
    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('gender', productToSave.gender)

    const {ok} = await createUpdateProduct(formData);

    console.log('ok', {
      ok,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', {required: true})}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', {required: true})}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', {required: true})}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', {required: true, min: 0})} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', {required: true})} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('gender', {required: true})}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('categoryId', {required: true})}>
            <option value="">[Seleccione]</option>
            {
              categories.map( category => (
                <option key={ category.id } value={ category.id }>{ category.name }</option>
              ))
            }
          </select>
        </div>

        <button className="btn-primary w-full">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
      <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('inStock', {required: true, min: 0})} />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Tallas</span>
          <div className="flex flex-wrap">
            
            {
              sizes.map( size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div 
                key={ size } 
                className={
                  clsx("p-2 border rounded-md mr-2 mb-2 w-14 transition-all cursor-pointer", {
                    "bg-blue-500 text-white": getValues('sizes').includes(size)
                  })
                }
                onClick={() => onSizeChanged(size)}>
                  <span>{ size }</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input 
              type="file"
              multiple 
              className="p-2 border rounded-md bg-gray-200" 
              accept="image/png, image/jpeg"
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {
              product.images?.map( image => (
                <div key={ image.id } >
                  <Image src={ `/products/${image.url}` } alt={ product.title || '' } width={ 300 } height={ 300 } className="rounded shadow-md"/>
                  <button onClick={() => console.log(image.id, image.url)} type="button" className="btn-danger rounded-b-xl w-full">
                    Eliminar
                  </button>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};
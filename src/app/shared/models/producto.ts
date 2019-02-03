export class Producto {
  id: string;
  codigo_barra: string;
  nombre: string;
  descripcion: string;
  precio_original: number;
  precio_mayorista: number;
  precio_promocional: number;
  stock: number;
  peso: number;
  sku: string;
  id_categoria: number;
  id_marca: number;
  tag: string;
  mostrar_precio: number;
  envio_gratis: number;
  mostrar_en_tienda: number;
  producto_reciente: number;
  producto_en_oferta: number;
  proximamente: number;
  name?: string;
  price?: number;
  salePrice?: number;
  discount?: number;
  pictures?: [];
  shortDetails?: string;
  description?: string;
  new?: boolean;
  sale?: boolean;
  category?: string;
  colors?: [];
  size?: [];
  tags?: [];
  variants?: [];
}


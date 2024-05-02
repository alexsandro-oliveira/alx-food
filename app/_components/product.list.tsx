import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  //busca no banco apenas os produtos que possuem desconto >0
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10, //ira mostrar apenas  10  produtos da lista

    // inclui em products o restaurante (join da tabela)
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

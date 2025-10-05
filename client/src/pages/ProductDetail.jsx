import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product";
import { formatVietnameseCurrency } from "../utils/helper";
import useEcomStore from "../store/store";
const ProductDetail = () => {
  const addToCart = useEcomStore((state) => state.addToCart);
  const cart = useEcomStore((state) => state.carts);
  console.log(cart);

  const param = useParams();
  const { id } = param;
  const [productById, setProductById] = useState({});
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    const fetchProductById = async (id) => {
      try {
        const res = await getProductById(id);
        setProductById(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductById(id);
  }, [id]);
  const handleIncreaseQuantity = (qty) => {
    if (quantity > qty) return;
    setQuantity((prev) => prev + 1);
  };
  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <div>
      {Object.keys(productById).length !== 0 && (
        <div className="max-w-[80%] mx-auto my-6 flex gap-4">
          <div className="w-[40%]">
            <div>
              <img
                src={productById?.images[0]?.url}
                className="h-[475px] object-contain rounded-md"
              />
            </div>
            <div className="my-2">
              <div className="flex gap-4">
                {productById?.images?.map((image) => {
                  return (
                    <img
                      key={image.id}
                      src={image.url}
                      className="bg-slate-400 w-[120px] h-[120px] rounded-md cursor-pointer hover:border-2 border-orange-500"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[40%]">
            {productById.quantity > 0 && (
              <div className="bg-green-500 text-center text-white py-1 px-2 text-lg font-bold w-fit">
                In Stock
              </div>
            )}
            <h2 className="text-4xl font-semibold">{productById.title}</h2>
            <p>{productById.description}</p>
            <h4 className="text-3xl font-semibold">
              {formatVietnameseCurrency(productById.price)}
            </h4>
            <hr />
            <span className="font-semibold">Quantity</span>
            <div className="flex items-center border border-gray-500 w-fit">
              <button
                className="py-1 px-2"
                onClick={() => handleDecreaseQuantity(productById.quantity)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="py-1 px-2"
                onClick={() => handleIncreaseQuantity(productById.quantity)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => addToCart(productById, quantity)}
              className="bg-green-500 py-2 px-4 text-white font-semibold hover:bg-green-700"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

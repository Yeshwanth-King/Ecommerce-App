import Header from "@/components/Header";
import HeroItem from "@/components/HeroItem";
import LatestProduct from "@/components/LatestProduct";
import connectDB from "@/lib/connectDB";
import Products from "@/models/products";

export default async function Home() {
  const HeroProductID = "66c6f85da567fc650f3de003";
  await connectDB();
  const product = await Products.findById(HeroProductID);
  const LatestProducts = await Products.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  const heroPro = {
    _id: product._id.toString(),
    Name: product.Name,
    description: product.description,
    Price: product.Price,
    images: product.images,
    category: product.category.toString(), // or other conversion if necessary
    properties: product.properties,
    updatedAt: product.updatedAt.toISOString(), // Ensure Date is converted to string
  };

  const latePro = LatestProducts.map((product) => {
    return {
      _id: product._id.toString(),
      Name: product.Name,
      description: product.description,
      Price: product.Price,
      images: product.images,
      category: product.category.toString(), // or other conversion if necessary
      properties: product.properties,
      updatedAt: product.updatedAt.toISOString(), // Ensure Date is converted to string
    };
  });




  return (
    <>
      <div>
        <Header />
        <HeroItem product={heroPro} />
        <LatestProduct lateProduct={latePro} />
      </div>
    </>
  );
}
